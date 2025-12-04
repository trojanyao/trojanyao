
export function groupBy<T extends Record<string, any>>(
  list: T[],
  key: keyof T | ((item: T) => string),
  sortFn?: (a: GroupedItem<T>, b: GroupedItem<T>) => number
): GroupedItem<T>[] {
  const groups: { [key: string]: T[] } = {};

  for (const item of list) {
    let groupKeys: string[] = [];

    // 判断传入的 key 类型
    if (typeof key === 'function') {
      // 如果是函数，则调用该函数来获取分组的键
      groupKeys = [key(item)];
    } else if (Array.isArray(item[key])) {
      // 如果是数组类型的键值，按数组中的元素进行分组
      groupKeys = item[key].map((v: any) => v.toString());
    } else {
      // 默认是按属性的值进行分组
      groupKeys = [item[key].toString()];
    }

    // 根据每个 groupKey 进行分组
    groupKeys.forEach((groupKey) => {
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
    });
  }

  const groupedArray = Object.keys(groups).map((groupKey) => ({
    groupKey,
    items: groups[groupKey],
  }));

  if (sortFn) {
    groupedArray.sort(sortFn);
  }

  return groupedArray;
}
