import {
  BasicInfoSkeleton,
  RelatedProjectsSkeleton,
  SkillBreadcrumbSkeleton,
} from './components/SkillDetailSkeleton';

export default async function Loading() {
  return (
    <div className="content-wrap">
      <SkillBreadcrumbSkeleton />

      <div className="flex flex-col gap-8">
        <BasicInfoSkeleton />
        <RelatedProjectsSkeleton />
      </div>
    </div>
  );
}
