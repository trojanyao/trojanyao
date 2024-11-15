'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

import Button from '@/app/components/Button';

/* === Component: Preview Carousel === */
export default function PreviewCarousel({
  data,
  width,
  height,
}: {
  data: string[];
  width: number;
  height: number;
}) {
  const isPortrait = height > width;

  /* Split images to groups depending on the width */
  const containerWidth = 1200;
  const containerHeight = 800;
  const realWidth = (width * containerHeight) / height;
  const gap = 4 * 4; // Convert Tailwind gap-[value] to pixel
  const itemsPerGroup = isPortrait ? Math.floor((containerWidth + gap) / (realWidth + gap)) : 1;

  const groupedData = [];
  for (let i = 0; i < data?.length; i += itemsPerGroup) {
    groupedData.push(data?.slice(i, i + itemsPerGroup));
  }

  const carousel = [groupedData[groupedData?.length - 1], ...groupedData, groupedData?.[0]];

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
          {carousel.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`w-[1200px] ${
                isPortrait ? 'h-[800px]' : ''
              } flex justify-between items-center`}
              style={{ gap: `${gap}px` }}
            >
              {group?.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="Preview"
                  width={width}
                  height={height}
                  className={`${
                    isPortrait ? 'w-auto h-full' : 'w-full h-auto'
                  } rounded-3xl border-[1px] border-third`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Previous */}
      {groupedData?.length > 1 && (
        <Button
          variant="default"
          shape="circle"
          className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+16px)]"
          onClick={handlePrev}
        >
          <ChevronLeftIcon className="size-5 text-light-gray" />
        </Button>
      )}

      {/* Next */}
      {groupedData?.length > 1 && (
        <Button
          variant="default"
          shape="circle"
          className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+16px)]"
          onClick={handleNext}
        >
          <ChevronRightIcon className="size-5 text-light-gray" />
        </Button>
      )}
    </div>
  );
}
