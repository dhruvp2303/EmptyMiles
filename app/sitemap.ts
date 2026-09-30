import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://emptymiles.in'
  const routes = [
    '',
    '/home',
    '/hunt',
    '/post-cargo',
    '/find-trucks',
    '/return-ride',
    '/trips',
    '/trip',
    '/wallet',
    '/earnings',
    '/vehicles',
    '/profile',
    '/about',
    '/contact',
    '/help',
    '/privacy-policy',
    '/terms',
    '/refund-policy',
    '/cancellation-policy',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/home' || route === '/hunt' ? 'hourly' : 'daily',
    priority: route === '' || route === '/home' || route === '/hunt' ? 1.0 : 0.8,
  }))
}
