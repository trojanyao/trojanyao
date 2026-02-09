export const SkillStatusEnum = {
  学习中: 'learning',
  较熟练: 'proficient',
  熟练: 'proficient',
  使用过: 'familiar',
};

export type SkillStatusEnumKeyType = keyof typeof SkillStatusEnum;

export const skillStatuses = ['learning', 'proficient', 'familiar'] as const;
export type SkillStatusType = (typeof skillStatuses)[number];

export const SkillCategoryEnum = {
  前端: 'front-end',
  服务端: 'back-end',
  后端: 'back-end',
  App: 'app',
  其他: 'others',
};

export const skillCategories = ['front-end', 'back-end', 'app', 'others'] as const;
export type SkillCategoryType = (typeof skillCategories)[number];
