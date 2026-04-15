import Image from 'next/image';
import Link from 'next/link';

import { SparklesIcon } from '@heroicons/react/24/outline';
import { useLocale, useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Image01 from '@/public/imgs/resume/highlights/01.webp';
import Image02 from '@/public/imgs/resume/highlights/02.webp';
import Image03 from '@/public/imgs/resume/highlights/03.webp';
import Image04 from '@/public/imgs/resume/highlights/04.webp';

const data = [
  {
    zh: {
      title: '产品第一，体验优先',
      renderDesc: (
        <>
          以产品为导向
          <br />
          用户体验优先
          <br />
          注重 Core Web Vitals 等性能指标
        </>
      ),
    },
    en: {
      title: 'Product-First\nUX-Oriented',
      renderDesc: (
        <>
          Product-Driven approach
          <br />
          Prioritizing user experience
          <br />
          Focus on Core Web Vitals
          <br />
          and performance scores
        </>
      ),
    },
    img: Image01,
  },
  {
    zh: {
      title: '善于学习，上手迅速',
      renderDesc: (
        <>
          在{' '}
          <Link
            href="project/72d11628-6dfa-47f8-8b83-06b2dd5ab21f"
            className="text-[#FF3C58] font-medium"
          >
            TAOREN
          </Link>{' '}
          项目中，一周内学习上手了 GSAP 动画库，并结合几何知识实现了复杂的 Banner 动效，最终成功交付
        </>
      ),
    },
    en: {
      title: 'Quick Learner\nFast Adopter',
      renderDesc: (
        <>
          In the{' '}
          <Link
            href="project/72d11628-6dfa-47f8-8b83-06b2dd5ab21f"
            className="text-[#FF3C58] font-medium"
          >
            TAOREN
          </Link>{' '}
          Project, mastered GSAP wit hin a week, utilizing geometric concepts to achieve complex
          banner animations and successfully delivered
        </>
      ),
    },
    img: Image02,
  },
  {
    zh: {
      title: '踏实负责，认真细致',
      renderDesc: (
        <>
          项目文档井井有条
          <br />
          代码管理完整规范
          <br />
          资料归档全盘交付
        </>
      ),
    },
    en: {
      title: 'Diligent and\nDetail-Oriented',
      renderDesc: (
        <>
          Organized project docs
          <br />
          Standardized code management
          <br />
          Complete delivery of all materials
        </>
      ),
    },
    img: Image03,
  },
  {
    zh: {
      title: '考虑周到，精益求精',
      renderDesc: (
        <>
          注重尺寸、对齐、字号
          <br />
          错别字、标点符号等细节
        </>
      ),
    },
    en: {
      title: 'Thoughtful Perfectionist and',
      renderDesc: (
        <>
          Attention to dimensions, alignment, and typography
          <br />
          Meticulous with typos, punctuation, and other details
        </>
      ),
    },
    img: Image04,
  },
];

export default function Highlights() {
  const locale = useLocale();
  const t = useTranslations('resume.title');

  const lang = locale === 'zh' ? 'zh' : 'en';

  return (
    <div>
      <SectionHeader title={t('highlights')} icon={<SparklesIcon />} />

      <div className="flex flex-col gap-12">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-0 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
          >
            {/* Text */}
            <div className="flex-1 px-3">
              <div className="sm:hidden text-primary title-mini leading-normal whitespace-pre-wrap">
                {item[lang].title?.split('，').join('\n')}
              </div>

              <div className="hidden sm:block text-primary text-middle font-medium sm:title-small leading-normal! whitespace-pre-wrap">
                {item[lang].title}
              </div>

              <div className="mt-3 text-light text-mini sm:text-small leading-normal!">
                {item[lang].renderDesc}
              </div>
            </div>

            {/* Image */}
            <div className={`w-3/5 overflow-hidden ${index === 0 ? 'rounded-2xl' : ''}`}>
              <Image
                src={item.img}
                alt={item[lang].title}
                // Cards are around 60% of the container width, not full viewport.
                sizes="(max-width: 576px) 60vw, 346px"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
