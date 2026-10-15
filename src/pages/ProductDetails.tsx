import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Check, RefreshCw, Banknote, Truck, Shield, Play, Minus, Plus, X, MessageSquarePlus, Sparkles, Camera } from 'lucide-react';
import { Contact } from '../components/Contact';
import { Social } from '../components/Social';
import { ProductCard } from '../components/BestSellers';
import { ProductShorts } from '../components/ProductShorts';
import { getProductById, ProductDetailsType, ProductMediaItem, productsList } from '../data/products';
import { getShopifyProducts } from '../lib/getProducts';
import { useCart } from '../context/CartContext';
import { getYouTubeEmbedUrl } from '../lib/utils';
import { addReviewToFirebase, getReviewsFromFirebase } from '../lib/firebase';

interface ReviewItem {
  id: number | string;
  name: string;
  date: string;
  rating: number;
  text: string;
  images?: string[];
}

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductDetailsType | null>(null);
  const [shopifyCatalog, setShopifyCatalog] = useState<ProductDetailsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [variantPreviewImage, setVariantPreviewImage] = useState<string | null>(null);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [activeReviewImage, setActiveReviewImage] = useState<string | null>(null);

  // Write a Review & Live Display State
  const [userReviews, setUserReviews] = useState<ReviewItem[]>([]);
  const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showThankYouToast, setShowThankYouToast] = useState(false);

  // New Review Form Inputs
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewImage, setNewReviewImage] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<Array<HTMLDivElement | null>>([]);

  const getProductKey = (name: string) => {
    const n = (name || '').toLowerCase();
    if (n.includes('balance')) return 'her-balance';
    if (n.includes('debloat')) return 'daily-debloat';
    if (n.includes('midnight') || n.includes('petal')) return 'midnight-petal';
    if (n.includes('makhana')) return 'makhana';
    if (n.includes('ragi')) return 'ragi';
    if (n.includes('spice') || n.includes('turmeric')) return 'spice-ritual';
    if (n.includes('honey')) return 'honey';
    if (n.includes('tea for two') || n.includes('mug') || n.includes('loop')) return 'stoneware';
    if (n.includes('tired women') || n.includes('book')) return 'reading';
    if (n.includes('tea')) return 'botanical-tea';
    return 'leaf-and-lore';
  };

  // Helper to deduplicate reviews by content
  const getReviewUniqueKey = (r: ReviewItem) => {
    const txt = (r.text || '').trim().toLowerCase();
    const dt = (r.date || '').trim();
    const imgs = (r.images || []).join('|');
    return `${txt}_${dt}_${imgs}`;
  };

  const mergeUniqueReviews = (listA: ReviewItem[], listB: ReviewItem[]): ReviewItem[] => {
    const seen = new Set<string>();
    const result: ReviewItem[] = [];

    for (const item of [...listA, ...listB]) {
      const key = getReviewUniqueKey(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }

    return result;
  };

  // Load User Submitted Reviews 100% live from Firebase Cloud Database
  useEffect(() => {
    if (product) {
      const pKey = getProductKey(product.name);

      // Fetch Global Reviews from Firebase Firestore Cloud Database
      const syncFirebaseReviews = async () => {
        const cloudReviews = await getReviewsFromFirebase(pKey);
        if (cloudReviews && cloudReviews.length > 0) {
          const formatted: ReviewItem[] = cloudReviews.map((r, idx) => ({
            id: r.id ? (typeof r.id === 'number' ? r.id : Date.parse(r.date) || Date.now() + idx) : Date.now() + idx,
            name: r.name || 'Verified Buyer',
            date: r.date,
            rating: r.rating,
            text: r.text,
            images: r.images,
          }));

          setUserReviews(formatted);
        } else {
          setUserReviews([]);
        }
      };

      syncFirebaseReviews();
    }
  }, [product]);

  const handleReviewPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const rawDataUrl = reader.result as string;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 800;
          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
            setNewReviewImage(compressedDataUrl);
          } else {
            setNewReviewImage(rawDataUrl);
          }
        };
        img.src = rawDataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToImgBB = async (base64Image: string): Promise<string | null> => {
    try {
      const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');
      const formData = new FormData();
      formData.append('image', cleanBase64);

      // ImgBB 100% Free Cloud Upload API
      const res = await fetch('https://api.imgbb.com/1/upload?key=c304f32e95a947d7a7604f3fb30ff544', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json && json.data && json.data.url) {
        return json.data.url; // Returns direct HTTPS hosted ImgBB photo URL
      }
      return null;
    } catch (err) {
      console.error('ImgBB upload error:', err);
      return null;
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    setIsSubmittingReview(true);

    let hostedImageUrl: string | null = null;
    if (newReviewImage) {
      hostedImageUrl = await uploadToImgBB(newReviewImage);
    }

    const finalImage = hostedImageUrl || newReviewImage;
    const pKey = product ? getProductKey(product.name) : 'general';
    const reviewerName = newReviewName.trim() || 'Verified Buyer';

    const reviewPayload: any = {
      name: reviewerName,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      rating: newReviewRating,
      text: newReviewText.trim(),
      productKey: pKey,
    };

    if (finalImage) {
      reviewPayload.images = [finalImage];
    }

    // Save directly to Firebase Firestore Cloud DB for ALL users worldwide
    const saveSuccess = await addReviewToFirebase(reviewPayload);

    if (saveSuccess) {
      // Re-fetch 100% live straight from Firebase Cloud DB
      const cloudReviews = await getReviewsFromFirebase(pKey);
      if (cloudReviews && cloudReviews.length > 0) {
        const formatted: ReviewItem[] = cloudReviews.map((r, idx) => ({
          id: r.id ? (typeof r.id === 'number' ? r.id : Date.parse(r.date) || Date.now() + idx) : Date.now() + idx,
          name: r.name || 'Verified Buyer',
          date: r.date,
          rating: r.rating,
          text: r.text,
          images: r.images,
        }));
        setUserReviews(formatted);
      }

      setNewReviewName('');
      setNewReviewRating(5);
      setNewReviewText('');
      setNewReviewImage(null);
      setIsSubmittingReview(false);
      setShowWriteReviewModal(false);

      setShowThankYouToast(true);
      setTimeout(() => {
        setShowThankYouToast(false);
      }, 4500);
    } else {
      setIsSubmittingReview(false);
      alert('Error connecting to Firebase Cloud Database. Please check your network and try submitting again.');
    }
  };

  const handleImageError = (url: string) => {
    setImageErrors(prev => new Set(prev).add(url));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const parseProductDescription = (product: ProductDetailsType): ProductDetailsType => {
      // Parse HTML description if it contains Ingredients or How to Use
      const desc = Array.isArray(product.description)
        ? product.description.join('\n')
        : product.description;
      const normalizedDesc = desc.replace(/data-src\s*=/gi, 'src=');

      const lowerDesc = normalizedDesc.toLowerCase();

      // Extract ALL images from description
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
      const dataSrcRegex = /<img[^>]+data-src=["']([^"']+)["']/gi;
      let imgMatch;
      const images: string[] = [];

      // Reset regex for reuse
      imgRegex.lastIndex = 0;
      while ((imgMatch = imgRegex.exec(normalizedDesc)) !== null) {
        if (imgMatch[1] && !images.includes(imgMatch[1])) {
          images.push(imgMatch[1]);
        }
      }

      // Also check for data-src
      dataSrcRegex.lastIndex = 0;
      while ((imgMatch = dataSrcRegex.exec(normalizedDesc)) !== null) {
        if (imgMatch[1] && !images.includes(imgMatch[1])) {
          images.push(imgMatch[1]);
        }
      }

      if (images.length > 0) {
        product.descriptionImages = images;
      }

      // Split by major section headers
      let descriptionOnly = normalizedDesc;
      let ingredientsText = '';
      let howToUseText = '';

      // Extract Ingredients section
      if (lowerDesc.includes('ingredients')) {
        const ingredientsIndex = lowerDesc.indexOf('ingredients');
        const beforeIngredients = normalizedDesc.substring(0, ingredientsIndex);
        let afterIngredients = normalizedDesc.substring(ingredientsIndex);

        // Check if there's a "How to Use" section after Ingredients
        if (lowerDesc.includes('how to use')) {
          const howToUseIndex = lowerDesc.indexOf('how to use');
          if (howToUseIndex > ingredientsIndex) {
            ingredientsText = normalizedDesc.substring(ingredientsIndex, howToUseIndex);
            howToUseText = normalizedDesc.substring(howToUseIndex);
            descriptionOnly = beforeIngredients;
          }
        } else {
          ingredientsText = afterIngredients;
          descriptionOnly = beforeIngredients;
        }
      } else if (lowerDesc.includes('how to use')) {
        // Only How to Use, no Ingredients
        const howToUseIndex = lowerDesc.indexOf('how to use');
        descriptionOnly = normalizedDesc.substring(0, howToUseIndex);
        howToUseText = normalizedDesc.substring(howToUseIndex);
      }

      // Keep full HTML description so embedded Shopify images always render.
      product.description = [normalizedDesc];

      // Extract Ingredients text
      if (ingredientsText) {
        const cleanedIngredients = ingredientsText
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/ingredients?/gi, '') // Remove "Ingredients" label
          .replace(/&nbsp;/g, ' ') // Replace with space
          .trim();

        if (cleanedIngredients && !product.ingredients) {
          product.ingredients = cleanedIngredients;
        }
      }

      // Extract How to Use steps
      if (howToUseText) {
        const stepsArray: string[] = [];

        // Extract numbered items (1., 2., 3., etc.)
        const stepMatches = howToUseText.match(/\d+\.\s*[^<\n]+/g);

        if (stepMatches) {
          stepMatches.forEach((step: string) => {
            const cleanedStep = step
              .replace(/\d+\.\s*/, '') // Remove number
              .replace(/<[^>]*>/g, '') // Remove HTML tags
              .replace(/&nbsp;/g, ' ') // Replace with space
              .trim();

            if (cleanedStep) {
              stepsArray.push(cleanedStep);
            }
          });
        }

        if (stepsArray.length > 0 && !product.howToUse) {
          product.howToUse = stepsArray;
        }
      }

      return product;
    };

    const fetchProduct = async () => {
      if (!id) return; // Add a guard for id
      try {
        // Get local product first (has all custom fields)
        let localProduct = getProductById(id);

        const normalizeName = (value: string) =>
          value
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        // Try to get from Shopify to get real-time data
        const shopifyProducts = await getShopifyProducts();
        setShopifyCatalog(shopifyProducts);
        let shopifyProduct = shopifyProducts.find((p) => p.id === id);

        // If route uses local IDs (1,2,3...) map to Shopify by product name, not partial ID matching.
        if (!shopifyProduct && localProduct) {
          const localName = normalizeName(localProduct.name);
          shopifyProduct = shopifyProducts.find((p) => {
            const shopifyName = normalizeName(p.name);
            return (
              shopifyName === localName ||
              shopifyName.includes(localName) ||
              localName.includes(shopifyName)
            );
          });
        }

        // If route uses Shopify IDs, map to localProduct by product name.
        if (shopifyProduct && !localProduct) {
          const shopifyName = normalizeName(shopifyProduct.name);
          localProduct = productsList.find((p) => {
            const localName = normalizeName(p.name);
            return (
              localName === shopifyName ||
              localName.includes(shopifyName) ||
              shopifyName.includes(localName)
            );
          });
        }

        if (shopifyProduct && localProduct) {
          // Use Shopify's descriptionHtml if it has real content (not just the generic fallback).
          // Otherwise use the local product's rich description array.
          const shopifyHtml = shopifyProduct.descriptionHtml || '';
          const shopifyDescText = Array.isArray(shopifyProduct.description)
            ? shopifyProduct.description.join(' ')
            : shopifyProduct.description || '';
          const hasRealShopifyDescription =
            shopifyHtml.trim().length > 0 &&
            !shopifyDescText.trim().toLowerCase().includes('generic product fallback');

          let merged: ProductDetailsType = {
            ...localProduct,
            ...shopifyProduct,
            // Use Shopify HTML if it has real content, otherwise keep local detailed description
            description: hasRealShopifyDescription
              ? [shopifyHtml]
              : localProduct.description,
            id: localProduct.id, // Use local ID for consistency
            isPrepaidOnly: localProduct.isPrepaidOnly ?? shopifyProduct.isPrepaidOnly,
            benefits: localProduct.benefits,
            ingredients: localProduct.ingredients,
            howToUse: localProduct.howToUse,
            shortsUrls: localProduct.shortsUrls,
            videoUrls: shopifyProduct.videoUrls?.length ? shopifyProduct.videoUrls : localProduct.videoUrls,
          };
          // Parse additional fields from description
          merged = parseProductDescription(merged);
          setProduct(merged);
        } else if (localProduct) {
          // Use local product (has all fields)
          let product = { ...localProduct };
          product = parseProductDescription(product);
          setProduct(product);
        } else if (shopifyProduct) {
          // Only Shopify product available
          let product = { ...shopifyProduct };
          product = parseProductDescription(product);
          setProduct(product);
        }
      } catch (error) {
        setShopifyCatalog([]);
        // Fallback to local products
        const localProduct = getProductById(id);
        if (localProduct) {
          setProduct(localProduct);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    setSelectedImage(0);
    setSelectedVariant(0);
    setVariantPreviewImage(null);
    setQuantity(1);
  }, [id]);

  // ─── KwikPass: Product Page View Event ─────────────────────────────────
  useEffect(() => {
    if (!product || loading) return;

    const cartId = localStorage.getItem('shopify_cart_id') || '';
    
    const event = new CustomEvent('page_view_kp', {
      detail: {
        type: 'product',
        data: {
          cart_id: cartId,
          product_id: product.id,
          variant_id: product.shopifyVariantId || '',
          image_url: product.image || '',
          name: product.name,
          price: product.price,
          handle: product.id, // URL slug
        },
      },
    });

    window.dispatchEvent(event);
    console.log('[KwikPass] page_view_kp (product) dispatched:', product.name);
  }, [product, loading]);

  useEffect(() => {
    const selectedThumb = thumbRefs.current[selectedImage];
    if (!selectedThumb) return;

    selectedThumb.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
      block: 'nearest',
    });
  }, [selectedImage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A382B] mx-auto mb-4"></div>
          <p className="text-[#1A382B]">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-2xl font-serif text-[#1A382B] mb-6">Creation not found</p>
          <Link to="/shop" className="text-[#1A382B] font-semibold underline underline-offset-4 hover:opacity-75 transition-opacity">
            &larr; Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const oneTimePrice = product.variants ? product.variants[selectedVariant].price : product.price;
  const selectedVariantData = product.variants ? product.variants[selectedVariant] : undefined;
  const isSelectedVariantInStock = selectedVariantData ? selectedVariantData.inStock !== false : true;
  const selectedVariantId = product.variants ? product.variants[selectedVariant].shopifyVariantId : product.shopifyVariantId;
  const currentCompareAtPrice = selectedVariantData?.compareAtPrice || product.compareAtPrice || product.originalPrice;

  const mediaItems: ProductMediaItem[] =
    product.media && product.media.length > 0
      ? product.media
      : [
        ...product.gallery.map((url) => ({ type: 'image' as const, url })),
        ...(product.videoUrls || []).map((url) => ({ type: 'video' as const, url })),
      ];
  const selectedMedia = mediaItems[selectedImage] || mediaItems[0];
  const selectedVideoUrl = selectedMedia?.type === 'video' ? selectedMedia.url : undefined;
  const selectedImageUrl = selectedMedia?.type === 'image' ? selectedMedia.url : product.gallery[0] || product.image;
  const displayImageUrl = variantPreviewImage || selectedImageUrl;
  const showSelectedVideo = selectedMedia?.type === 'video' && !variantPreviewImage;
  const isEmbedVideo = !!selectedVideoUrl && /youtube\.com|youtu\.be|vimeo\.com|instagram\.com|player\./i.test(selectedVideoUrl);
  const normalizeProductName = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  const currentProductName = normalizeProductName(product.name);
  const relatedProducts = shopifyCatalog
    .filter((p) => normalizeProductName(p.name) !== currentProductName)
    .slice(0, 4);

  const getVideoThumbnailUrl = (url: string): string | undefined => {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();

      if (host.includes('youtube.com')) {
        const videoId = parsed.searchParams.get('v');
        return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined;
      }

      if (host.includes('youtu.be')) {
        const videoId = parsed.pathname.replace('/', '').trim();
        return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined;
      }
    } catch {
      return undefined;
    }

    return undefined;
  };

  const normalizeImageUrl = (url: string): string => {
    try {
      const parsed = new URL(url);
      return `${parsed.origin}${parsed.pathname}`;
    } catch {
      return url;
    }
  };

  const getEmbedVideoUrl = (url: string, autoplay: boolean): string => {
    return getYouTubeEmbedUrl(url, { autoplay });
  };

  const handleVideoHoverStart = () => {
    if (!selectedVideoUrl) return;

    setIsVideoHovered(true);

    if (!isEmbedVideo && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      void videoRef.current.play().catch(() => {
        // Some browsers may block autoplay with sound until explicit user interaction.
      });
    }
  };

  const handleVideoHoverEnd = () => {
    if (!selectedVideoUrl) return;

    setIsVideoHovered(false);

    if (!isEmbedVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    // Close video view by returning to the first image media item.
    const firstImageIndex = mediaItems.findIndex((item) => item.type === 'image');
    setVariantPreviewImage(null);
    setSelectedImage(firstImageIndex >= 0 ? firstImageIndex : 0);
  };

  const handleAddToCart = async () => {
    const variantLabel = product.variants ? product.variants[selectedVariant].label : '';
    const selectedVariantImage = product.variants ? product.variants[selectedVariant].image : undefined;

    if (!isSelectedVariantInStock) {
      alert('This variant is out of stock');
      return;
    }

    if (!selectedVariantId) {
      alert('Unable to add to cart. Please select a variant.');
      return;
    }

    try {
      await addToCart({
        ...product,
        image: selectedVariantImage || product.image,
        inStock: isSelectedVariantInStock,
        quantity: quantity,
        plan: variantLabel ? `${variantLabel}` : 'One Time Purchase',
        finalPrice: oneTimePrice,
        shopifyVariantId: selectedVariantId,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      console.error('Add to cart error:', error);
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-16 text-[#1A382B]">
      {/* Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mb-8">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm font-medium text-[#1A382B]/60 flex-wrap gap-y-1">
          <Link to="/" className="hover:text-[#1A382B] transition-colors">Home</Link>
          <span className="mx-2.5 text-[#1A382B]/30 font-light">→</span>
          <Link to={`/shop?cat=${product.category || 'Teas'}`} className="hover:text-[#1A382B] transition-colors">{product.category || 'Rituals'}</Link>
          <span className="mx-2.5 text-[#1A382B]/30 font-light">→</span>
          <span className="text-[#1A382B] font-semibold">{product.name}</span>
        </nav>
      </div>

      {/* Product Main Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[600px_minmax(0,1fr)] gap-8 md:gap-12 lg:gap-20 mb-16 md:mb-24">
        {/* Left: Images */}
        <div className="space-y-6">
          {/* Main Image / Video */}
          <div className="rounded-[24px] md:rounded-[32px] overflow-hidden border border-[#1A382B]/5 relative bg-white aspect-square sm:aspect-[4/5] lg:aspect-auto lg:w-[600px] lg:h-[600px]">
            {showSelectedVideo ? (
              <div
                className="w-full h-full bg-black flex items-center justify-center"
                onMouseEnter={handleVideoHoverStart}
                onMouseLeave={handleVideoHoverEnd}
              >
                {selectedVideoUrl && isEmbedVideo ? (
                  <iframe
                    src={getEmbedVideoUrl(selectedVideoUrl, isVideoHovered)}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Product Video"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={selectedVideoUrl}
                    className="w-full h-full object-contain"
                    controls={isVideoHovered}
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
            ) : (
              displayImageUrl && !imageErrors.has(displayImageUrl) ? (
                <img
                  src={displayImageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={() => handleImageError(displayImageUrl)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  <span>Image unavailable</span>
                </div>
              )
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex items-center gap-4 relative px-8">
            <button
              onClick={() => {
                const total = mediaItems.length;
                setVariantPreviewImage(null);
                setSelectedImage((prev) => prev > 0 ? prev - 1 : total - 1);
              }}
              className="absolute left-0 text-[#1A382B]/30 hover:text-[#1A382B] transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <div 
              ref={thumbStripRef} 
              className="flex gap-2 sm:gap-3 overflow-x-auto snap-x hide-scrollbar justify-start scroll-smooth"
              style={{ scrollPadding: '0 20px' }}
            >
              {mediaItems.map((media, i) => (
                <div
                  key={`${media.type}-${i}-${media.url}`}
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  onClick={() => {
                    setVariantPreviewImage(null);
                    setSelectedImage(i);
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl sm:rounded-2xl cursor-pointer transition-all snap-center overflow-hidden relative ${media.type === 'image' ? 'p-1.5 sm:p-2' : 'p-0'
                    } ${selectedImage === i
                      ? 'border-2 border-[#1A382B] bg-[#EAF5E8] shadow-md scale-105 z-10'
                      : 'border-2 border-transparent bg-white/50 hover:border-[#1A382B]/30'
                    }`}
                >
                  {media.type === 'image' ? (
                    !imageErrors.has(media.url) ? (
                      <img
                        src={media.url}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-full object-contain"
                        onError={() => handleImageError(media.url)}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
                        Failed
                      </div>
                    )
                  ) : (
                    <>
                      {getVideoThumbnailUrl(media.url) ? (
                        <img
                          src={getVideoThumbnailUrl(media.url)!}
                          alt={`${product.name} video ${i + 1}`}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(getVideoThumbnailUrl(media.url)!)}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <video
                          src={media.url}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/15 flex items-center justify-center pointer-events-none">
                        <div className="w-6 h-6 rounded-full bg-black/70 flex items-center justify-center">
                          <Play size={10} className="text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const total = mediaItems.length;
                setVariantPreviewImage(null);
                setSelectedImage((prev) => prev < total - 1 ? prev + 1 : 0);
              }}
              className="absolute right-0 text-[#1A382B]/30 hover:text-[#1A382B] transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-5">
          <span className="bg-[#98B098] text-white px-3 py-1 text-[10px] sm:text-xs font-bold uppercase rounded">Best Seller</span>

          <h1 className="text-3xl lg:text-4xl font-serif text-[#1A382B] leading-[1.15]">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 py-1">
            <span className="text-2xl sm:text-3xl font-sans font-bold text-[#1A382B] leading-none">₹{oneTimePrice.toFixed(0)}</span>
            {currentCompareAtPrice > oneTimePrice && (
              <span className="text-lg text-[#1A382B]/50 line-through font-medium mb-1">₹{currentCompareAtPrice.toFixed(0)}</span>
            )}
          </div>

          {/* Rating Widget */}
          <div className="inline-flex items-center gap-2.5 bg-[#FBFBFA] border border-neutral-200/90 rounded-full px-3.5 py-1.5 flex-wrap">
            <span className="font-semibold text-[#1A382B] text-sm">{product.rating || 4.9}</span>
            <div className="flex gap-0.5 text-[#1A382B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill={i < Math.floor(product.rating || 5) ? "currentColor" : "transparent"} strokeWidth={i < Math.floor(product.rating || 5) ? 0 : 1.5} className={i >= Math.floor(product.rating || 5) ? "text-neutral-300" : ""} />
              ))}
            </div>
            <span className="text-[#1A382B]/60 text-xs font-normal">{(product.reviews || 84).toLocaleString()} reviews</span>
          </div>

          {/* Variant Selector - Card Style (hide if single "Default Title" variant) */}
          {product.variants && product.variants.length > 0 && !(product.variants.length === 1 && product.variants[0].label.toLowerCase() === 'default title') && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1A382B]/60">Option: <span className="text-[#1A382B] normal-case tracking-normal text-sm">{product.variants[selectedVariant]?.label || ''}</span></span>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {product.variants.map((variant, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedVariant(i);

                      if (!variant.image) {
                        setVariantPreviewImage(null);
                        return;
                      }

                      const variantImageKey = normalizeImageUrl(variant.image);
                      const imageIndex = mediaItems.findIndex(
                        (item) => item.type === 'image' && normalizeImageUrl(item.url) === variantImageKey
                      );

                      if (imageIndex >= 0) {
                        setVariantPreviewImage(null);
                        setSelectedImage(imageIndex);
                        return;
                      }

                      // Fallback: show variant image even if not present in media gallery.
                      setVariantPreviewImage(variant.image);
                    }}
                    className={`flex flex-col rounded-xl border-2 overflow-hidden transition-all w-[110px] sm:w-[120px] hover:shadow-md relative ${variant.inStock === false ? 'opacity-75' : ''
                      } ${selectedVariant === i
                        ? 'border-[#1A382B] shadow-md ring-1 ring-[#1A382B] bg-white'
                        : 'border-[#1A382B]/10 hover:border-[#1A382B]/30 bg-white'
                      }`}
                  >
                    {variant.inStock === false && (
                      <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide z-10">
                        Out of stock
                      </span>
                    )}
                    <div className="w-full aspect-square flex items-center justify-center p-2 border-b border-[#1A382B]/5">
                      {(variant.image || product.image) && !imageErrors.has(variant.image || product.image || '') ? (
                        <img
                          src={variant.image || product.image}
                          alt={variant.label}
                          className="w-full h-full object-contain"
                          onError={() => handleImageError(variant.image || product.image || '')}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="w-full px-2 py-3 text-center flex flex-col justify-between flex-1">
                      <span className="text-[11px] sm:text-xs font-semibold text-[#1A382B] block leading-tight mb-2 min-h-[28px]">{variant.label}</span>
                      <div>
                        <span className="text-[15px] sm:text-base font-bold text-[#1A382B] block leading-none">₹{variant.price.toFixed(0)}</span>
                        <span className="text-[11px] text-[#1A382B]/40 line-through font-medium mt-1 block">₹{(variant.compareAtPrice || Math.round(variant.price * 1.3)).toFixed(0)}</span>

                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex flex-col gap-4 pt-4">
            {/* Quantity Selector and Add to Cart Button Container */}
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="space-y-2 w-full sm:w-[140px] shrink-0">
                <span className="text-xs font-bold uppercase tracking-widest text-[#1A382B]/60 px-2">Quantity</span>
                <div className="flex items-center w-full bg-white border border-[#1A382B]/10 rounded-full overflow-hidden shadow-sm h-[56px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 h-full flex items-center justify-center text-[#1A382B] hover:bg-[#F4F7F2] transition-colors disabled:opacity-50 pl-2"
                    disabled={quantity <= 1}
                  >
                    <Minus size={20} />
                  </button>
                  <div className="w-14 h-full flex items-center justify-center font-bold text-[#1A382B] border-x border-[#1A382B]/5 text-lg">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 h-full flex items-center justify-center text-[#1A382B] hover:bg-[#F4F7F2] transition-colors pr-2"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full">
                <button
                  onClick={handleAddToCart}
                  disabled={!isSelectedVariantInStock}
                  className={`w-full text-white font-bold h-[56px] rounded-full transition-colors shadow-xl text-[17px] ${isSelectedVariantInStock
                    ? 'bg-[#1A382B] hover:bg-[#0a3106] cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  {isSelectedVariantInStock ? 'Add to cart' : 'Coming Soon'}
                </button>
              </div>
            </div>

            {!isSelectedVariantInStock && (
              <p className="text-[12px] text-orange-600 font-semibold text-center">
                This product is coming soon. Stay tuned!
              </p>
            )}

            {product.isPrepaidOnly && (
              <div className="bg-[#FBFBFA] border border-[#1A382B]/20 rounded-xl p-3.5 flex items-center gap-2.5 text-[#1A382B] text-xs sm:text-sm font-medium shadow-none">
                <Shield className="text-[#1A382B] shrink-0" size={16} />
                <span>Special Collection Offering: Online Payment Only (Fast & Priority Delivery)</span>
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div className="bg-[#FBFBFA] rounded-2xl p-4 sm:p-5 mt-6 border border-neutral-200/90">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: RefreshCw, label: "Easy Returns" },
                { icon: Banknote, label: product.isPrepaidOnly ? "Prepaid Only" : "COD Available" },
                { icon: Truck, label: "Free Shipping" },
                { icon: Shield, label: "Pure Botanicals" },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center group">
                  <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 text-[#1A382B] flex items-center justify-center shadow-none group-hover:scale-105 transition-transform">
                    <badge.icon size={16} className="text-[#1A382B]" />
                  </div>
                  <span className="text-[#1A382B] text-[10px] sm:text-xs font-semibold uppercase tracking-wider">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>

      {/* Product Details - Full Width */}
      <section className={`bg-white/50 border-t ${product.shortsUrls && product.shortsUrls.length > 0 ? '' : 'border-b mb-16 md:mb-24'} border-[#1A382B]/5 py-12 md:py-16 px-4 sm:px-6 md:px-12`}>
        <div className="max-w-[1400px] mx-auto space-y-12 lg:space-y-16">

          {/* Companion Rituals in Same Collection */}
          {(() => {
            const companionProducts = shopifyCatalog
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4);

            if (companionProducts.length === 0) return null;

            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1A382B]/10 pb-4">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#1A382B]/50 block">Complementary Pairings</span>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#1A382B]">
                      More from {product.category}
                    </h3>
                  </div>
                  <Link to={`/shop?cat=${product.category}`} className="text-xs font-semibold text-[#1A382B] hover:underline">
                    View All {product.category} →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {companionProducts.map((companion) => (
                    <div 
                      key={companion.id}
                      onClick={() => navigate(`/product/${companion.id}`)}
                      className="group cursor-pointer space-y-2 p-3 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#1A382B]/40 hover:shadow-md transition-all text-left"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-[#FBFBFA] border border-neutral-100 p-2 sm:p-3 flex items-center justify-center">
                        <img 
                          src={companion.image} 
                          alt={companion.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#1A382B] leading-tight line-clamp-1 group-hover:underline">
                          {companion.name.split('–')[0].trim()}
                        </p>
                        <p className="text-xs text-[#1A382B] font-bold mt-1">₹{companion.price.toFixed(0)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Description & Key Benefits OR Product Image */}
          {product.description ? (
            <>
              {(() => {
                const rawDesc = Array.isArray(product.description)
                  ? product.description.join('\n')
                  : product.description;

                // If the description has no HTML tags, it's plain local text — wrap each line in <p>
                const hasHTML = /<[a-z][\s\S]*>/i.test(rawDesc);
                const fullDesc = hasHTML
                  ? rawDesc
                  : rawDesc
                      .split('\n')
                      .map(line => line.trim())
                      .filter(line => line.length > 0)
                      .map(line => `<p>${line}</p>`)
                      .join('');

                const cleanHTML = fullDesc
                  .replace(/<img[^>]*>/gi, '')
                  .replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, '')
                  .replace(/<figure[^>]*>\s*<\/figure>/gi, '')
                  .replace(/data-src\s*=/gi, 'src=');

                return (
                  <>
                    <div className="space-y-4 text-[15px] sm:text-base text-[#1A382B]/80 leading-relaxed">
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#1A382B] border-b border-[#1A382B]/10 pb-4 mb-8">
                        Description
                      </h3>
                      <div
                        className="prose max-w-none prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-p:text-[#1A382B]/80"
                        dangerouslySetInnerHTML={{ __html: cleanHTML }}
                      />
                    </div>
                  </>
                );
              })()}
            </>
          ) : (
            product.gallery && product.gallery.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-serif text-[#1A382B] border-b border-[#1A382B]/10 pb-4 mb-8">
                  Product Image
                </h3>
                <div className="rounded-3xl overflow-hidden border border-[#1A382B]/5 shadow-lg">
                  <img
                    src={product.gallery[0]}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )
          )}

          {/* Benefits Section */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A382B] border-b border-[#1A382B]/10 pb-4">
                Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white border border-neutral-200/90 rounded-xl px-4 py-3.5 shadow-none hover:border-[#1A382B]/30 transition-colors"
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#1A382B] flex items-center justify-center shrink-0">
                      <Check size={11} className="text-white" strokeWidth={2.5} />
                    </span>
                    <span className="text-[13px] sm:text-[14px] text-[#1A382B] font-medium leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients Section */}
          {product.ingredients && (
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A382B] border-b border-[#1A382B]/10 pb-4">
                Ingredients &amp; Whole Botanicals
              </h3>
              <div className="bg-[#FBFBFA] border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-none">
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.split(',').map((ing, i) => (
                    <span
                      key={i}
                      className="bg-white border border-neutral-200 text-[#1A382B] text-xs font-medium px-3.5 py-1.5 rounded-full shadow-none hover:border-[#1A382B]/40 transition-colors"
                    >
                      {ing.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* How to Use Section */}
          {product.howToUse && product.howToUse.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A382B] border-b border-[#1A382B]/10 pb-4">
                How to Use
              </h3>
              <div className="space-y-3">
                {product.howToUse.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white border border-[#1A382B]/8 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all hover:border-[#1A382B]/20"
                  >
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#1A382B] text-white font-bold text-sm flex items-center justify-center shadow">
                      {i + 1}
                    </span>
                    <p className="text-[14px] sm:text-[15px] text-[#1A382B]/85 font-medium leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description Images (below the structured info) */}
          {product.descriptionImages && product.descriptionImages.length > 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {product.descriptionImages.map((imgUrl, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-[#1A382B]/5 shadow-md">
                    <img
                      src={imgUrl}
                      alt={`${product.name} detail ${i + 1}`}
                      className="w-full h-auto object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {product.shortsUrls && product.shortsUrls.length > 0 && (
        <ProductShorts shorts={product.shortsUrls} />
      )}

      {/* Social Section from Home Page */}


      {/* Reviews Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mb-16 md:mb-24 relative">
        
        {/* Floating Thank You Toast Notification */}
        {showThankYouToast && (
          <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[60] animate-bounce transition-all w-[90%] max-w-md">
            <div className="bg-[#1A382B] text-white px-5 py-4 rounded-2xl shadow-2xl border border-emerald-400/30 flex items-center gap-3.5 backdrop-blur-md">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Check size={22} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-base leading-tight">Thank You For Your Review! </h5>
                <p className="text-xs text-emerald-100 mt-0.5 font-medium">Your review has been published and is now live below.</p>
              </div>
            </div>
          </div>
        )}

        {/* Section Header with Title & Write a Review Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-[42px] font-serif text-[#1A382B] leading-none text-center sm:text-left">
            Customer Reviews
          </h2>

          <button
            onClick={() => setShowWriteReviewModal(true)}
            className="bg-[#1A382B] hover:bg-[#12281E] text-white font-medium text-xs uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquarePlus size={16} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Render All Reviews (100% Live Firebase Firestore Database Reviews) */}
        {(() => {
          const allCombined = userReviews;
          const totalCount = allCombined.length;
          const avgRating = totalCount > 0 
            ? (allCombined.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1)
            : '5.0';
          const numericAvg = parseFloat(avgRating);

          return (
            <div>
              {/* Total Rating Widget - Real-Time Exact Count from Firebase */}
              <div className="bg-[#FBFBFA] border border-neutral-200/90 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1A382B] text-xl">{avgRating}</span>
                      <div className="flex text-[#1A382B]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < Math.floor(numericAvg) ? "currentColor" : "transparent"}
                            strokeWidth={i < Math.floor(numericAvg) ? 0 : 1.5}
                            className={i >= Math.floor(numericAvg) ? "text-neutral-300" : ""}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[#1A382B]/60 font-normal text-xs mt-1 block">
                      Based on {totalCount} {totalCount === 1 ? 'verified review' : 'verified reviews'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Render Firebase Review Cards */}
              {allCombined.length > 0 ? (
                <div className="space-y-6">
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {allCombined.map((review) => (
                      <div key={review.id} className="bg-white rounded-2xl p-6 border border-neutral-200/80 break-inside-avoid shadow-none hover:border-[#1A382B]/30 hover:shadow-sm transition-all cursor-default relative">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            {review.name && (
                              <span className="text-sm font-semibold text-[#1A382B] block mb-0.5">{review.name}</span>
                            )}
                            <span className="text-[11px] text-[#1A382B]/40 font-normal">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="flex text-[#1A382B]">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={11} fill={i < review.rating ? "currentColor" : "transparent"} strokeWidth={i < review.rating ? 0 : 1.5} />
                              ))}
                            </div>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#1A382B] text-white flex items-center justify-center">
                              <Check size={9} strokeWidth={2.5} />
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-[#1A382B]/80 leading-relaxed font-medium">
                          {review.text}
                        </p>

                        {review.images && review.images.length > 0 && (
                          <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-4">
                            {review.images.map((imgUrl, imgIdx) => (
                              <div
                                key={imgIdx}
                                onClick={() => setActiveReviewImage(imgUrl)}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border border-[#1A382B]/15 cursor-pointer hover:opacity-95 hover:scale-105 active:scale-95 transition-all shadow-sm bg-white touch-manipulation"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Review photo ${imgIdx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action Button: Write a Review */}
                  <div className="flex items-center justify-center pt-4">
                    <button
                      onClick={() => setShowWriteReviewModal(true)}
                      className="bg-[#1A382B] hover:bg-[#082b05] text-white font-bold px-8 py-3.5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all text-sm cursor-pointer"
                    >
                      <MessageSquarePlus size={18} />
                      <span>Write a Review</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#EAF0E8]/60 rounded-2xl p-8 text-center border border-[#1A382B]/10 my-4 space-y-3">
                  <p className="text-[#1A382B] font-bold text-lg">No reviews yet for this product category</p>
                  <p className="text-xs text-[#1A382B]/70 max-w-md mx-auto">
                    All reviews are loaded live from Firebase. Be the first customer to leave a review for this product!
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setShowWriteReviewModal(true)}
                      className="bg-[#1A382B] hover:bg-[#082b05] text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 text-sm cursor-pointer shadow-md hover:shadow-lg active:scale-95 transition-all"
                    >
                      <MessageSquarePlus size={18} />
                      <span>Write First Review</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </section>

      {/* Write a Review Modal Popup - 100% Mobile Responsive */}
      {showWriteReviewModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[70] flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[92vh] overflow-y-auto border border-[#1A382B]/10 my-auto">
            
            {/* Close Modal Button */}
            <button
              onClick={() => setShowWriteReviewModal(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-[#EAF0E8] text-[#1A382B] flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all cursor-pointer z-10"
              aria-label="Close review modal"
            >
              <X size={18} />
            </button>

            <div className="mb-5 sm:mb-6 pr-8">
              <h3 className="text-xl sm:text-2xl font-serif text-[#1A382B]">Write a Review</h3>
              <p className="text-xs text-[#1A382B]/60 font-medium mt-1">
                Share your honest review for {product.name}
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Reviewer Name Input */}
              <div>
                <label className="block text-xs font-semibold text-[#1A382B] uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="Enter your name (e.g. Ananya Sharma)"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#1A382B] focus:ring-1 focus:ring-[#1A382B] outline-none text-base sm:text-sm font-medium text-[#1A382B] bg-[#FBFBFA] touch-manipulation"
                />
              </div>

              {/* Rating Picker */}
              <div>
                <label className="block text-xs font-semibold text-[#1A382B] uppercase tracking-wider mb-1.5">
                  Your Rating *
                </label>
                <div className="flex items-center justify-between sm:justify-start gap-1 sm:gap-2 bg-[#FBFBFA] p-3 rounded-xl border border-neutral-200">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 active:scale-125 hover:scale-110 transition-transform cursor-pointer touch-manipulation"
                      >
                        <Star
                          size={24}
                          fill={star <= newReviewRating ? "#1A382B" : "transparent"}
                          stroke={star <= newReviewRating ? "#1A382B" : "#cbd5e1"}
                          strokeWidth={star <= newReviewRating ? 0 : 1.5}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1A382B] shrink-0">
                    {newReviewRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Review Text Area */}
              <div>
                <label className="block text-xs font-semibold text-[#1A382B] uppercase tracking-wider mb-1.5">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share your personal experience with this blend or ritual..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#1A382B] focus:ring-1 focus:ring-[#1A382B] outline-none text-base sm:text-sm font-medium text-[#1A382B] bg-[#FBFBFA] touch-manipulation"
                />
              </div>

              {/* Photo Upload (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-[#1A382B] uppercase tracking-wider mb-1.5">
                  Upload Photo (Optional)
                </label>
                <div className="border border-dashed border-neutral-300 rounded-2xl p-4 text-center bg-[#FBFBFA] hover:bg-neutral-100/50 transition-colors relative">
                  {newReviewImage ? (
                    <div className="relative inline-block group">
                      <img
                        src={newReviewImage}
                        alt="Review upload preview"
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-neutral-200 shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => setNewReviewImage(null)}
                        className="absolute -top-2 -right-2 bg-[#1A382B] text-white rounded-full p-1.5 shadow-md hover:bg-black active:scale-90 transition-all"
                        aria-label="Remove photo"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2 py-2 active:opacity-75 touch-manipulation">
                      <div className="w-10 h-10 rounded-full bg-[#1A382B]/5 text-[#1A382B] flex items-center justify-center">
                        <Camera size={20} />
                      </div>
                      <span className="text-xs font-medium text-[#1A382B]">
                        Tap to select photo from device
                      </span>
                      <span className="text-[10px] text-[#1A382B]/50">
                        PNG, JPG, WEBP formats supported
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReviewPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowWriteReviewModal(false)}
                  className="flex-1 h-[48px] border border-neutral-200 rounded-xl font-medium text-[#1A382B] text-xs uppercase tracking-wider hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="flex-1 h-[48px] bg-[#1A382B] hover:bg-[#12281E] active:scale-95 text-white rounded-xl font-medium text-xs uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Image Modal Lightbox - Mobile Responsive */}
      {activeReviewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md transition-all"
          onClick={() => setActiveReviewImage(null)}
        >
          <button
            onClick={() => setActiveReviewImage(null)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md active:scale-90 transition-all cursor-pointer"
            aria-label="Close photo view"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-w-full sm:max-w-4xl max-h-[85vh] sm:max-h-[90vh] rounded-2xl overflow-hidden flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeReviewImage}
              alt="Enlarged review photo"
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Suggested Products Section */}
      <section className="bg-[#FBFBFA] py-16 sm:py-24 border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 text-left">
          <div className="mb-8 md:mb-12">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[#1A382B]/50 block mb-1">
              Curated Recommendations
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1A382B] font-bold">You Might Also Love</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
