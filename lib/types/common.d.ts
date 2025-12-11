declare global {
  interface GroupOptionItem {
    icon: React.ReactNode;
    key: string;
    text: string;
  }

  interface GroupedItem<T> {
    groupName: string;
    items: T[];
  }
}

export {};
