import Image from 'next/image';

import {
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { GithubIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { formatYearMonth } from '@/lib/utils/format-date';
import Portrait from '@/public/imgs/portrait.webp';

import CopyableText from '../../components/ui/copyable-text';

const info = {
  email: 'ytj1996@gmail.com',
  github: 'trojanyao',
  birthday: '1995.02',
  startDate: '2018.06',
  zh: {
    name: '姚陶钧',
    slogan: '专注打造优秀产品',
    title: '前端 · 全栈开发',
    education: '2014.09-2018.06 天津科技大学',
    degree: '网络工程 本科 学士学位',
  },
  en: {
    name: 'TROJAN YAO',
    slogan: 'Focus on creating\nexcellent products',
    title: 'Front-end · Full-stack Developer',
    education: 'Sep 2014 - Jun 2018, TUST',
    degree: 'B.Eng. in Network Engineering',
  },
};

const listItemClass = 'flex items-center gap-2 text-[#AFBAC6] text-mini xs:text-small';

export default function Cover() {
  const locale = useLocale();
  const t = useTranslations('resume');

  const lang = locale === 'zh' ? 'zh' : 'en';

  /* Get the age according to info.birthday */
  function getAge(birthdayStr: string) {
    // 期望格式： '1995.02'
    const [yearStr, monthStr] = birthdayStr.split('.');
    const year = parseInt(yearStr, 10);
    const month = monthStr ? parseInt(monthStr, 10) : 1;
    const today = new Date();
    let age = today.getFullYear() - year;
    if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < 1)) {
      age--;
    }
    return age;
  }

  /* Get the experience year according to the start date like "2018.06" */
  function getYearsExperience(startDateStr: string) {
    const [yearStr, monthStr] = startDateStr.split('.');
    const year = parseInt(yearStr, 10);
    const month = monthStr ? parseInt(monthStr, 10) : 1;
    const today = new Date();
    let years = today.getFullYear() - year;
    if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < 1)) {
      years--;
    }
    return years;
  }

  return (
    <div className="bg-cover-black w-full aspect-4/3 pr-4 xs:pr-6 relative overflow-hidden flex flex-row-reverse items-center">
      <Image
        src={Portrait}
        alt="Portrait"
        width={288}
        height={432}
        className="w-1/2 absolute top-0 left-0 bottom-0"
        loading="eager"
        fetchPriority="high"
      />

      <div className="flex flex-col gap-4 xs:gap-6 relative z-10">
        {/* Header */}
        <div className="space-y-2 xs:space-y-3">
          <div
            className={`text-[#AFBAC6] ${locale === 'zh' ? 'title-mini xs:title-middle' : 'text-middle'} font-medium tracking-widest`}
          >
            {info[lang].name}
          </div>

          <h1
            className={`text-primary title-small xs:title-large font-bold
              ${locale === 'zh' ? 'tracking-widest' : 'tracking-wide leading-[1.2]!'} whitespace-pre-wrap`}
          >
            {info[lang].slogan}
          </h1>

          <div className="w-fit p-[6px] xs:p-3 border border-primary/50 rounded-lg xs:rounded-xl text-primary text-mini xs:text-small">
            {info[lang].title}
          </div>
        </div>

        {/* Description */}
        <ul className="opacity-80 flex flex-col gap-2 xs:gap-4">
          <li className={listItemClass}>
            <CalendarDaysIcon className="size-4" />
            <span>
              {formatYearMonth(new Date(info.birthday), locale)}（
              {t('years-old', { ages: getAge(info.birthday) })}）
            </span>
          </li>

          <li className={listItemClass}>
            <BriefcaseIcon className="size-4" />
            <span>
              {t('joined-on', { date: formatYearMonth(new Date(info.startDate), locale) })}（
              {t('years-experience', { years: getYearsExperience(info.startDate) })}）
            </span>
          </li>

          <li className={listItemClass}>
            <BuildingLibraryIcon className="size-4" />
            <span>{info[lang].education}</span>
          </li>

          <li className={listItemClass}>
            <AcademicCapIcon className="size-4" />
            <span>{info[lang].degree}</span>
          </li>

          <li className={listItemClass}>
            <EnvelopeIcon className="size-4" />
            <CopyableText text={info.email} />
          </li>

          <li className={listItemClass}>
            <GithubIcon className="size-4" />
            <a
              href={`https://github.com/${info.github}`}
              target="_blank"
              className="relative z-10 hover:underline cursor-pointer"
            >
              {info.github}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
