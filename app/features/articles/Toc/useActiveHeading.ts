import { useEffect, useState } from 'react';

type Options = {
  topOffset: number;
};

/**
 * スクロール位置に応じてアクティブな見出しIDを返すフック
 * Intersection Observer を使用して画面上部の領域にある見出しを検知
 */
export const useActiveHeading = ({ topOffset }: Options) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const headings = document.querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id]');

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: `${topOffset}px 0px -80% 0px`,
      },
    );

    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [topOffset]);

  return activeId;
};
