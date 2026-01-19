// import SectionService from './components/SectionService';
import Banner from './components/section/Banner';
import SectionProject from './components/section/SectionProject';
import SectionSkill from './components/section/SectionSkill';

export const dynamic = 'force-dynamic'; // use SSR to avoid Notion's image expiry

export default function Home() {
  return (
    <div className="home flex flex-col items-center">
      {/* Banner */}
      <Banner />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto p-6 md:p-8 xl:px-0 box-border flex flex-col gap-6">
        {/* <SectionService /> */}
        <SectionProject />
        <SectionSkill />
      </div>
    </div>
  );
}
