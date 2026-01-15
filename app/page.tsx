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
      <div className="lg:w-[1200px] pt-12 mx-auto flex flex-col gap-8">
        {/* <SectionService /> */}
        <SectionProject />
        <SectionSkill />
      </div>
    </div>
  );
}
