// 从模块导入类型定义
import type {
  GroupOptionItem as _GroupOptionItem,
  GroupedItem as _GroupedItem,
} from './types/common';
import type { ProjectItem as _ProjectItem } from './types/project';
import type { SkillItem as _SkillItem, SkillStatusType as _SkillStatusType } from './types/skill';

// 声明为全局类型，保持向后兼容
declare global {
  interface ProjectItem extends _ProjectItem {}
  interface SkillItem extends _SkillItem {}
  interface GroupOptionItem extends _GroupOptionItem {}
  type SkillStatusType = _SkillStatusType;
  type GroupedItem<T> = _GroupedItem<T>;
}

export {};
