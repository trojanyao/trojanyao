import Image from 'next/image';
import Link from 'next/link';

import { SparklesIcon } from '@heroicons/react/24/outline';

import SectionHeader from '@/app/components/common/SectionHeader';
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
    img: Image04,
  },
];

export default function Highlights() {
  return (
    <div>
      <SectionHeader title="个人亮点" icon={<SparklesIcon />} />

      <div className="flex flex-col gap-12">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-0 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
          >
            {/* Text */}
            <div className="flex-1 px-3">
              <div className="text-primary title-small">{item.zh.title}</div>
              <div className="mt-3 text-light text-small leading-normal">{item.zh.renderDesc}</div>
            </div>

            {/* Image */}
            <div className={`w-72 min-w-72 overflow-hidden ${index === 0 ? 'rounded-2xl' : ''}`}>
              <Image src={item.img} alt={item.zh.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
