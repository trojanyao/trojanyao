'use client';

import Image from 'next/image';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

import Button from '@/app/components/Button';

/* === Component: Preview Carousel === */
export default function PreviewCarousel({ data }: { data: string[] }) {
  const carousel = [data[data?.length - 1], ...data, data?.[0]];

  const enableAnimation = useRef(true);

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  function handleNext() {
    if (currentIndex < carousel?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(carousel?.length - 1);
    }
  }

  return (
    <div className="w-[1200px] relative">
      {/* Carousel Container */}
      <div className="w-full overflow-hidden">
        <div
          style={{ translate: `-${1232 * currentIndex}px` }}
          className={`w-fit flex gap-8 ${
            enableAnimation.current ? 'transition-all' : 'transition-none'
          } duration-1000 ease-in-out`}
          onTransitionEnd={() => {
            if (currentIndex === carousel.length - 1) {
              enableAnimation.current = false;
              setCurrentIndex(1);
              setTimeout(() => {
                enableAnimation.current = true;
              }, 10);
            } else if (currentIndex === 0) {
              enableAnimation.current = false;
              setCurrentIndex(carousel?.length - 2);
              setTimeout(() => {
                enableAnimation.current = true;
              }, 10);
            } else {
              enableAnimation.current = true;
            }
          }}
        >
          {carousel.map((item, index) => (
            <Image
              key={index}
              src={item}
              alt="Preview"
              className="w-[1200px] min-w-[1200px] h-[800px] rounded-3xl"
            />
          ))}
        </div>
      </div>

      {/* Left */}
      <Button
        variant="default"
        shape="circle"
        className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+16px)]"
        onClick={handlePrev}
      >
        <ChevronLeftIcon className="size-5" />
      </Button>

      {/* Left */}
      <Button
        variant="default"
        shape="circle"
        className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+16px)]"
        onClick={handleNext}
      >
        <ChevronRightIcon className="size-5" />
      </Button>
    </div>
  );
}
