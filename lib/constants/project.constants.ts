export const ProjectPlatform = {
  'Web App · 桌面端': 'Web App · 桌面端',
  'Web App · 移动端': 'Web App · 移动端',
  'Web 官网 · 桌面端': 'Web 官网 · 桌面端',
  'Web 官网 · 移动端': 'Web 官网 · 移动端',
  'App (iOS)': 'iOS',
  'App (Android)': 'Android',
  PWA: 'PWA',
  微信小程序: '微信小程序',
};

// "Web App · 桌面端" | "Web App · 移动端" | "Web 官网 · 桌面端" | "Web 官网 · 移动端" | "PWA" | "微信小程序" | "App (iOS)" | "App (Android)"
export type ProjectPlatformOriginType = keyof typeof ProjectPlatform;
// "Web App · 桌面端" | "Web App · 移动端" | "Web 官网 · 桌面端" | "Web 官网 · 移动端" | "iOS" | "Android" | "PWA" | "微信小程序"
export type ProjectPlatformVisibleType = (typeof ProjectPlatform)[ProjectPlatformOriginType];
