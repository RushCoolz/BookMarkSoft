import { MetadataRoute } from 'next';
import { toolCategories, generateToolId } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  // Change this to your actual production domain or use an environment variable
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bookmarksoft.com';

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }
  ];

  // Dynamically generate sitemap entries for every single tool
  toolCategories.forEach((category) => {
    category.tools.forEach((tool) => {
      routes.push({
        url: `${baseUrl}/tools/${generateToolId(tool.title)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });
  });

  return routes;
}
