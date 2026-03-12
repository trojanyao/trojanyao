import nextDynamic from 'next/dynamic';

// import SectionService from './components/SectionService';
import SectionProject from './components/section/SectionProject';
import SectionSkill from './components/section/SectionSkill';

/** 含 GSAP，单独 chunk 以减小主 bundle、改善 Reduce unused JavaScript */
const Banner = nextDynamic(() => import('./components/section/Banner'), { ssr: true });

export const revalidate = 300; // revalidate at most every 5 minutes
// export const dynamic = 'force-dynamic'; // use SSR to avoid Notion's image expiry

export default function Home() {
  return (
    <div className="home flex flex-col items-center">
      {/* Banner */}
      <Banner />

      {/* Content */}
      <div className="w-full max-w-[1200px] mx-auto p-6 md:p-8 xl:px-0 box-border flex flex-col gap-6">
        {/* <SectionService /> */}
        <SectionProject />
        <SectionSkill />
      </div>
    </div>
  );
}
