import notion from './client';

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
