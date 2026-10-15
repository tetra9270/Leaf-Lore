import React, { useState } from 'react';
import { ImageSpec } from '../data/blogPosts';

interface ImagePlaceholderProps {
  spec: ImageSpec;
  className?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ spec, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  // If no previewUrl or if image fails to load, return null to avoid broken image icons/bars
  if (!spec.previewUrl || hasError) {
    return null;
  }

  return (
    <figure className={`my-8 rounded-2xl overflow-hidden border border-[#1A382B]/10 shadow-sm ${className}`}>
      <img
        src={spec.previewUrl}
        alt={spec.altText}
        onError={() => setHasError(true)}
        className="w-full h-auto block rounded-2xl"
      />
    </figure>
  );
};
