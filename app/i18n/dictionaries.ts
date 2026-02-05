import 'server-only';

// 支持的 locale 列表
export const locales = ['zh', 'en'];

// 默认 locale
export const defaultLocale = 'zh';

// 字典
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  zh: () => import('./dictionaries/zh.json').then((module) => module.default),
};

// Locale 类型
export type Locale = keyof typeof dictionaries; // 'en' | 'zh'

// 判断传入的 locale 是否支持
export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;

// 根据 locale 获取对应字典
export const getDictionary = async (locale: Locale) => dictionaries[locale]();

// Dictionary 类型
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
