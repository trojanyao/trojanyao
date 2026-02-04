import { Suspense } from 'react';

import SkillItem from '@/app/skill/components/SkillItem';
import SkillItemSkeleton from '@/app/skill/components/SkillItemSkeleton';
import { skillCategories } from '@/lib/constants/skill.constants';
import { getSkills } from '@/lib/notion';
import { groupBy } from '@/lib/utils/group-by';

export default function TechStacks() {
  return (
    <Suspense fallback={<TechStacksSkeleton />}>
      <TechStacksContent />
    </Suspense>
  );
}

/* Component: TechStacksContent */
async function TechStacksContent() {
  const skills: Skill[] = await getSkills();

  const groupedSkills = groupBy<Skill>(skills, 'category', (a, b) => {
    // 按照 skillCategories 顺序（前端 - 服务端 - App - 其他）
    const getIndex = (item: typeof a) => skillCategories.indexOf(item?.groupName as SkillCategory);
    const indexA = getIndex(a);
    const indexB = getIndex(b);

    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  });

  return groupedSkills?.map((groupItem, index) => (
    <div key={index} className="flex flex-col gap-4">
      <div className="pl-1 text-primary text-middle font-medium">{groupItem?.groupName}</div>
      <SkillGrid skills={groupItem?.items} />
    </div>
  ));
}

function SkillGrid({ skills }: { skills: Skill[] }) {
  const skillSorts = ['熟练', '使用过', '学习中'];

  skills.sort((a, b) => {
    const indexA = skillSorts.indexOf(a?.status);
    const indexB = skillSorts.indexOf(b?.status);
    return indexA - indexB;
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {skills.map((item) => (
        <SkillItem key={item?.id} data={item} className="bg-white" />
      ))}
    </div>
  );
}

function TechStacksSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {skillCategories.map((name) => (
        <div key={name} className="flex flex-col gap-4">
          <div className="pl-1 h-4 w-16 bg-gray-100 rounded-sm animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkillItemSkeleton key={i} className="bg-white" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
