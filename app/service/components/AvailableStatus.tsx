import { CalendarDaysIcon } from '@heroicons/react/20/solid';

export default function AvailableStatus() {
  const availableNow = false;

  return (
    <div className="flex items-center gap-3">
      <span className="relative h-[10px] w-[10px] flex">
        <span
          className={`h-full w-full ${
            availableNow ? 'bg-green' : 'bg-primary'
          } rounded-full inline-flex`}
        ></span>
        <span
          className={`h-full w-full ${
            availableNow ? 'bg-green/75' : 'bg-primary/75'
          } rounded-full inline-flex absolute animate-ping`}
        ></span>
      </span>

      <div className="flex items-center text-secondary text-sm">
        {availableNow ? (
          <>
            可<span className="mx-1 text-green font-medium">立即</span>开始服务
          </>
        ) : (
          <>
            服务中 · 预计可于{' '}
            <span className="mx-1 text-primary font-medium">2024.06.01</span>{' '}
            开始服务 · 11 天后
            <CalendarDaysIcon className="size-5 ml-2" />
          </>
        )}
      </div>
    </div>
  );
}
