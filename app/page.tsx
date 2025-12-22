// import SectionService from './components/SectionService';
import Banner from './components/common/Banner';
import SectionProject from './components/section/SectionProject';
import SectionSkill from './components/section/SectionSkill';

export const revalidate = 600; // use ISR, revalidate every 10 minutes to avoid Notion's 1hr expiry

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Banner */}
      <Banner />

      {/* Content */}
      <div className="w-[1200px] pt-12 mx-auto flex flex-col gap-8">
        {/* <SectionService /> */}
        <SectionProject />
        <SectionSkill />
      </div>
    </div>
  );
}
