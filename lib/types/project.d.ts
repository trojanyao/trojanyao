declare global {
  type ProjectPlatformOrigin = import('../constants/project.constants').ProjectPlatformOriginType;
  type ProjectPlatformVisible = import('../constants/project.constants').ProjectPlatformVisibleType;

  interface Project {
    /* 基础 */
    id: string;
    name: string;
    nameEN: string;
    logo: string;
    cover: string;
    /** 封面图的 AVIF 代理 URL（仅当 cover 走本站 proxy 时有值），用于 unoptimized 时仍用 AVIF */
    coverAvif?: string;
    desc: string;
    descEN: string;
    dateStart: string;
    dateEnd: string;
    platform: ProjectPlatformVisibleType[];
    status?: string;
    preview?: string;
    previewEN?: string;
    qrcode?: string;
    /* 开发 */
    skills?: string[];
    responsibilities?: string[];
    responsibilitiesEN?: string[];
    achievements?: string[];
    achievementsEN?: string[];
    /* 个人网站 */
    color: string;
    screenshots?: string[];
    screenshotBorder?: boolean;
    width?: number;
    height?: number;
    resumeOrder?: number;
  }
}

export {};
