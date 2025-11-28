export type SkillStatusType = '学习中' | '熟练' | '使用过';

export interface SkillItem {
  id: string;
  logo: string;
  name: string;
  description: string;
  status: SkillStatusType;
  site: string;
  relatedProjectIds: string[];
}
