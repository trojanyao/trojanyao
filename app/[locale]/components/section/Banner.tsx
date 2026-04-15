'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useGSAP } from '@gsap/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { gsap } from 'gsap';
import { useLocale, useTranslations } from 'next-intl';

import AvailableStatus from '@/app/[locale]/service/components/AvailableStatus';

gsap.registerPlugin(useGSAP);

export default function Banner() {
  const locale = useLocale();
  const t = useTranslations('banner');
  const bannerBackgroundImage = `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='60' height='60' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' transform='translate(10,0)' stroke-width='1' stroke='none' fill='hsla(212, 71%, 96%, 0.6)'/></pattern></defs><rect width='100%' height='100%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`;

  const textGroups = [
    {
      title: { left: 'AI-Driven', right: t('full-stack-engineer') },
      description: t('desc.masterpiece'),
    },
    {
      title: { left: t('design-savvy'), right: t('fe-engineer') },
      description: t('desc.ui-ux'),
    },
    {
      title: { left: t('pragmatic'), right: t('minimalist') },
      description: t('desc.minimalism'),
    },
    {
      title: { left: 'AI-Driven', right: t('full-stack-engineer') },
      description: t('desc.masterpiece'),
    },
  ];
  const OFFSET = 32;
  const DURATION = 1;
  const DELAY = 2; // Time for each content pause

  const [animStart, setAnimStart] = useState<boolean>(false);

  useGSAP(() => {
    setAnimStart(true);

    const titleList: HTMLLIElement[] = gsap.utils.toArray('#titleEffects li');
    const descList: HTMLDivElement[] = gsap.utils.toArray('.desc-item');

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      defaults: {
        ease: 'power3.inOut',
        duration: DURATION,
      },
    });

    titleList.forEach((element: HTMLLIElement, index: number) => {
      const left = element.querySelector('.banner-left');
      const right = element.querySelector('.banner-right');
      const desc = descList[index];

      if (index > 0) {
        tl.from(left, { y: OFFSET, opacity: 0 }, '<')
          .from(desc, { opacity: 0 }, '<')
          .from(right, { y: OFFSET, opacity: 0 }, '<0.1');
      }

      if (index < textGroups.length - 1) {
        tl.to(left, { y: -OFFSET, opacity: 0, delay: DELAY })
          .to(desc, { opacity: 0 }, '<')
          .to(right, { y: -OFFSET, opacity: 0 }, '<0.1');
      }
    });
  });

  return (
    <div
      className="w-screen h-[80vh] min-h-[700px] -mt-20 box-content border-b border-secondary flex flex-col items-center"
      style={{
        backgroundColor: 'var(--secondary-light-blue)',
        backgroundImage: bannerBackgroundImage,
      }}
    >
      <div className="w-full max-w-[1200px] h-full min-h-[700px] relative flex flex-col justify-center items-center">
        {/* Header */}
        <div className="w-full pb-28 md:pb-36 lg:pb-[200px] flex flex-col items-center">
          {/* Name */}
          <div className="trojan text-secondary text-xl leading-none">TROJAN</div>

          {/* Title */}
          <ul
            id="titleEffects"
            // 1 line: h = 2xl(6) + li.mt-8(8) + li.pb-4(4) = 6 + 8 + 4 = 18
            // 2 lines: h = 2xl(6) * 2 + li.mt-8(8) + li.pb-4(4) + gap-2(2) = 12 + 8 + 4 + 2 = 26
            className={`w-full ${locale === 'en' ? 'h-26 sm:h-18' : 'h-18'} overflow-hidden list-none relative flex flex-col items-center`}
          >
            {textGroups.map((text, index) => (
              <li
                key={index}
                className={`mt-8 pb-4
                  ${animStart && 'absolute'} top-0
                  text-black title-middle select-none
                  ${locale === 'zh' ? 'tracking-widest' : 'tracking-wide'}`}
              >
                {index === 1 ? (
                  // 第 2 个文本用 h1 包裹
                  <h1
                    className={`flex ${locale === 'en' ? 'flex-col sm:flex-row' : 'flex-row'} justify-center items-center gap-2`}
                  >
                    <span className="banner-left text-primary ">{text?.title?.left}</span>
                    <span className="banner-right ">{text?.title?.right}</span>
                  </h1>
                ) : (
                  // 其他文本用 div 包裹
                  <div
                    className={`flex ${locale === 'en' ? 'flex-col sm:flex-row' : 'flex-row'} justify-center items-center gap-2`}
                  >
                    <span
                      className={`banner-left
                        ${(index === 0 || index === 3) && 'text-green italic'}
                      `}
                    >
                      {text?.title?.left}
                    </span>
                    <span
                      className={`banner-right
                        
                        ${index === 2 && 'text-orange'}
                        `}
                    >
                      {text?.title?.right}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Description */}
          <ul className="w-full h-12 overflow-hidden list-none relative flex flex-col items-center">
            {textGroups.map((text, index) => (
              <li
                key={index}
                className={`desc-item
                ${animStart && 'absolute'} top-0
                text-center text-light leading-6 whitespace-pre-wrap
                ${locale === 'zh' ? 'tracking-widest' : 'tracking-wide'}`}
              >
                {text?.description?.replace('\\n', '\n')}
              </li>
            ))}
          </ul>

          {/* Status & CTA */}
          <div className="mt-12 lg:mt-18 flex flex-col items-center gap-4">
            <Link
              href="/resume"
              className="bg-middle-blue w-fit pl-4 pr-3 py-2 rounded-full flex items-center gap-0 text-primary group"
            >
              <div className="text-small font-medium">{t('cta-button')}</div>
              <ChevronDoubleRightIcon className="size-5 group-hover:animate-bounce-right" />
            </Link>

            <AvailableStatus />
          </div>
        </div>

        {/* Memoji */}
        <picture>
          <source
            type="image/avif"
            srcSet={[
              '/memoji/memoji-192.avif 192w',
              '/memoji/memoji-256.avif 256w',
              '/memoji/memoji-320.avif 320w',
              '/memoji/memoji-384.avif 384w',
              '/memoji/memoji-448.avif 448w',
              '/memoji/memoji-512.avif 512w',
              '/memoji/memoji-640.avif 640w',
            ].join(', ')}
            sizes="(min-width: 1280px) 240px, (min-width: 1024px) 224px, (min-width: 768px) 208px, 192px"
          />
          <source
            type="image/webp"
            srcSet={[
              '/memoji/memoji-192.webp 192w',
              '/memoji/memoji-256.webp 256w',
              '/memoji/memoji-320.webp 320w',
              '/memoji/memoji-384.webp 384w',
              '/memoji/memoji-448.webp 448w',
              '/memoji/memoji-512.webp 512w',
              '/memoji/memoji-640.webp 640w',
            ].join(', ')}
            sizes="(min-width: 1280px) 240px, (min-width: 1024px) 224px, (min-width: 768px) 208px, 192px"
          />
          <img
            src="/memoji/memoji-384.webp"
            alt="Memoji"
            width={384}
            height={384}
            className="w-48 md:w-52 lg:w-56 xl:w-60 absolute bottom-0 left-1/2 -translate-x-1/2"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
}
