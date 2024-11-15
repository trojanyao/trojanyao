'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Kaushan_Script } from 'next/font/google';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import Memoji from '@/public/memoji.png';

const kaushan_script = Kaushan_Script({ weight: '400', subsets: ['latin'] });

gsap.registerPlugin(useGSAP);

export default function Banner() {
  const textGroups = [
    {
      title: { left: '全职远程', right: 'Freelancer' },
      description: '用专业和认真\n打造精致细腻的优秀产品',
    },
    {
      title: { left: '有设计审美的', right: '前端工程师' },
      description: '热衷于构建\nUI 和 UX 友好的前端项目',
    },
    {
      title: { left: '务实的', right: '极简主义者' },
      description: '极简不是简陋，是删繁就简',
    },
    {
      title: { left: '全职远程', right: 'Freelancer' },
      description: '用专业和认真\n打造精致细腻的优秀产品',
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
      const left = element.querySelector('.left');
      const right = element.querySelector('.right');
      const desc = descList[index];

      if (index > 0) {
        tl.from(left, { y: OFFSET }, '<')
          .from(desc, { opacity: 0 }, '<')
          .from(right, { y: OFFSET }, '<0.1');
      }

      if (index < textGroups.length - 1) {
        tl.to(left, { y: -OFFSET, delay: DELAY })
          .to(desc, { opacity: 0 }, '<')
          .to(right, { y: -OFFSET }, '<0.1');
      }
    });
  });

  return (
    <div className="banner-wrap w-screen h-[80vh] min-h-[600px] -mt-20 box-content border-b border-secondary flex flex-col items-center">
      <div className="w-[1200px] h-full min-h-[600px] relative flex flex-col justify-center items-center">
        {/* Header */}
        <div className="pb-[200px] flex flex-col items-center gap-8">
          <div className="trojan text-secondary text-xl leading-none">TROJAN</div>
          <div className="flex flex-col items-center gap-4">
            {/* Title */}
            <ul
              id="titleEffects"
              className="w-96 h-8 overflow-hidden list-none relative flex flex-col items-center"
            >
              {textGroups.map((text, index) => (
                <li
                  key={index}
                  className={`${
                    animStart && 'absolute'
                  } top-0 flex justify-center items-center gap-2 text-black title-middle select-none`}
                >
                  <span className={`left ${index === 1 && 'text-primary'} text-2xl font-semibold`}>
                    {text?.title?.left}
                  </span>
                  <span
                    className={`right ${(index === 0 || index === 3) && 'text-green'} ${
                      index === 2 && 'text-orange'
                    } text-[1.625rem] title-middle ${
                      (index === 0 || index === 3) && kaushan_script.className
                    }`}
                  >
                    {text?.title?.right}
                  </span>
                </li>
              ))}
            </ul>

            {/* Description */}
            <ul className="w-96 h-12 overflow-hidden list-none relative flex flex-col items-center">
              {textGroups.map((text, index) => (
                <li
                  key={index}
                  className={`desc-item ${
                    animStart && 'absolute'
                  } top-0 text-center text-light leading-6 whitespace-pre-wrap`}
                >
                  {text?.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Memoji */}
        <Image
          src={Memoji}
          width={240}
          alt="Memoji"
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
