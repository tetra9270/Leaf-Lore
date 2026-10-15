export interface BlogPostAuthor {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export interface ImageSpec {
  id: string;
  placeholderLabel: string;
  specDescription: string;
  altText: string;
  aspectRatio?: string;
  previewUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NutritionItem {
  nutrient: string;
  amount: string;
  whyItMatters: string;
}

export interface HealthBenefit {
  id: number;
  title: string;
  shortDesc: string;
  detail: string;
  iconName: string;
}

export interface BlogPostData {
  id: string;
  slug: string;
  canonicalUrl: string;
  title: string;
  subtitle?: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  lsiKeywords: string[];
  category: string;
  tags: string[];
  estWordCount: string;
  readTime: string;
  author: BlogPostAuthor;
  datePublished: string;
  ogImage: string;
  heroImage: ImageSpec;
  toc: { id: string; title: string }[];
  articleSchema: Record<string, any>;
  faqSchema: Record<string, any>;
  images: Record<string, ImageSpec>;
  benefits: HealthBenefit[];
  nutritionTable: NutritionItem[];
  faqs: FAQItem[];
  relatedSlugs: string[];
  contentSections: {
    id: string;
    heading: string;
    paragraphs: string[];
    callout?: string;
  }[];
}

const defaultAuthor: BlogPostAuthor = {
  name: 'Dr. Pooja Dhingra',
  role: 'Founder, Leaf & Lore | Dental Surgeon & Women’s Wellness Coach',
  bio: 'Dental Surgeon, Public Health Professional, and author of Dear Tired Women. Building mindful rituals for modern life.',
  avatar: '/leafandlore/founder_dr_pooja.png'
};

export const blogPosts: BlogPostData[] = [
  {
    id: '1',
    slug: '17-botanicals-womens-wellness-her-balance',
    canonicalUrl: 'https://leafandlore.in/blog/17-botanicals-womens-wellness-her-balance',
    title: '17 Botanicals for Women’s Hormonal Harmony: The Story Behind Her Balance',
    subtitle: 'For the woman who pours into everyone else, an invitation to pour back into yourself.',
    metaTitle: '17 Botanicals for Women’s Wellness | Leaf & Lore',
    metaDescription: 'Discover the traditional wisdom behind Her Balance — a 17-botanical herbal blend crafted by Dr. Pooja Dhingra to support female hormonal balance, restful sleep, and daily nourishment.',
    focusKeyword: "women's wellness tea",
    secondaryKeywords: ['her balance tea', 'botanical tea for women', 'shatavari chamomile blend'],
    lsiKeywords: ['hormonal balance', 'mindful tea rituals', 'dr pooja dhingra'],
    category: 'Herbal Teas & Rituals',
    tags: ['Women’s Health', 'Botanical Teas', 'Rituals', 'Adaptogens'],
    estWordCount: '1,400 words',
    readTime: '6 min read',
    author: defaultAuthor,
    datePublished: '2026-10-01',
    ogImage: '/leafandlore/her_balance.png',
    heroImage: {
      id: 'hero-1',
      placeholderLabel: 'Her Balance Tea Hero',
      specDescription: 'Pouch of Her Balance surrounded by loose chamomile, hibiscus, and dried botanicals',
      altText: 'Leaf & Lore Her Balance Tea blend on botanical background',
      previewUrl: '/leafandlore/her_balance.png'
    },
    toc: [
      { id: 'the-modern-woman-rhythm', title: 'The Rhythm of the Modern Woman' },
      { id: '17-botanicals', title: 'Why 17 Specific Botanicals?' },
      { id: 'ritual-not-routine', title: 'Making It a Ritual, Not a Routine' },
      { id: 'brewing-guide', title: 'The Ideal Brewing Ritual' }
    ],
    articleSchema: {},
    faqSchema: {},
    images: {},
    benefits: [
      { id: 1, title: 'Hormonal Balance', shortDesc: 'Shatavari, Moringa & Nettle nurture endocrine harmony.', detail: 'Adaptogenic herbs help stabilize energy fluctuations throughout monthly cycles.', iconName: 'Heart' },
      { id: 2, title: 'Stress Relief', shortDesc: 'Chamomile & Shankhpushpi ease nervous tension.', detail: 'Calms the mind without drowsiness.', iconName: 'Shield' },
      { id: 3, title: 'Digestive Ease', shortDesc: 'Fennel, Cardamom & Ginger soothe bloating.', detail: 'Gentle carminative spices optimize post-meal comfort.', iconName: 'Sparkles' }
    ],
    nutritionTable: [
      { nutrient: 'Caffeine', amount: '0 mg', whyItMatters: 'Naturally decaffeinated for peaceful evenings.' },
      { nutrient: 'Antioxidants', amount: 'High', whyItMatters: 'Protects cells from everyday oxidative stress.' },
      { nutrient: 'Active Adaptogens', amount: '17 Pure Herbs', whyItMatters: 'Synergistic botanical bioavailability.' }
    ],
    faqs: [
      { question: 'When is the best time to drink Her Balance?', answer: 'Her Balance can be savoured either in the late afternoon or about 45 minutes before bedtime to unwind from daily stressors.' },
      { question: 'Can I consume this daily?', answer: 'Yes! It is formulated with food-grade, gentle culinary and restorative botanicals that thrive on daily consistency.' }
    ],
    relatedSlugs: ['art-of-slow-living-rituals', 'zero-palm-oil-mindful-snacking'],
    contentSections: [
      {
        id: 'the-modern-woman-rhythm',
        heading: 'The Rhythm of the Modern Woman',
        paragraphs: [
          'In a world where women are perpetually praised for juggling endless responsibilities, quiet moments of self-replenishment become an afterthought. Dr. Pooja Dhingra wrote Dear Tired Women after witnessing countless women drain their reserves while caring for everyone else.',
          'Her Balance was born out of this desire: to give women a tangible, warm ritual that says, "Pause. This cup is just for you."'
        ],
        callout: 'True well-being isn’t about doing more. It is found in the small, intentional choices we return to each day.'
      },
      {
        id: '17-botanicals',
        heading: 'Why 17 Specific Botanicals?',
        paragraphs: [
          'Each ingredient was chosen not just for chemical synergy, but for sensory delight. The soothing honey-apple scent of Chamomile pairs with earthy Shatavari and Moringa; cooling Fennel and Peppermint balance the warm spices of Ginger, Cinnamon, and Cardamom.',
          'Together, they address the full triad of feminine wellness: mental calm, hormonal resilience, and digestive ease.'
        ]
      },
      {
        id: 'ritual-not-routine',
        heading: 'Making It a Ritual, Not a Routine',
        paragraphs: [
          'A routine is a task you cross off a checklist; a ritual is an act where you bring your full presence. When water meets tea leaves, observe the colour blooming. Inhale the steam. Let your breath deepen.'
        ]
      }
    ]
  },
  {
    id: '2',
    slug: 'art-of-slow-living-rituals',
    canonicalUrl: 'https://leafandlore.in/blog/art-of-slow-living-rituals',
    title: 'The Art of Slow Living: Why Daily Rituals Outperform Productivity Routines',
    subtitle: 'Moving from mindless busyness to intentional everyday living.',
    metaTitle: 'The Art of Slow Living & Everyday Rituals | Leaf & Lore',
    metaDescription: 'Explore the philosophy of Leaf & Lore: how simple daily rituals—a warm cup of tea, wholesome snacks, and quiet reflection—transform daily stress into grounded presence.',
    focusKeyword: 'slow living rituals',
    secondaryKeywords: ['mindful living', 'daily wellness rituals', 'leaf and lore philosophy'],
    lsiKeywords: ['mindfulness', 'dr pooja dhingra', 'calm lifestyle'],
    category: 'Mindful Living',
    tags: ['Mindfulness', 'Lifestyle', 'Philosophy', 'Wellbeing'],
    estWordCount: '1,200 words',
    readTime: '5 min read',
    author: defaultAuthor,
    datePublished: '2026-10-05',
    ogImage: '/leafandlore/tea_collection_hero.png',
    heroImage: {
      id: 'hero-2',
      placeholderLabel: 'Slow Living Lifestyle',
      specDescription: 'Warm ceramic mug held in hands against soft linen and botanical shadows',
      altText: 'Mindful slow morning with Leaf and Lore tea',
      previewUrl: '/leafandlore/tea_collection_hero.png'
    },
    toc: [
      { id: 'tyranny-of-more', title: 'The Tyranny of Doing More' },
      { id: 'anatomy-of-a-ritual', title: 'Anatomy of an Everyday Ritual' },
      { id: 'everyday-anchors', title: 'Creating Everyday Anchors' }
    ],
    articleSchema: {},
    faqSchema: {},
    images: {},
    benefits: [
      { id: 1, title: 'Mental Space', shortDesc: 'Reduces sensory overload.', detail: 'Pauses regulate your cortisol and autonomic nervous system.', iconName: 'Brain' },
      { id: 2, title: 'Deeper Connection', shortDesc: 'Brings intention to loved ones.', detail: 'Shared cups and real conversations build authentic community.', iconName: 'Users' }
    ],
    nutritionTable: [],
    faqs: [
      { question: 'What is the easiest way to start?', answer: 'Pick one micro-moment: your first morning brew, an afternoon snack, or putting down your phone 30 minutes before sleep with a warm cup of Midnight Petal.' }
    ],
    relatedSlugs: ['17-botanicals-womens-wellness-her-balance', 'zero-palm-oil-mindful-snacking'],
    contentSections: [
      {
        id: 'tyranny-of-more',
        heading: 'The Tyranny of Doing More',
        paragraphs: [
          'Modern culture tells us that success requires running at maximum velocity. But continuous hustle inevitably leads to emotional exhaustion.',
          'Leaf & Lore was built on the quiet rebellion that life is richest when we learn to sit with stillness.'
        ]
      }
    ]
  },
  {
    id: '3',
    slug: 'zero-palm-oil-mindful-snacking',
    canonicalUrl: 'https://leafandlore.in/blog/zero-palm-oil-mindful-snacking',
    title: 'Why Zero Palm Oil is Non-Negotiable: The Story Behind The Nourish Nook',
    subtitle: 'Wholesome roasted makhana and ragi chips made without shortcuts.',
    metaTitle: 'Zero Palm Oil Mindful Snacking | Leaf & Lore',
    metaDescription: 'Discover why Leaf & Lore snacks contain 0% palm oil, artificial colours, or preservatives. Meet our roasted makhana and crispy ragi chips.',
    focusKeyword: 'zero palm oil snacks',
    secondaryKeywords: ['roasted makhana', 'ragi chips healthy', 'mindful snacks'],
    lsiKeywords: ['the nourish nook', 'healthy indian snacks', 'clean eating'],
    category: 'The Nourish Nook',
    tags: ['Clean Eating', 'Snacks', 'Nutrition', 'Makhana'],
    estWordCount: '1,100 words',
    readTime: '4 min read',
    author: defaultAuthor,
    datePublished: '2026-10-08',
    ogImage: '/leafandlore/masala_makhana.png',
    heroImage: {
      id: 'hero-3',
      placeholderLabel: 'Nourish Nook Snacks',
      specDescription: 'Jars of Masala Makhana, Smoky BBQ, and Crispy Ragi Chips with fresh ingredients',
      altText: 'Leaf & Lore roasted makhana and ragi chips zero palm oil',
      previewUrl: '/leafandlore/masala_makhana.png'
    },
    toc: [
      { id: 'the-palm-oil-problem', title: 'The Problem with Commercial Snacking' },
      { id: 'ancient-superfoods', title: 'Foxnuts and Ragi: Ancient Nutrition' },
      { id: 'flavour-without-compromise', title: 'Pure Flavour Without Compromise' }
    ],
    articleSchema: {},
    faqSchema: {},
    images: {},
    benefits: [
      { id: 1, title: 'Zero Palm Oil', shortDesc: 'Protects cardiovascular health.', detail: 'Crafted strictly with high-quality cold-pressed oils.', iconName: 'ShieldCheck' },
      { id: 2, title: 'High Fiber & Protein', shortDesc: 'Sustained energy release.', detail: 'Makhana and ragi prevent sudden glucose spikes.', iconName: 'Zap' }
    ],
    nutritionTable: [
      { nutrient: 'Palm Oil', amount: '0%', whyItMatters: 'Completely free from artery-clogging trans and industrial fats.' },
      { nutrient: 'Dietary Fiber', amount: 'Rich', whyItMatters: 'Promotes gut satiety and healthy digestion.' }
    ],
    faqs: [
      { question: 'Are these snacks gluten-free?', answer: 'Yes! Both Foxnuts (makhana) and finger millet (ragi) are naturally gluten-free ancient grains.' }
    ],
    relatedSlugs: ['17-botanicals-womens-wellness-her-balance', 'art-of-slow-living-rituals'],
    contentSections: [
      {
        id: 'the-palm-oil-problem',
        heading: 'The Problem with Commercial Snacking',
        paragraphs: [
          'Pick up almost any packaged snack in the market today, and you will see palm oil listed as the primary fat. High in saturated fats and heavily processed, it cheapens production at the expense of human wellness and environmental health.',
          'At Leaf & Lore, we committed to zero palm oil from day one. Our makhana is dry roasted to airy perfection and tossed with cold-pressed oils and ground spices.'
        ]
      }
    ]
  }
];

export const BLOG_POSTS = blogPosts;

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return blogPosts.find(p => p.slug === slug || p.id === slug);
}
