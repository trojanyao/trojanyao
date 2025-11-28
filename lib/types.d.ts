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
  responsibilities?: string[];
  skills?: string[];
  screenshots?: string[];
  width?: number;
  height?: number;
}

interface GroupOptionItem {
  icon: React.ReactNode;
  key: string;
  text: string;
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
