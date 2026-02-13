import { Metadata } from 'next';

import ActionBar from './components/action-bar';
import Cover from './components/cover';
import Highlights from './components/highlights';
import CooperationModes from './components/modes';
import Payments from './components/payments';
import Projects from './components/projects';
import Skills from './components/skills';

export const dynamic = 'force-dynamic'; // use SSR to avoid Notion's image expiry

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'zh' ? '姚陶钧的个人简历' : "TROJAN's resume",
    description:
      locale === 'zh'
        ? '有设计审美的前端工程师，七年前端经验，三年远程 Freelancer 经验'
        : 'Design-savvy front-end engineer, 7 years of front-end experience, and 3 years of remote freelancer experience',
  };
}

export default function Resume() {
  return (
    <div className="flex flex-col items-center">
      {/* Action Bar Height: 76px, sm:88px */}
      <div className="w-full max-w-[576px] flex-1 bg-light-blue pb-[76px] -mb-[76px] sm:pb-[88px] sm:-mb-[88px] relative">
        <Cover />

        <div className="p-6 flex flex-col gap-12">
          <Skills />
          <Projects />
          <Highlights />
          <CooperationModes />
          <Payments />
        </div>
      </div>

      <div className="w-full max-w-[576px] p-2 py-3 pr-14 sm:p-4 mx-auto sticky bottom-0">
        <ActionBar />
      </div>
    </div>
  );
}
