import { MetadataRoute } from 'next';
import { toolCategories, generateToolId } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bookmarksoft.com';

  const toolRoutes = toolCategories.flatMap(cat => cat.tools).map(tool => ({
    url: `${baseUrl}/tools/${generateToolId(tool.title)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...toolRoutes
  ];
}
