import {
  SkillBreadcrumbSkeleton,
  SkillDetailBodySkeleton,
} from './components/SkillDetailSkeleton';

export default function Loading() {
  return (
    <div className="content-wrap">
      <SkillBreadcrumbSkeleton />
      <SkillDetailBodySkeleton />
    </div>
  );
}
