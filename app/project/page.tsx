import ProjectList from './components/ProjectList';
import notion from '@/lib/notion';

export const ProjectType = {
  'Web App · 桌面端': 'Web App · 桌面端',
  'Web App · 移动端': 'Web App · 移动端',
  'Web 官网 · 桌面端': 'Web 官网 · 桌面端',
  'Web 官网 · 移动端': 'Web 官网 · 移动端',
  'App (iOS)': 'iOS',
  PWA: 'PWA',
  微信小程序: '微信小程序',
};

type ProjectUnionType = keyof typeof ProjectType;
type ProjectValueType = (typeof ProjectType)[ProjectUnionType];

export default async function DevProjects() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_PROJECT_DEV,
    filter: {
      property: '个人网站',
      status: {
        equals: '上线',
      },
    },
  });

  const projects: ProjectItem[] = res.results?.map((page: any) => ({
    id: page.id,
    color: page.properties?.['品牌色']?.rich_text?.[0]?.text?.content,
    logo: page.icon?.file?.url,
    cover: page.cover?.file?.url,
    name: page.properties?.['项目']?.title?.[0]?.text?.content,
    slogan: page.properties?.['📌 简介']?.rich_text?.[0]?.text?.content,
    date: page.properties?.['📌 开始 → 结束']?.date?.start?.match(/^\d{4}-\d{2}/)?.[0],
    type: page.properties?.['📌 形态']?.multi_select?.map(
      (typeItem: any) => ProjectType[typeItem?.name as ProjectUnionType] as ProjectValueType
    ),
  }));

  return <ProjectList projects={projects} />;
}
