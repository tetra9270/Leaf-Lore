import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeEmbedUrl(
  url: string,
  options: { autoplay?: boolean; mute?: boolean } = {}
): string {
  const { autoplay = false } = options;

  try {
    const parsedUrl = new URL(url);

    // Handle Instagram reels and posts
    if (/instagram\.com/i.test(parsedUrl.hostname)) {
      const match = parsedUrl.pathname.match(/\/(reel|p)\/([^/]+)/i);
      if (match && match[2]) {
        return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
      }
      return url;
    }

    const isYouTubeEmbed = /youtube\.com|youtu\.be|player\./i.test(parsedUrl.hostname);

    if (!isYouTubeEmbed) {
      return url;
    }

    if (parsedUrl.pathname.includes('/shorts/')) {
      const parts = parsedUrl.pathname.split('/shorts/');
      if (parts[1]) {
        const videoId = parts[1].split('/')[0];
        parsedUrl.hostname = 'www.youtube.com';
        parsedUrl.pathname = `/embed/${videoId}`;
      }
    }

    parsedUrl.searchParams.set('playsinline', '1');
    parsedUrl.searchParams.set('rel', '0');
    parsedUrl.searchParams.set('modestbranding', '1');
    parsedUrl.searchParams.set('controls', '1');

    if (autoplay) {
      parsedUrl.searchParams.set('autoplay', '1');
    } else {
      parsedUrl.searchParams.delete('autoplay');
    }

    return parsedUrl.toString();
  } catch {
    return url;
  }
}
