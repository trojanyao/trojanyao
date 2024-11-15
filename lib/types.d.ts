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
  screenshots?: string[];
  width?: number;
  height?: number;
}

type GroupedItem<T> = {
  groupKey: string;
  items: T[];
};
