// import SectionService from './components/SectionService';
import SectionProject from './components/SectionProject';
import SectionSkill from './components/SectionSkill';
import Banner from './components/Banner';

export default function Home() {
  return (
    <>
      {/* Banner */}
      <Banner />

      {/* Content */}
      <div className="w-[1200px] pt-12 mx-auto flex flex-col gap-8">
        {/* <SectionService /> */}
        <SectionProject />
        <SectionSkill />
      </div>
    </>
  );
}
