import notion from './client';

/* Get Skill List */
export async function getSkills(body?: any[]): Promise<Skill[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_SKILL_DEV,
    filter: {
      and: [
        {
          property: '上线 *',
          select: {
            equals: '显示',
          },
        },
        ...(body ?? []),
      ],
    },
    sorts: [
      {
        property: '排序',
        direction: 'ascending',
      },
    ],
  });

  return res?.results.map((page: any) => ({
    id: page.id,
    name: page.properties?.['技能']?.title?.[0]?.text?.content,
    logo: page.icon?.file?.url,
    status: page.properties?.['优先级 / 状态']?.status?.name,
    category: page.properties?.['分类 *']?.select?.name,
  }));
}

/* Get Skill Detail */
export async function getSkill(id: string): Promise<Skill> {
  const page = await notion.pages.retrieve({ page_id: id });

  return {
    id: page.id,
    logo: page.icon?.file?.url,
    name: page.properties?.['技能']?.title?.[0]?.text?.content,
    // TODO: support bold and other annotations
    description: page.properties?.['简介 *']?.rich_text
      ?.map((item: any) => item?.plain_text)
      ?.join(''),
    status: page.properties?.['优先级 / 状态']?.status?.name,
    site: page.properties?.['链接 *']?.url,
    relatedProjectIds: page.properties?.['相关项目']?.relation?.map((item: any) => item?.id) ?? [],
  };
}
