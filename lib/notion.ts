const { Client } = require('@notionhq/client');

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

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

export async function getProjects(body?: any[]): Promise<ProjectItem[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_PROJECT_DEV,
    filter: {
      and: [
        {
          property: '个人网站',
          status: {
            equals: '上线',
          },
        },
        ...(body ?? []),
      ],
    },
  });

  return res?.results.map((page: any) => ({
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
}

export default notion;
