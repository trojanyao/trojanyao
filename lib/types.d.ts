interface ProjectItem {
  id: string;
  color: string;
  logo: string;
  cover: string;
  name: string;
  slogan: string;
  date: string;
  type: ProjectUnionType[];
}

type GroupedItem<T> = {
  groupKey: string;
  items: T[];
};
