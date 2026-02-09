import { cache } from 'react';

import { ProjectPlatform, type ProjectPlatformOriginType } from '../constants/project.constants';

import notion from './client';

/* Get Project List */
export async function getProjects(body?: any[]): Promise<Project[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_PROJECT_DEV!,
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
    sorts: [
      {
        property: '开始 * → 结束',
        direction: 'descending',
      },
    ],
  });

  return res?.results.map((page: any) => ({
    // 基础
    id: page.id,
    name: page.properties?.['项目']?.title?.[0]?.text?.content,
    nameEN: page.properties?.['Name *']?.rich_text?.[0]?.text?.content,
    logo: page.icon?.file?.url,
    cover: page.cover?.file?.url,
    desc: page.properties?.['简介 *']?.rich_text?.[0]?.text?.content,
    descEN: page.properties?.['Intro *']?.rich_text?.[0]?.text?.content,
    dateStart: page.properties?.['开始 * → 结束']?.date?.start?.match(/^\d{4}-\d{2}/)?.[0],
    dateEnd: page.properties?.['开始 * → 结束']?.date?.end?.match(/^\d{4}-\d{2}/)?.[0],
    platform: page.properties?.['形态 *']?.multi_select?.map(
      (item: any) => ProjectPlatform[item?.name as ProjectPlatformOriginType],
    ),
    // 个人网站
    color: page.properties?.['品牌色 *']?.rich_text?.[0]?.text?.content,
    resumeOrder: page.properties?.['简历排序']?.number,
  }));
}

/* Get Project Detail */
export async function _getProject(id: string): Promise<Project> {
  // console.log(`[getProject] 实际执行 API 调用，id: ${id}`, new Date().toISOString());

  const page: any = await notion.pages.retrieve({ page_id: id });

  return {
    // 基础
    id: page.id,
    name: page.properties?.['项目']?.title?.[0]?.text?.content,
    nameEN: page.properties?.['Name *']?.rich_text?.[0]?.text?.content,
    logo: page.icon?.file?.url,
    cover: page.cover?.file?.url,
    desc: page.properties?.['简介 *']?.rich_text?.[0]?.text?.content,
    descEN: page.properties?.['Intro *']?.rich_text?.[0]?.text?.content,
    dateStart: page.properties?.['开始 * → 结束']?.date?.start
      ?.match(/^\d{4}-\d{2}/)?.[0]
      ?.replaceAll('-', '.'),
    dateEnd: page.properties?.['开始 * → 结束']?.date?.end
      ?.match(/^\d{4}-\d{2}/)?.[0]
      ?.replaceAll('-', '.'),
    platform: page.properties?.['形态 *']?.multi_select?.map(
      (item: any) => ProjectPlatform[item?.name as ProjectPlatformOriginType],
    ),
    preview: page.properties?.['线上预览 *']?.url,
    qrcode: page.properties?.['二维码 / 小程序码']?.files?.map((file: any) => file?.file?.url),
    status: page.properties?.['在线状态']?.status?.name,
    // 开发
    responsibilities: page.properties?.['工作内容 *']?.rich_text?.map(
      (item: any) => item?.plain_text,
    ),
    achievements: page.properties?.['工作成果 *']?.rich_text?.map((item: any) => item?.plain_text),
    skills: page.properties?.['技术栈 *']?.relation?.map((item: any) => item?.id),
    // 个人网站
    color: page.properties?.['品牌色 *']?.rich_text?.[0]?.text?.content,
    screenshots: page.properties?.['真机截图 *']?.files.map((file: any) => file?.file?.url),
    screenshotBorder: page.properties?.['截图边框']?.checkbox,
    width: page.properties?.['截图宽度 px *']?.number,
    height: page.properties?.['截图高度 px *']?.number,
  };
}

export const getProject = cache(_getProject);
