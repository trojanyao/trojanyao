import { getTranslations } from 'next-intl/server';

export async function getSkillListBreadcrumbMenus() {
  const t = await getTranslations();
  return [{ text: t('common.dev') }, { text: t('skill.dev-skill') }];
}
