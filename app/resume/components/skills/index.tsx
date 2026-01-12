import { CodeBracketIcon } from '@heroicons/react/24/solid';

import SectionHeader from '@/app/components/common/SectionHeader';

import Experiences from './1-experiences';
import TechStacks from './2-skills';
import Detailed from './3-detailed';
import Collaboration from './4-collaboration';

const data = [
  {
    zh: {
      title: '经验丰富',
      renderDesc: (
        <>
          七年前端和产品研发经验
          <br />
          有丰富的 <span className="font-medium">B 端、C 端</span> 和 独立开发 经验
          <br />
          GitHub 周平均贡献量 30+
        </>
      ),
    },
    component: <Experiences />,
  },
  {
    zh: {
      title: '技能熟练',
      renderDesc: (
        <>
          可以熟练使用前端及全栈相关技术栈和框架
          <br />
          进行 <span className="font-medium">Web、SaaS、App</span> 及小程序开发
        </>
      ),
    },
    component: <TechStacks />,
  },
  {
    zh: {
      title: '精致细腻',
      renderDesc: (
        <>
          做事认真细致，<span className="font-medium">有设计审美</span>，产品嗅觉灵敏
          <br />
          沉迷于打造 <span className="font-medium">UI 和 UX 友好</span> 的产品
        </>
      ),
    },
    component: <Detailed />,
  },
  {
    zh: {
      title: '深度协作',
      renderDesc: (
        <>
          远程三年，合作国内外 <span className="font-medium">创业及成熟团队 20+</span>
          <br />
          熟悉线上远程协作模式
          <br />
          熟练掌握英语，了解日语
        </>
      ),
    },
    component: <Collaboration />,
  },
];

export default function Skills() {
  return (
    <div className="p-6">
      <SectionHeader title="职业技能" icon={<CodeBracketIcon />} />

      <div className="flex flex-col gap-12">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="text-primary title-small">{item.zh.title}</div>
              <div className="text-light text-center text-small whitespace-pre-wrap leading-relaxed tracking-wide">
                {item.zh.renderDesc}
              </div>
            </div>

            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
}
