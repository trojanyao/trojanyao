import { Metadata } from 'next';

import ActionBar from './components/action-bar';
import Cover from './components/cover';
import Highlights from './components/highlights';
import CooperationModes from './components/modes';
import Payments from './components/payments';
import Projects from './components/projects';
import Skills from './components/skills';

export const dynamic = 'force-dynamic'; // use SSR to avoid Notion's image expiry

export const metadata: Metadata = {
  title: '姚陶钧的个人简历',
  description: '有设计审美的前端工程师，七年前端经验，三年远程 Freelancer 经验',
};

export default function Resume() {
  return (
    <div className="flex flex-col items-center">
      {/* Action Bar Height: 92px, sm:88px */}
      <div className="w-full max-w-[576px] flex-1 bg-light-blue pb-[92px] sm:pb-[88px] -mb-[92px] sm:-mb-[88px] relative">
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
