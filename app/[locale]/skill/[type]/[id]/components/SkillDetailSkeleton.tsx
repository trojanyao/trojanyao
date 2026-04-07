import ProjectCardSkeleton from '@/app/[locale]/project/components/ProjectItemSkeleton';

export function SkillDetailBodySkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <BasicInfoSkeleton />
      <RelatedProjectsSkeleton />
    </div>
  );
}

export function SkillBreadcrumbSkeleton() {
  // Match `Breadcrumb` container spacing to prevent layout shift.
  return (
    <div className="pt-4 pb-8 flex items-center gap-2 animate-pulse">
      {/* Home icon */}
      <div className="size-4 bg-middle-gray rounded-sm" />

      {/* `/ dev / skill / name` */}
      <div className="h-4 w-2 bg-middle-gray rounded-sm" />
      <div className="h-4 w-14 bg-middle-gray rounded-sm" />
      <div className="h-4 w-2 bg-middle-gray rounded-sm" />
      <div className="h-4 w-20 bg-middle-gray rounded-sm" />
      <div className="h-4 w-2 bg-middle-gray rounded-sm" />
      <div className="h-4 w-28 bg-middle-gray rounded-sm" />
    </div>
  );
}

function BasicInfoSkeleton() {
  return (
    <div className="flex justify-between items-center animate-pulse">
      <div className="w-full lg:w-2/3 flex gap-6">
        {/* Match `<Image className="size-24" />` layout (no extra rounding). */}
        <div className="bg-middle-gray size-24 aspect-square rounded-full" />

        <div className="py-1 flex flex-col justify-center gap-2 w-full">
          <div className="flex items-center gap-3">
            <div className="bg-middle-gray h-6 w-32 rounded-md" />
            {/* External link icon placeholder */}
            <div className="bg-middle-gray size-6 rounded-md" />
          </div>

          <div className="bg-middle-gray h-4 w-full rounded-md" />

          <div className="bg-middle-gray h-4 w-24 rounded-md mt-4" />
        </div>
      </div>
    </div>
  );
}

function RelatedProjectsSkeleton() {
  const cards = Array.from({ length: 6 });

  return (
    <div className="animate-pulse">
      {/* Match `SectionHeader` wrapper: px + mb + flex layout */}
      <div className="w-full px-[2px] mb-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2">
            <div className="size-5 sm:size-6 bg-middle-gray rounded-md" />
            <div className="h-5 sm:h-6 w-40 bg-middle-gray rounded-md" />
            <div className="h-5 w-10 bg-middle-gray rounded-full" />
          </div>
        </div>

        {/* Match GroupBy control height roughly */}
        <div className="h-9 w-40 bg-middle-gray rounded-md" />
      </div>

      {/* Match `ProjectGroup` body: gap-6 + `Line type="secondary"` */}
      <div className="flex flex-col gap-6">
        <div className="w-full h-px bg-[#D7DDE4] opacity-50" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

