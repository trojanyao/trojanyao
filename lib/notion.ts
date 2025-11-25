const { Client } = require('@notionhq/client');

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

/* ========== PROJECT ========== */
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
    slogan: page.properties?.['简介 *']?.rich_text?.[0]?.text?.content,
    date: page.properties?.['开始 * → 结束']?.date?.start?.match(/^\d{4}-\d{2}/)?.[0],
    type: page.properties?.['形态 *']?.multi_select?.map(
      (typeItem: any) => ProjectType[typeItem?.name as ProjectUnionType] as ProjectValueType
    ),
  }));
}

export async function getProject(id: string): Promise<ProjectItem> {
  const page = await notion.pages.retrieve({ page_id: id });

  return {
    id: page.id,
    color: page.properties?.['品牌色']?.rich_text?.[0]?.text?.content,
    logo: page.icon?.file?.url,
    cover: page.cover?.file?.url,
    name: page.properties?.['项目']?.title?.[0]?.text?.content,
    slogan: page.properties?.['简介 *']?.rich_text?.[0]?.text?.content,
    date: page.properties?.['开始 * → 结束']?.date?.start?.match(/^\d{4}-\d{2}/)?.[0],
    type: page.properties?.['形态 *']?.multi_select?.map(
      (typeItem: any) => ProjectType[typeItem?.name as ProjectUnionType] as ProjectValueType
    ),
    url: page.properties?.['预览']?.url,
    work: page.properties?.['工作内容']?.rich_text?.map((item: any) => item?.plain_text),
    skills: page.properties?.['技术栈']?.relation?.map((item: any) => item?.id),
    screenshots: page.properties?.['真机截图']?.files.map((file: any) => file?.file?.url),
    width: page.properties?.['截图宽度 px']?.number,
    height: page.properties?.['截图高度 px']?.number,
  };
}

/* ========== SKILL ========== */
export async function getSkills(body?: any[]): Promise<SkillItem[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_SKILL_DEV,
    filter: {
      and: [
        {
          property: '个人网站',
          select: {
            equals: '显示',
          },
        },
        ...(body ?? []),
      ],
    },
  });

  return res?.results.map((page: any) => ({
    id: page.id,
    name: page.properties?.['技能']?.title?.[0]?.text?.content,
    logo: page.icon?.file?.url,
    status:
      page.properties?.['显示状态']?.select?.name || page.properties?.['📌 掌握']?.status?.name,
  }));
}

export default notion;
