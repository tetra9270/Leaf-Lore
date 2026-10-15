import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
  articleSchema?: Record<string, any>;
  faqSchema?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = '/leafandlore/leaf_and_lore_dp.png',
  ogType = 'article',
  articleSchema,
  faqSchema
}) => {
  useEffect(() => {
    // 1. Set document title
    const previousTitle = document.title;
    document.title = title;

    // Helper function to set or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Helper function to set JSON-LD scripts
    const setJsonLdScript = (id: string, schemaObject: Record<string, any>) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaObject);
    };

    // 2. Set Meta Description
    setMetaTag('name', 'description', description);

    // 3. Set Canonical Link
    setLinkTag('canonical', canonicalUrl);

    // 4. Set Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }

    // 5. Inject JSON-LD Article Schema
    if (articleSchema) {
      setJsonLdScript('json-ld-article', articleSchema);
    }

    // 6. Inject JSON-LD FAQPage Schema
    if (faqSchema) {
      setJsonLdScript('json-ld-faqpage', faqSchema);
    }

    // Cleanup on unmount
    return () => {
      document.title = previousTitle;
      
      const articleScript = document.getElementById('json-ld-article');
      if (articleScript) articleScript.remove();

      const faqScript = document.getElementById('json-ld-faqpage');
      if (faqScript) faqScript.remove();
    };
  }, [title, description, canonicalUrl, ogImage, ogType, articleSchema, faqSchema]);

  return null;
};
