export type SkillStatusType = '学习中' | '熟练' | '使用过';

export interface SkillItem {
  id: string;
  name: string;
  logo: string;
  status: SkillStatusType;
}
