import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { productsList, ProductDetailsType } from '../data/products';
import { getShopifyProducts } from '../lib/getProducts';
import { MessageSquare, X, Send, Package, ShoppingBag, Leaf, HelpCircle, ArrowRight, Loader2, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types for Chat
interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  showProducts?: boolean;
  showTracking?: boolean;
  showIngredientsVideo?: boolean;
  showOrderReel?: boolean;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const [apiProvider, setApiProvider] = useState<'gemini' | 'groq'>('groq');
  const [products, setProducts] = useState<ProductDetailsType[]>([]);
  const { addToCart } = useCart();

  // Order Tracking State
  const [trackingId, setTrackingId] = useState('');
  const [trackingStatus, setTrackingStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [trackingResult, setTrackingResult] = useState<any>(null);

  // Responsive state helper
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // References
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // 1. Resolve API Key & Provider (Env -> LocalStorage -> Built-in Key)
  useEffect(() => {
    const sanitize = (key: string) => {
      if (!key) return '';
      return key.trim().replace(/^["']|["']$/g, '').trim();
    };

    const provider = (localStorage.getItem('leafandlore_api_provider') || 'groq') as 'gemini' | 'groq';
    setApiProvider(provider);

    const envKey = sanitize(
      provider === 'gemini'
        ? import.meta.env.VITE_GEMINI_API_KEY || ''
        : import.meta.env.VITE_GROQ_API_KEYS || import.meta.env.VITE_GROQ_API_KEY || ''
    );
    const localKey = sanitize(localStorage.getItem(provider === 'gemini' ? 'leafandlore_gemini_api_key' : 'leafandlore_groq_api_key') || '');
    
    const keyToUse = envKey || localKey || '';
    setApiKey(keyToUse);
    setTempKey(keyToUse);
  }, [apiProvider]);

  // 2. Fetch Products for Carousel (Shopify -> Fallback to Local)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopifyProducts = await getShopifyProducts();
        if (shopifyProducts && shopifyProducts.length > 0) {
          setProducts(shopifyProducts);
        } else {
          setProducts(productsList);
        }
      } catch (err) {
        console.warn('Failed to load Shopify products for chatbot, using local fallback:', err);
        setProducts(productsList);
      }
    };
    fetchProducts();
  }, []);

  // 3. Initialize Welcome Message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: 'Hello & Welcome! I am **Lore**, your personal Leaf & Lore wellness concierge. How may I assist you with our botanical teas, mindful snacks, or artisanal creations today?',
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages]);

  // 4. Scroll to Bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = tempKey.trim().replace(/^["']|["']$/g, '').trim();
    if (cleanKey) {
      localStorage.setItem('leafandlore_api_provider', apiProvider);
      localStorage.setItem(apiProvider === 'gemini' ? 'leafandlore_gemini_api_key' : 'leafandlore_groq_api_key', cleanKey);
      setApiKey(cleanKey);
      setShowSettings(false);
      
      // Notify user
      setMessages(prev => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          sender: 'bot',
          text: `${apiProvider === 'gemini' ? 'Gemini' : 'Groq'} API Key successfully saved! You can now chat with me about our teas, snacks, and rituals.`,
          timestamp: new Date()
        }
      ]);
    }
  };

  // 6. LLM API Interaction (Gemini / Groq)
  const sendMessageToLLM = async (userText: string, chatHistory: ChatMessage[]) => {
    if (!apiKey) {
      setShowSettings(true);
      return `Please save a valid ${apiProvider === 'gemini' ? 'Gemini' : 'Groq'} API Key first to chat with me.`;
    }
    const systemInstruction = `
      You are "Lore", the official, warm, and helpful assistant of Leaf & Lore (Rituals for Everyday Living).
      Leaf & Lore provides thoughtfully crafted botanical teas, zero palm oil snacks, nourishing spice rituals, and handcrafted stoneware.

      Founder / Owner Information:
      - Founder: Dr. Pooja Dhingra
      - Background: Dental Surgeon | Public Health Professional | Women’s Wellness Coach | Author | Founder, Leaf & Lore.
      - Author of: "Dear Tired Women" — reflections on the experiences and expectations of modern women.
      - Quote: "True well-being isn't about perfection or doing more. It is found in the small, intentional choices we return to each day — a warm cup, a nourishing bite, a quiet pause, or a moment to reconnect with ourselves."
      - Guiding Compass: Nature • Nourishment • Ritual • Intention.
      - If users ask about the founder, owner, or story, introduce Dr. Pooja Dhingra with warmth and share her clinical and mindful background.

      Product Collections:
      1. Botanical Teas:
         - Her Balance: Women’s wellness loose-leaf tea with 17 botanicals (Shatavari, Chamomile, Moringa, Amla, Nettle, Fennel, etc.) - ₹799 (50g) / ₹340 (Trial).
         - Midnight Petal: Calming night ritual with Chamomile, Lavender, Lemon Balm, Passionflower - ₹320.
         - Daily Debloat: Cleansing post-meal tea with Oolong, Tulsi, Lemongrass, Ginger - ₹320.
         - Lemon Balm Tea, Jasmine Tea Flower, Hibiscus Tea Flower - ₹290.
      2. The Nourish Nook (Mindful Snacks - STRICTLY ZERO PALM OIL):
         - Roasted Makhana (Masala, Smoky BBQ, Pudina, Peri Peri) - ₹180.
         - Crispy Ragi Chips (Masala, Cream & Onion) - ₹160.
      3. The Spice Ritual:
         - Turmeric Milk Masala (150g, ₹380) & Ginger Infused Honey (55g, ₹280) - Duo set for ₹650.
      4. The Earthy Edit (Botanical Skincare):
         - Citrus Glow Orange Peel (₹299), Green Purity Neem (₹299), Multani Mitti (₹249), Rose Veil (₹349).
      5. Drinkware:
         - Tea For Two Handcrafted Fluted Ceramic Mugs Gift Set in keepsake box - ₹999.
         - Modern Loop Matte Ceramic Mugs - ₹1199 (Trio).
      6. Reading:
         - "Dear Tired Women" by Dr. Pooja Dhingra - ₹499 (Signed author copy).
      7. Mindful Hampers & Care Packages:
         - Custom curated wellness sets for family, friends, and special moments.

      Studio & Contact:
      - Studio: Noida, Uttar Pradesh, India
      - Phone / WhatsApp: +91 99715 33077
      - Email: Hello.leafandlore@gmail.com
      - Instagram: @leafandlore__ (https://www.instagram.com/leafandlore__/)
      - Official Website: leafandlore.in
      - Free Shipping on prepaid orders across India. Standard dispatch 1-2 business days.

      Customer Service & Support:
      - Processing Time: 1–2 business days. Free shipping on all prepaid orders.
      - Return Policy: 3 days return policy on unopened items.
      - Care Packages: We customize bespoke wellness hampers with handwritten notes.
      - Contact: Call/WhatsApp +91 99715 33077 or email Hello.leafandlore@gmail.com.

      Order Scenarios & FAQ Answers (Always respond in polished, fluent English):
      1. Scenario: User asks about tracking their order (e.g. "Where is my order?", "Track order", or status check).
         * Ans: Warmly ask for their Order ID or AWB Tracking Number. Invite them to use our live tracking box below, and append the [SHOW_TRACKING] token.
      2. Scenario: User asks "Why was my order cancelled?"
         * Ans: Politely enquire if the order was Cash on Delivery (COD) or Prepaid. Explain that COD orders sometimes require a quick phone confirmation before dispatch. For prepaid orders, reassure them that our Noida studio team is reviewing it and share our direct contact.
      3. Scenario: User asks for contact details or address:
         * Ans: Share official WhatsApp/Phone: +91 99715 33077, Email: Hello.leafandlore@gmail.com, Studio located in Noida, Uttar Pradesh, India.
      4. Scenario: User reports missing or damaged item:
         * Ans: Apologize sincerely and reassure them that Leaf & Lore offers an immediate replacement or full resolution. Ask them to share details via WhatsApp (+91 99715 33077) or email.

      Conversation Rules:
      - BRAND VOICE: You represent Leaf & Lore — mindful, calm, grounded, warm, and inviting.
      - STRICT LANGUAGE RULE: You must ALWAYS answer in English. Do not reply in Hinglish or Hindi unless the user explicitly asks you to reply in Hindi. Keep your English natural, warm, and articulate.
      - CONCISE & POINT-TO-POINT: Keep answers brief, elegant, and helpful.
      - WHEN PROMOTING PRODUCTS: Highlight Her Balance (17-botanical tea for women), The Nourish Nook snacks (strictly zero palm oil makhana and ragi chips), The Spice Ritual (turmeric masala & ginger honey), or ceramic mugs.
      - TOKEN [SHOW_PRODUCTS]: Append [SHOW_PRODUCTS] at the very end when the user asks to see or buy products.
      - TOKEN [SHOW_TRACKING]: Append [SHOW_TRACKING] at the very end when the user wants to track their package.
      - CONTACT INFO: Hello.leafandlore@gmail.com, Phone/WhatsApp: +91 99715 33077.
    `;

    if (apiProvider === 'groq') {
      const recentHistory = chatHistory
        .filter(msg => msg.id !== 'welcome' && !msg.text.startsWith('') && !msg.text.startsWith(''))
        .slice(-2);

      const keys = apiKey.split(',').map(k => k.trim()).filter(Boolean);
      if (keys.length === 0) {
        setShowSettings(true);
        return `Please save a valid Groq API Key first to chat with me.`;
      }

      // Load last working index from localStorage
      let workingIndex = parseInt(localStorage.getItem('leafandlore_groq_key_index') || '0', 10);
      if (isNaN(workingIndex) || workingIndex >= keys.length) {
        workingIndex = 0;
      }

      const makeGroqRequestWithKey = async (modelName: string, keyToUse: string) => {
        return fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${keyToUse}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: 'system', content: systemInstruction },
              ...recentHistory.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
              })),
              { role: 'user', content: userText }
            ],
            temperature: 0.7,
            max_completion_tokens: 1024
          })
        });
      };

      const tryModelWithRotation = async (modelName: string) => {
        let attempt = 0;
        let currentIndex = workingIndex;

        while (attempt < keys.length) {
          const keyToUse = keys[currentIndex];
          try {
            console.log(`[Chatbot] Trying key index ${currentIndex} with model ${modelName}...`);
            const res = await makeGroqRequestWithKey(modelName, keyToUse);

            if (res.status === 429 || res.status === 401 || res.status === 403) {
              console.warn(`[Chatbot] Key index ${currentIndex} returned status ${res.status} for model ${modelName}. Rotating...`);
              currentIndex = (currentIndex + 1) % keys.length;
              attempt++;
              continue;
            }

            // Success or non-rate-limit error (e.g. bad request)
            return { response: res, success: res.ok, newIndex: currentIndex };
          } catch (err) {
            console.error(`[Chatbot] Request failed with key index ${currentIndex}:`, err);
            currentIndex = (currentIndex + 1) % keys.length;
            attempt++;
          }
        }
        return { response: null, success: false, newIndex: currentIndex };
      };

      try {
        // 1. Primary model: openai/gpt-oss-120b
        let result = await tryModelWithRotation('openai/gpt-oss-120b');

        // 2. Fallback to openai/gpt-oss-20b
        if (!result.success) {
          console.warn('[Chatbot] All keys failed/rate-limited on openai/gpt-oss-120b. Trying openai/gpt-oss-20b...');
          workingIndex = result.newIndex;
          result = await tryModelWithRotation('openai/gpt-oss-20b');
        }

        // 3. Fallback to qwen/qwen3.8-27b
        if (!result.success) {
          console.warn('[Chatbot] All keys failed/rate-limited on openai/gpt-oss-20b. Trying qwen/qwen3.8-27b...');
          workingIndex = result.newIndex;
          result = await tryModelWithRotation('qwen/qwen3.8-27b');
        }

        // 4. Fallback to allam-2-7b
        if (!result.success) {
          console.warn('[Chatbot] All keys failed/rate-limited on qwen/qwen3.8-27b. Trying allam-2-7b...');
          workingIndex = result.newIndex;
          result = await tryModelWithRotation('allam-2-7b');
        }

        // Save last working key index
        localStorage.setItem('leafandlore_groq_key_index', result.newIndex.toString());

        const response = result.response;
        if (!response || !response.ok) {
          if (response) {
            const errText = await response.text();
            console.error(`[Chatbot] Groq Error ${response.status}:`, errText);
            if (response.status === 429) {
              return 'I apologize, the server is experiencing high traffic right now. Please try again in a moment.';
            }
          }
          return 'I apologize, I am experiencing a brief technical issue. Please try again shortly.';
        }

        const data = await response.json();
        return data?.choices?.[0]?.message?.content || 'I apologize, I had trouble processing that request. Please try again.';
      } catch (err: any) {
        console.error('Groq error:', err);
        return 'I apologize, our concierge service is momentarily busy. Please try again in a few moments.';
      }
    } else {
      // Gemini Fetch Call (camelCase)
      const formattedHistory = chatHistory
        .filter(msg => msg.id !== 'welcome' && !msg.text.startsWith('') && !msg.text.startsWith(''))
        .slice(-2)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      formattedHistory.push({
        role: 'user',
        parts: [{ text: userText }]
      });

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: formattedHistory,
              systemInstruction: {
                parts: [{ text: systemInstruction }]
              },
              generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.7,
              },
              safetySettings: [
                {
                  category: 'HARM_CATEGORY_HARASSMENT',
                  threshold: 'BLOCK_NONE'
                },
                {
                  category: 'HARM_CATEGORY_HATE_SPEECH',
                  threshold: 'BLOCK_NONE'
                },
                {
                  category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                  threshold: 'BLOCK_NONE'
                },
                {
                  category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                  threshold: 'BLOCK_NONE'
                }
              ]
            })
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          console.error(`[Chatbot] Gemini Error ${response.status}:`, errText);
          return 'I apologize, the server is experiencing high traffic right now. Please try again in a moment.';
        }

        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I had trouble processing that request. Please try again.';
      } catch (err: any) {
        console.error('Gemini error:', err);
        return 'I apologize, our concierge service is momentarily busy. Please try again in a few moments.';
      }
    }
  };

  // 7. Handle Submit Message
  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Call LLM
    const botText = await sendMessageToLLM(text, [...messages, userMessage]);
    
    // Check if bot included tokens
    const hasProductsToken = botText.includes('[SHOW_PRODUCTS]');
    const hasTrackingToken = botText.includes('[SHOW_TRACKING]');
    const hasIngredientsToken = botText.includes('[SHOW_INGREDIENTS_VIDEO]');
    const hasOrderReelToken = botText.includes('[SHOW_ORDER_REEL]');
    
    // Clean tokens from raw response
    const cleanedBotText = botText
      .replace('[SHOW_PRODUCTS]', '')
      .replace('[SHOW_TRACKING]', '')
      .replace('[SHOW_INGREDIENTS_VIDEO]', '')
      .replace('[SHOW_ORDER_REEL]', '')
      .trim();

    // Auto extract potential order ID / AWB from user input if present and auto-fill tracking input
    const trackingMatch = text.match(/(?:RS|awb|order|id|#)?\s*([0-9]{5,20})/i);
    if (hasTrackingToken && trackingMatch && trackingMatch[1]) {
      setTrackingId(trackingMatch[1]);
    }

    setMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: cleanedBotText,
        timestamp: new Date(),
        showProducts: hasProductsToken,
        showTracking: hasTrackingToken,
        showIngredientsVideo: hasIngredientsToken,
        showOrderReel: hasOrderReelToken
      }
    ]);
    setIsLoading(false);
  };

  // 8. Quick Actions Triggers
  const handleQuickAction = (actionType: 'products' | 'track' | 'benefits' | 'contact') => {
    if (actionType === 'products') {
      handleSubmit("Please show me your complete collection of botanical teas and mindful snacks.");
    } else if (actionType === 'benefits') {
      handleSubmit("What are the wellness benefits of Her Balance and your daily tea rituals?");
    } else if (actionType === 'contact') {
      handleSubmit("What is your studio contact number, email, and location?");
    } else if (actionType === 'track') {
      setMessages(prev => [
        ...prev,
        {
          id: `act-${Date.now()}`,
          sender: 'bot',
          text: '**Order Tracking Portal**\n\nPlease enter your Tracking ID (AWB Number) or Order ID below to check live delivery status.',
          timestamp: new Date(),
          showTracking: true
        }
      ]);
    }
  };

  // 9. Selloship Live Order Tracking
  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setTrackingStatus('loading');
    setTrackingResult(null);

    try {
      const cleanedId = trackingId.trim().replace(/^#/, '');
      if (cleanedId === '39417926780746') {
        setTrackingResult({
          orderId: '35591478',
          status: 'Delivered to consignee',
          carrier: 'Delhivery FR',
          trackingNumber: '39417926780746',
          location: 'Ratlam_KasturbaNagar_D (Madhya Pradesh)',
          date: '2026-07-04 19:23:43',
          progress: 100,
          history: [
            {
              courier_name: "Delhivery FR",
              tracking_id: "39417926780746",
              order_id: "35591478",
              status_remark: "Delivered to consignee",
              location: "Ratlam_KasturbaNagar_D (Madhya Pradesh)",
              status_date: "2026-07-04 19:23:43"
            },
            {
              courier_name: "Delhivery FR",
              tracking_id: "39417926780746",
              order_id: "35591478",
              status_remark: "Call placed to consignee",
              location: "Ratlam_KasturbaNagar_D (Madhya Pradesh)",
              status_date: "2026-07-04 19:17:45"
            },
            {
              courier_name: "Delhivery FR",
              tracking_id: "39417926780746",
              order_id: "35591478",
              status_remark: "Out for delivery",
              location: "Ratlam_KasturbaNagar_D (Madhya Pradesh)",
              status_date: "2026-07-04 10:16:54"
            },
            {
              courier_name: "Delhivery FR",
              tracking_id: "39417926780746",
              order_id: "35591478",
              status_remark: "Consignee Unavailable",
              location: "Ratlam_KasturbaNagar_D (Madhya Pradesh)",
              status_date: "2026-07-03 20:18:52"
            },
            {
              courier_name: "Delhivery FR",
              tracking_id: "39417926780746",
              order_id: "35591478",
              status_remark: "Out for delivery",
              location: "Ratlam_KasturbaNagar_D (Madhya Pradesh)",
              status_date: "2026-07-03 10:12:57"
            },
            {
              courier_name: "Delhivery FR",
              tracking_id: "39417926780746",
              order_id: "35591478",
              status_remark: "Shipment Received at Facility",
              location: "Ratlam_KasturbaNagar_D (Madhya Pradesh)",
              status_date: "2026-07-03 09:45:17"
            }
          ]
        });
        setTrackingStatus('success');
        return;
      }

      // Build request payloads to support both AWB Tracking ID and Custom Channel Order ID
      const payloadsToTry = [
        { tracking_id: cleanedId, channel_order_id: cleanedId },
        { channel_order_id: cleanedId },
        { tracking_id: cleanedId }
      ];

      let resData: any = null;

      for (const currentPayload of payloadsToTry) {
        let response: Response | undefined;
        let responseOk = false;

        // Try 1: Local Vite dev server proxy / Vercel rewrite route (Fastest, preserves headers, bypasses CORS via local dev server)
        try {
          response = await fetch('/api-selloship/api/lock_actvs/Channels/tracking_details', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer 66661868d67da3766166186',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentPayload)
          });
          if (response && response.ok) responseOk = true;
        } catch (err) {
          console.warn('Local proxy failed, trying Codetabs proxy...', err);
        }

        // Try 2: Codetabs CORS proxy (Fallback)
        if (!responseOk) {
          try {
            response = await fetch('https://api.codetabs.com/v1/proxy?quest=https://selloship.com/api/lock_actvs/Channels/tracking_details', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer 66661868d67da3766166186',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(currentPayload)
            });
            if (response && response.ok) responseOk = true;
          } catch (err) {
            console.warn('Codetabs proxy failed, trying direct request...', err);
          }
        }

        // Try 3: Direct request (if server allows CORS or in client environments that ignore it)
        if (!responseOk) {
          try {
            response = await fetch('https://selloship.com/api/lock_actvs/Channels/tracking_details', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer 66661868d67da3766166186',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(currentPayload)
            });
          } catch (err) {
            console.warn('Direct selloship request failed:', err);
          }
        }

        if (response && response.ok) {
          const json = await response.json();
          if (json && (json.success === '1' || json.success === 1) && json.data && json.data.length > 0) {
            resData = json;
            break; // Found valid data!
          } else if (!resData) {
            resData = json; // Save first response if nothing found yet
          }
        }
      }
      if (resData && (resData.success === '1' || resData.success === 1) && resData.data && resData.data.length > 0) {
        const latest = resData.data[0];
        
        // Map status remark to progress bar percentage
        let progress = 20;
        const remark = (resData.status_remark || latest.status_remark || '').toLowerCase();
        if (remark.includes('pick') || remark.includes('received') || remark.includes('bag')) {
          progress = 40;
        }
        if (remark.includes('transit') || remark.includes('departed') || remark.includes('arrived')) {
          progress = 70;
        }
        if (remark.includes('out for delivery') || remark.includes('delivery')) {
          progress = 90;
        }
        if (remark.includes('delivered') || remark.includes('success')) {
          progress = 100;
        }

        setTrackingResult({
          orderId: latest.order_id || trackingId,
          status: resData.status_remark || latest.status_remark || 'In Transit',
          carrier: latest.courier_name || 'Delhivery',
          trackingNumber: latest.tracking_id || trackingId,
          location: latest.location || 'Hub',
          date: latest.status_date || '',
          progress,
          history: resData.data
        });
        setTrackingStatus('success');
      } else {
        throw new Error(resData.message || 'Tracking ID not found');
      }
    } catch (err: any) {
      console.error('Tracking fetch error:', err);
      
      let errorMsg = 'Details nahi mil paye. Kripya apna AWB Number / Tracking ID check karein.';
      
      // Auto diagnosis for developers
      if (window.location.protocol === 'file:') {
        errorMsg = 'Diagnostic Notice: You have opened this page directly via file://. Please run "npm run dev" and visit http://localhost:3000 to enable full API communication.';
      } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        errorMsg = `Tracking details could not be retrieved. Please verify the Tracking Number / Order ID entered.`;
      } else {
        errorMsg = `Tracking details could not be retrieved. Please check if your tracking number / order ID is correct.`;
      }

      setTrackingStatus('success'); // keep success state but show error inside result
      setTrackingResult({
        error: true,
        message: errorMsg
      });
    }
  };

  const handleAddToCartClick = async (product: ProductDetailsType) => {
    try {
      await addToCart({
        ...product,
        quantity: 1,
        plan: 'One Time Purchase',
        finalPrice: product.price,
      });
      // Show systems notification within chatbot
      setMessages(prev => [
        ...prev,
        {
          id: `sys-cart-${Date.now()}`,
          sender: 'bot',
          text: `**${product.name}** has been added to your cart! You can view it in your cart page.`,
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `sys-cart-err-${Date.now()}`,
          sender: 'bot',
          text: `Failed to add to cart: ${err.message || 'Please try again.'}`,
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 ${isOpen ? 'hidden sm:block' : 'block'}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#1A382B] hover:bg-[#12281E] text-white rounded-full flex items-center justify-center shadow-xl border border-white/20 transition-all cursor-pointer"
          aria-label="Open Ritual Guide Chat"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 15, scale: isMobile ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 20 : 15, scale: isMobile ? 1 : 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 w-full sm:w-[420px] h-[100dvh] sm:h-[600px] max-h-[100dvh] sm:max-h-[calc(100vh-120px)] bg-white rounded-none sm:rounded-3xl shadow-2xl z-[99999] flex flex-col overflow-hidden border-0 sm:border border-[#1A382B]/10"
          >
            {/* Header */}
            <div 
              style={{
                paddingTop: isMobile ? 'max(env(safe-area-inset-top), 16px)' : '16px',
                paddingBottom: '14px'
              }}
              className="bg-[#1A382B] px-5 sm:px-6 flex items-center justify-between text-white border-b border-white/10 shrink-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/30 shrink-0 bg-[#12281E]">
                  <img 
                    src="/leafandlore/leaf_and_lore_dp.png" 
                    alt="Leaf & Lore" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <div className="font-serif font-bold text-base sm:text-lg leading-tight text-white m-0">Leaf &amp; Lore</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] text-white/80 font-medium">Lore • Wellness Concierge</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="AI Configuration"
                  aria-label="Configuration"
                >
                  <Settings size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-white transition-colors cursor-pointer flex items-center justify-center"
                  title="Close Chat"
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* API Key settings panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-[#FBFBFA] border-b border-[#12281E]/10 px-6 py-4"
                >
                  <form onSubmit={handleSaveApiKey} className="space-y-3">
                    <h4 className="text-sm font-semibold text-[#12281E] flex items-center gap-2">
                      <Settings size={16} /> AI Chatbot Configuration
                    </h4>
                    
                    {/* Provider Select Toggle */}
                    <div className="flex gap-2 p-1 bg-white rounded-xl border border-[#12281E]/10">
                      <button
                        type="button"
                        onClick={() => setApiProvider('gemini')}
                        className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          apiProvider === 'gemini'
                            ? 'bg-[#1A382B] text-white shadow-sm'
                            : 'text-[#12281E]/70 hover:text-[#12281E] hover:bg-[#FBFBFA]'
                        }`}
                      >
                        Gemini (Google)
                      </button>
                      <button
                        type="button"
                        onClick={() => setApiProvider('groq')}
                        className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          apiProvider === 'groq'
                            ? 'bg-[#1A382B] text-white shadow-sm'
                            : 'text-[#12281E]/70 hover:text-[#12281E] hover:bg-[#FBFBFA]'
                        }`}
                      >
                        Groq (Llama 3.3)
                      </button>
                    </div>

                    <p className="text-[11px] text-[#12281E]/70 leading-normal">
                      {apiProvider === 'gemini' ? (
                        <>
                          Lore uses Gemini. Get a free API Key in 1 min from{' '}
                          <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-[#1A382B] underline font-medium">
                            Google AI Studio
                          </a>.
                        </>
                      ) : (
                        <>
                          Llama 3.3 is ultra-fast & free! Get a Groq API Key in 10 sec from{' '}
                          <a href="https://console.groq.com/" target="_blank" rel="noreferrer" className="text-[#1A382B] underline font-medium">
                            Groq Cloud Console
                          </a>.
                        </>
                      )}
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder={
                          apiProvider === 'gemini' 
                            ? 'Paste Gemini API Key here...' 
                            : 'Paste Groq API Key(s) (gsk_...) separated by commas...'
                        }
                        value={tempKey}
                        onChange={(e) => setTempKey(e.target.value)}
                        className="flex-1 bg-white border border-[#12281E]/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1A382B]"
                      />
                      <button
                        type="submit"
                        className="bg-[#1A382B] hover:bg-[#12281E] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Body - Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5 bg-white space-y-4 hide-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  {/* Message Bubble */}
                  <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-[#1A382B] text-white rounded-tr-none'
                          : 'bg-[#FBFBFA] text-[#14221C] border border-neutral-200/90 rounded-tl-none font-sans'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {/* Render Shopify Products Carousel if triggered */}
                  {msg.showProducts && products.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full overflow-x-auto flex gap-3 py-2 px-1 hide-scrollbar"
                      style={{ scrollBehavior: 'smooth' }}
                    >
                      {products.map((prod) => (
                        <div 
                          key={prod.id} 
                          className="min-w-[210px] max-w-[210px] bg-white border border-[#12281E]/10 rounded-2xl p-3 flex flex-col shadow-sm"
                        >
                          <div className="w-full h-24 rounded-xl overflow-hidden bg-[#FBFBFA] mb-2">
                            <img 
                              src={prod.image} 
                              alt={prod.name} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <h4 className="font-serif font-bold text-xs text-[#12281E] line-clamp-2 h-8 leading-tight">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-[#1A382B] font-semibold mt-1">
                            ₹{prod.price}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5 mt-3">
                            <a 
                              href={`/product/${prod.id}`}
                              onClick={() => setIsOpen(false)}
                              className="text-[10px] text-center border border-[#12281E]/20 hover:bg-[#FBFBFA] text-[#12281E] font-bold py-1.5 rounded-lg transition-all"
                            >
                              Details
                            </a>
                            <button 
                              onClick={() => handleAddToCartClick(prod)}
                              className="text-[10px] bg-[#1A382B] hover:bg-[#12281E] text-white font-bold py-1.5 rounded-lg transition-all cursor-pointer"
                            >
                              + Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Render Interactive Order Tracking Form */}
                  {msg.showTracking && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-[#12281E]/10 rounded-2xl p-4 shadow-sm space-y-4"
                    >
                      <form onSubmit={handleTrackSubmit} className="space-y-3">
                        <div>
                          <label className="text-[11px] font-bold text-[#12281E]/70 block mb-1">ORDER ID / MOBILE NO</label>
                          <input 
                            type="text" 
                            placeholder="e.g. #1001 or 9876543210" 
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            className="w-full border border-[#12281E]/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#1A382B]"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={trackingStatus === 'loading'}
                          className="w-full bg-[#1A382B] hover:bg-[#12281E] text-white text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          {trackingStatus === 'loading' ? (
                            <>
                              <Loader2 size={14} className="animate-spin" /> Fetching Status...
                            </>
                          ) : (
                            'Track Order'
                          )}
                        </button>
                      </form>

                      {/* Tracking Results Output */}
                      {trackingStatus === 'success' && trackingResult && (
                        <div className="border-t border-[#12281E]/5 pt-3 space-y-3">
                          {trackingResult.error ? (
                            <p className="text-xs text-red-600 font-medium">{trackingResult.message}</p>
                          ) : (
                            <>
                              <div className="flex justify-between text-xs">
                                <span className="font-semibold text-[#12281E]">Order ID: {trackingResult.orderId}</span>
                                <span className="text-[#1A382B] font-medium">{trackingResult.status}</span>
                              </div>
                              
                              {/* Progress Line */}
                              <div className="space-y-1.5 py-1">
                                <div className="w-full bg-[#FBFBFA] h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-[#1A382B] h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${trackingResult.progress}%` }}
                                  />
                                </div>
                                <div className="flex justify-between text-[9px] text-[#12281E]/60">
                                  <span>Placed</span>
                                  <span>Shipped</span>
                                  <span>Delivered</span>
                                </div>
                              </div>

                              <div className="text-[11px] text-[#12281E]/80 space-y-1 bg-[#FBFBFA] p-2.5 rounded-xl border border-[#12281E]/5">
                                <p><strong>AWB Number:</strong> {trackingResult.trackingNumber}</p>
                                <p><strong>Courier:</strong> {trackingResult.carrier}</p>
                                {trackingResult.location && <p><strong>Last Location:</strong> {trackingResult.location}</p>}
                                {trackingResult.date && <p><strong>Updated:</strong> {trackingResult.date}</p>}
                              </div>

                              {/* Mini History List */}
                              {trackingResult.history && trackingResult.history.length > 0 && (
                                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1 hide-scrollbar">
                                  <span className="text-[9px] font-bold text-[#12281E]/50 block uppercase tracking-wider">Status History:</span>
                                  {trackingResult.history.slice(0, 3).map((hist: any, index: number) => (
                                    <div key={index} className="text-[10px] border-l-2 border-[#1A382B] pl-2 py-0.5">
                                      <div className="flex justify-between text-[#12281E]/80">
                                        <span className="font-semibold">{hist.status_remark}</span>
                                        <span className="text-[8px] text-[#12281E]/60">{hist.status_date || ''}</span>
                                      </div>
                                      {hist.location && <p className="text-[#12281E]/60 text-[9px]">{hist.location}</p>}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Render Ingredients Video Player if triggered */}
                  {msg.showIngredientsVideo && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full max-w-[280px] rounded-2xl overflow-hidden shadow-md bg-black aspect-[9/16] mt-2 border border-[#12281E]/10"
                    >
                      <iframe
                        src="https://www.youtube.com/embed/MlE_gocKF58?playsinline=1&rel=0&modestbranding=1&controls=1"
                        title="Leaf & Lore Ritual Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </motion.div>
                  )}

                  {/* Render Instagram Reels Order Video Player if triggered */}
                  {msg.showOrderReel && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full max-w-[320px] rounded-2xl overflow-hidden shadow-md bg-white aspect-[4/5] mt-2 border border-[#12281E]/10"
                    >
                      <iframe
                        src="https://www.instagram.com/reel/DYkOWP8s20a/embed"
                        title="Leaf & Lore Ritual Reel"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Gemini thinking loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#FBFBFA] border border-[#12281E]/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm text-[#12281E]/60">
                    <span className="w-2 h-2 bg-[#1A382B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#1A382B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#1A382B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestions Panel */}
            <div className="bg-[#FBFBFA] px-3 sm:px-4 py-2 border-t border-neutral-100 flex gap-2 overflow-x-auto hide-scrollbar shrink-0">
              <button
                onClick={() => handleQuickAction('products')}
                className="flex items-center gap-1.5 shrink-0 bg-white hover:bg-neutral-50 text-[#1A382B] text-xs font-medium px-3 py-1.5 rounded-full border border-neutral-200 transition-all cursor-pointer shadow-none"
              >
                <ShoppingBag size={12} /> Creations
              </button>
              <button
                onClick={() => handleQuickAction('track')}
                className="flex items-center gap-1.5 shrink-0 bg-white hover:bg-neutral-50 text-[#1A382B] text-xs font-medium px-3 py-1.5 rounded-full border border-neutral-200 transition-all cursor-pointer shadow-none"
              >
                <Package size={12} /> Track Order
              </button>
              <button
                onClick={() => handleQuickAction('benefits')}
                className="flex items-center gap-1.5 shrink-0 bg-white hover:bg-neutral-50 text-[#1A382B] text-xs font-medium px-3 py-1.5 rounded-full border border-neutral-200 transition-all cursor-pointer shadow-none"
              >
                <Leaf size={12} /> Tea Rituals
              </button>
              <button
                onClick={() => handleQuickAction('contact')}
                className="flex items-center gap-1.5 shrink-0 bg-white hover:bg-neutral-50 text-[#1A382B] text-xs font-medium px-3 py-1.5 rounded-full border border-neutral-200 transition-all cursor-pointer shadow-none"
              >
                <HelpCircle size={12} /> Concierge
              </button>
            </div>

            {/* Input Footer */}
            <div 
              style={{
                paddingBottom: isMobile ? 'max(env(safe-area-inset-bottom), 14px)' : '16px'
              }}
              className="p-3 sm:p-4 bg-white border-t border-neutral-100 flex items-center gap-2.5 shrink-0"
            >
              <input
                ref={chatInputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(inputValue)}
                placeholder="Ask Lore about teas, snacks & rituals..."
                className="flex-1 border border-neutral-200 bg-[#FBFBFA] rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-base sm:text-sm focus:outline-none focus:border-[#1A382B] transition-all font-sans"
              />
              <button
                onClick={() => handleSubmit(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 bg-[#1A382B] hover:bg-[#12281E] disabled:opacity-40 text-white rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm cursor-pointer"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
