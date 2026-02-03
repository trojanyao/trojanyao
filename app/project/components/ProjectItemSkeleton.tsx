export default function ProjectCardSkeleton() {
  return (
    <div className="flex-1 aspect-[4/3] bg-middle-gray border-[1px] border-third rounded-[20px] overflow-hidden relative animate-pulse">
      <div className="w-full bg-white/75 p-3 backdrop-blur-xl flex justify-between items-center gap-3 absolute bottom-0">
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Logo */}
          <div className="w-10 h-10 bg-middle-gray rounded-full flex-shrink-0"></div>

          {/* Title + Text */}
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <div className="w-32 h-4 bg-middle-gray rounded"></div>
            <div className="w-48 h-3 bg-middle-gray rounded"></div>
          </div>
        </div>

        {/* Time + Type */}
        <div className="flex flex-col items-end gap-2">
          <div className="w-20 h-3 bg-middle-gray rounded"></div>
          <div className="flex items-center gap-1">
            <div className="w-8 h-3 bg-middle-gray rounded-full"></div>
            <div className="w-10 h-3 bg-middle-gray rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
