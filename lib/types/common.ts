export interface GroupOptionItem {
  icon: React.ReactNode;
  key: string;
  text: string;
}

export type GroupedItem<T> = {
  groupKey: string;
  items: T[];
};
