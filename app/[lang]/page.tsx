// import SectionService from './components/SectionService';
import { getDictionary, Locale } from '@/app/i18n/dictionaries';

import Banner from './components/section/Banner';
import SectionProject from './components/section/SectionProject';
import SectionSkill from './components/section/SectionSkill';

export const dynamic = 'force-dynamic'; // use SSR to avoid Notion's image expiry

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="home flex flex-col items-center">
      {/* Banner */}
      <Banner />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto p-6 md:p-8 xl:px-0 box-border flex flex-col gap-6">
        {/* <SectionService /> */}
        <SectionProject dict={dict} />
        <SectionSkill />
      </div>
    </div>
  );
}
