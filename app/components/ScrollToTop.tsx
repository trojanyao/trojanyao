'use client';

import type { ComponentProps } from 'react';
import { BarsArrowUpIcon } from '@heroicons/react/24/solid';

export default function ScrollToTop(props: ComponentProps<'button'>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 50 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    isVisible && window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      {...props}
      title="回到顶部"
      className={`px-2 py-4 bg-secondary-middle-blue rounded-full ${
        isVisible ? 'translate-y-0' : 'translate-y-[calc(100%+12px)]'
      } transition-transform duration-700 ${props?.className}`}
      onClick={scrollToTop}
    >
      <BarsArrowUpIcon className="size-6 text-blue" />
    </button>
  );
}
