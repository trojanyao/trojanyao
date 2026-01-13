import { MetadataRoute } from 'next';

import { getProjects } from '@/lib/notion/project';
import { getSkills } from '@/lib/notion/skill';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://minimalistrojan.com';

  /* Static Routes */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // {
    //   url: `${baseUrl}/service`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.7,
    // },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  /* Dynamic Routes: project detail pages */
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/project/${project.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    // Silently handle errors to avoid affecting sitemap generation
  }

  /* Dynamic Routes: skill detail pages */
  let skillRoutes: MetadataRoute.Sitemap = [];
  try {
    const skills = await getSkills();

    // Skill detail pages (grouped by category)
    const skillDetailRoutes = skills.map((skill) => {
      return {
        url: `${baseUrl}/skill/dev/${skill.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });

    skillRoutes = [...skillDetailRoutes];
  } catch {
    // Silently handle errors to avoid affecting sitemap generation
  }

  return [...staticRoutes, ...projectRoutes, ...skillRoutes];
}
