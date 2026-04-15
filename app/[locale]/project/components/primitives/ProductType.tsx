import getProjectPlatformColorClass from './getProjectPlatformColorClass';

export default function ProductType({
  platform,
  label,
}: {
  platform: ProjectPlatformVisible;
  label: string;
}) {
  return (
    <div
      className={`px-2 py-1 ${getProjectPlatformColorClass(platform)} rounded-full text-center text-[0.625rem] whitespace-nowrap`}
    >
      {label}
    </div>
  );
}
