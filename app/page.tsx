// import SectionService from './components/SectionService';
import Banner from './components/Banner';
import SectionProject from './components/SectionProject';
import SectionSkill from './components/SectionSkill';

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
