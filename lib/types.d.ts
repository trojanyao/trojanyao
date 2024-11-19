interface ProjectItem {
  id: string;
  color: string;
  logo: string;
  cover: string;
  name: string;
  slogan: string;
  date: string;
  type: ProjectUnionType[];
  url?: string;
  work?: string[];
  skills?: string[];
  screenshots?: string[];
  width?: number;
  height?: number;
}

type GroupedItem<T> = {
  groupKey: string;
  items: T[];
};

type SkillStatusType = '学习中' | '熟练' | '使用过';

interface SkillItem {
  id: string;
  name: string;
  logo: string;
  status: SkillStatusType;
}
