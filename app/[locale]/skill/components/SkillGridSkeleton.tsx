export default function SkillGridSkeleton({ length = 12 }: { length?: number }) {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length }).map((_, idx) => (
        <SkillItemSkeleton key={idx} />
      ))}
    </div>
  );
}

export function SkillItemSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-light-gray p-4 rounded-2xl animate-pulse flex items-center gap-3 ${className}`.trim()}
    >
      {/* Logo */}
      <div className="size-10 bg-gray-100 rounded-lg"></div>

      {/* Name + Status */}
      <div className="flex-1 h-full py-[2px] flex flex-col justify-between overflow-hidden">
        <div className="w-4/5 h-4 bg-gray-100 rounded-md"></div>

        <div className="w-12 h-3 bg-gray-100 rounded-full"></div>
      </div>
    </div>
  );
}
