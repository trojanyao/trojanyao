'use client';

import { createContext, useContext } from 'react';

import { type Dictionary } from './dictionaries';

/* 第一步：定义 context */
export const DictionaryContext = createContext<Dictionary | null>(null);

/**
 * 第二步：通过 Provider 提供 Context
 *
 * 由于服务端组件中使用 <DictionaryContext.Provider> 会报错，因此头部要使用 'use client'
 * 并且由于 RootLayout 组件函数在使用 'use client' 时无法使用 async
 * 因此将 DictionaryProvider 封装为单独组件，然后在 RootLayout 中使用
 */
export default function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}

/**
 * 第三步：将 useContext 封装
 * 方便在组件中直接通过 useDictionary Hook 使用 context
 * 在客户端子组件中使用 Context（服务器组件中仍使用 await getDictionary()）
 */
export function useDictionary() {
  const dictionary = useContext(DictionaryContext);

  if (!dictionary) {
    throw new Error('useDictionary Hook 必须在 DictionaryProvider 内部使用');
  }

  return dictionary;
}
