import {
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useLocale, useTranslations } from 'next-intl';

/** 内联 GitHub 图标，避免引入整包 lucide-react */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

import { formatYearMonth } from '@/lib/utils/format-date';

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
    slogan: 'Focus on building\nexcellent products',
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
    <div className="bg-cover-black w-full aspect-4/3 pr-2 xs:pr-6 relative overflow-hidden flex flex-row-reverse items-center">
      <picture>
        <source
          type="image/avif"
          srcSet="/imgs/portrait.avif"
          sizes="(max-width: 576px) 50vw, 288px"
        />
        <source
          type="image/webp"
          srcSet="/imgs/portrait.webp"
          sizes="(max-width: 576px) 50vw, 288px"
        />
        {/* Keep native sources for explicit format fallback under unoptimized mode. */}
        <img
          src="/imgs/portrait.webp"
          alt="Portrait"
          width={288}
          height={432}
          className="w-1/2 absolute top-0 left-0 bottom-0"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="flex flex-col gap-3 xs:gap-6 relative z-10">
        {/* Header */}
        <div className="space-y-2 xs:space-y-3">
          <div
            className={`text-[#AFBAC6] ${locale === 'zh' ? 'title-mini xs:title-middle tracking-widest' : 'text-middle tracking-wide'} font-medium`}
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
        <ul className="opacity-80 flex flex-col gap-1.5 xs:gap-4">
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
