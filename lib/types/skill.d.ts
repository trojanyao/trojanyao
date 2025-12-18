declare global {
  type SkillStatus = import('../constants/skill.constants').SkillStatusType;
  type SkillCategory = import('../constants/skill.constants').SkillCategoryType;

  interface Skill {
    // Base
    id: string;
    name: string;
    logo: string;
    status: SkillStatus;
    // Others
    category?: SkillCategory;
    description?: string;
    site?: string;
    relatedProjectIds?: string[];
  }
}
// 将 .d.ts 变为模块，因为需要从 .ts 引入类型
export {};
