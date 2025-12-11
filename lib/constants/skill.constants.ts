export const skillStatuses = ['学习中', '熟练', '使用过'] as const;
export type SkillStatusType = (typeof skillStatuses)[number];

export const skillCategories = ['前端', '服务端', 'App', '其他'] as const;
export type SkillCategoryType = (typeof skillCategories)[number];
