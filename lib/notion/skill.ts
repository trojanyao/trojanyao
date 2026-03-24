import { cache } from 'react';
import { unstable_cache } from 'next/cache';

import { SkillCategoryEnum, SkillStatusEnum } from '../constants/skill.constants';

import notion from './client';
import { getProxiedImageUrl } from './image-proxy';

/* Get Skill List (cached) */
async function _getSkills(body?: any[]): Promise<Skill[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_SKILL_DEV!,
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
    nameEN: page.properties?.['Name']?.rich_text?.[0]?.text?.content,
    logo: getProxiedImageUrl(page.icon?.file?.url) ?? page.icon?.file?.url ?? '',
    status: SkillStatusEnum[
      (page.properties?.['优先级 / 状态']?.status?.name as keyof typeof SkillStatusEnum) ?? '学习中'
    ] as SkillStatus,
    category: SkillCategoryEnum[
      page.properties?.['分类 *']?.select?.name as keyof typeof SkillCategoryEnum
    ] as SkillCategory,
  }));
}

const getSkillsCached = unstable_cache(_getSkills, ['notion', 'skill', 'getSkills'], {
  // Skill data changes infrequently; cache long enough to avoid LCP blocking calls.
  revalidate: 50 * 60, // 50 minutes (seconds) - align with image proxy server cache TTL
  tags: ['skills'],
});

export async function getSkills(body?: any[]): Promise<Skill[]> {
  return getSkillsCached(body);
}

/* Get Skill Detail */
export async function _getSkill(id: string): Promise<Skill> {
  // console.log(`[getSkill] actual API call, id: ${id}`, new Date().toISOString());
  const page: any = await notion.pages.retrieve({ page_id: id });

  return {
    id: page.id,
    name: page.properties?.['技能']?.title?.[0]?.text?.content,
    nameEN: page.properties?.['Name']?.rich_text?.[0]?.text?.content,
    logo: getProxiedImageUrl(page.icon?.file?.url) ?? page.icon?.file?.url ?? '',
    // TODO: support bold and other annotations
    description: page.properties?.['简介 *']?.rich_text
      ?.map((item: any) => item?.plain_text)
      ?.join(''),
    status: SkillStatusEnum[
      (page.properties?.['优先级 / 状态']?.status?.name as keyof typeof SkillStatusEnum) ?? '学习中'
    ] as SkillStatus,
    site: page.properties?.['链接 *']?.url,
    relatedProjectIds: page.properties?.['相关项目']?.relation?.map((item: any) => item?.id) ?? [],
  };
}

export const getSkill = cache(_getSkill);
