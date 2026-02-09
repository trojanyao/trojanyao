export const SkillStatusEnum = {
  学习中: 'learning',
  较熟练: 'proficient',
  熟练: 'proficient',
  使用过: 'familiar',
};

export type SkillStatusEnumKeyType = keyof typeof SkillStatusEnum;

export const skillStatuses = ['learning', 'proficient', 'familiar'] as const;
export type SkillStatusType = (typeof skillStatuses)[number];

export const skillCategories = ['前端', '服务端', 'App', '其他'] as const;
export type SkillCategoryType = (typeof skillCategories)[number];
