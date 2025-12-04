import type { ProjectUnionType } from '../notion/project';

export interface ProjectItem {
  id: string;
  status: string;
  color: string;
  logo: string;
  cover: string;
  name: string;
  slogan: string;
  dateStart: string;
  dateEnd: string;
  type: ProjectUnionType[];
  url?: string;
  qrcode?: string;
  responsibilities?: string[];
  skills?: string[];
  screenshots?: string[];
  width?: number;
  height?: number;
}
