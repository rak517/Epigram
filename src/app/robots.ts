import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/login', '/signup'],
        disallow: ['/epigrams/*', '/addepigrams', '/search', '/feed', '/mypage', '/oauth'],
      },
    ],
    sitemap: 'https://dailyepigram.vercel.app/sitemap.xml',
  };
}
