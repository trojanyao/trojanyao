declare global {
  type ProjectPlatformOrigin = import('../constants/project.constants').ProjectPlatformOriginType;
  type ProjectPlatformVisible = import('../constants/project.constants').ProjectPlatformVisibleType;

  interface Project {
    /* 基础 */
    id: string;
    name: string;
    logo: string;
    cover: string;
    slogan: string;
    dateStart: string;
    dateEnd: string;
    platform: ProjectPlatformVisibleType[];
    status?: string;
    preview?: string;
    qrcode?: string;
    /* 开发 */
    responsibilities?: string[];
    skills?: string[];
    /* 个人网站 */
    color: string;
    screenshots?: string[];
    screenshotBorder?: boolean;
    width?: number;
    height?: number;
  }
}

export {};
