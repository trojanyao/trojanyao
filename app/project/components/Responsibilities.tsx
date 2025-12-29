import { CheckBadgeIcon, CheckIcon } from '@heroicons/react/24/outline';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function Responsibilities({
  color,
  responsibilities,
  achievements,
}: {
  color: string;
  responsibilities?: string[];
  achievements?: string[];
}) {
  const isAchievements = achievements && Array.isArray(achievements) && achievements.length > 0;

  /**
   * Join project?.responsibilities array into a single string,
   * then use a regular expression to split it into an array based on ordered list markers like "1. ", "2. ", etc.
   */
  let orderedResponsibilities: string[] | undefined = undefined;
  const joined = isAchievements ? achievements?.join('') : responsibilities?.join('');
  // Only split the beginning or end numbered markers like "1. ", "2. ", etc.,
  // not the ones in the middle like "V1.0", "V2.0", etc.
  orderedResponsibilities = joined
    ?.split(/^(?:\d+\.\s*)|(?:\d+\.\s*)$/gm)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return orderedResponsibilities ? (
    <div className="flex-1 flex items-center gap-6">
      {/* title */}
      <div className="flex flex-col items-center gap-4" style={{ color: `#${color}` }}>
        {isAchievements ? (
          <CheckBadgeIcon className="size-6" />
        ) : (
          <RocketLaunchIcon className="size-6" />
        )}
        <div className="whitespace-nowrap">{isAchievements ? '工作成果' : '工作内容'}</div>
      </div>

      {/* details */}
      <div className="flex flex-col gap-2">
        {orderedResponsibilities.map((item, index) => (
          <div key={index} className="flex gap-2">
            <CheckIcon className="size-4 min-w-4 min-h-4 mt-[0.375rem]" />
            <div className="text-secondary leading-7 ">{item}</div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
