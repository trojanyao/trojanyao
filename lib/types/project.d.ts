declare global {
  type ProjectPlatformOrigin = import('../constants/project.constants').ProjectPlatformOriginType;
  type ProjectPlatformVisible = import('../constants/project.constants').ProjectPlatformVisibleType;

  interface Project {
    id: string;
    status?: string;
    color: string;
    logo: string;
    cover: string;
    name: string;
    slogan: string;
    dateStart: string;
    dateEnd: string;
    platform: ProjectPlatformVisibleType[];
    preview?: string;
    qrcode?: string;
    responsibilities?: string[];
    skills?: string[];
    screenshots?: string[];
    screenshotBorder?: boolean;
    width?: number;
    height?: number;
  }
}

export {};
