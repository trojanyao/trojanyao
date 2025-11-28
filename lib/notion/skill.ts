import notion from './client';

/* Get Skill List */
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
    status: page.properties?.['优先级 / 状态']?.status?.name,
  }));
}

/* Get Skill Detail */
export async function getSkill(id: string): Promise<SkillItem> {
  const page = await notion.pages.retrieve({ page_id: id });

  return {
    id: page.id,
    logo: page.icon?.file?.url,
    name: page.properties?.['技能']?.title?.[0]?.text?.content,
    description: page.properties?.['简介 *']?.rich_text?.[0]?.text?.content,
    status: page.properties?.['优先级 / 状态']?.status?.name,
    site: page.properties?.['链接 *']?.url,
    relatedProjectIds: page.properties?.['相关项目']?.relation?.map((item: any) => item?.id) ?? [],
  };
}
