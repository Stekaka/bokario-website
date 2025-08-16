const fs = require('fs');
const path = require('path');

// Define your site URL
const SITE_URL = 'https://bokario.se';

// Define your pages with their metadata
const pages = [
  {
    url: '/',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: '/maps',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/bookings',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/reviews',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/pricing',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/case',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.7'
  }
];

// Generate sitemap XML
function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap to public directory
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log('✅ Sitemap generated successfully!');
  console.log(`📍 Location: ${sitemapPath}`);
  console.log(`🔗 URL: ${SITE_URL}/sitemap.xml`);
}

// Generate robots.txt
function generateRobots() {
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /scripts/

# Crawl delay (optional)
Crawl-delay: 1`;

  // Write robots.txt to public directory
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  fs.writeFileSync(robotsPath, robots);
  
  console.log('✅ Robots.txt generated successfully!');
  console.log(`📍 Location: ${robotsPath}`);
  console.log(`🔗 URL: ${SITE_URL}/robots.txt`);
}

// Generate manifest.json for PWA
function generateManifest() {
  const manifest = {
    "name": "Bokario - Automatisera din verksamhet",
    "short_name": "Bokario",
    "description": "Smarta lösningar för bokningar, Maps-optimering och recensioner",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#0A0A0A",
    "theme_color": "#3B82F6",
    "orientation": "portrait-primary",
    "icons": [
      {
        "src": "/brand/bokario-icon/bokario-icon.svg",
        "sizes": "any",
        "type": "image/svg+xml",
        "purpose": "any maskable"
      },
      {
        "src": "/brand/bokario-icon/bokario-icon.svg",
        "sizes": "192x192",
        "type": "image/svg+xml"
      },
      {
        "src": "/brand/bokario-icon/bokario-icon.svg",
        "sizes": "512x512",
        "type": "image/svg+xml"
      }
    ],
    "categories": ["business", "productivity", "utilities"],
    "lang": "sv-SE",
    "dir": "ltr"
  };

  // Write manifest to public directory
  const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log('✅ Manifest.json generated successfully!');
  console.log(`📍 Location: ${manifestPath}`);
  console.log(`🔗 URL: ${SITE_URL}/manifest.json`);
}

// Main execution
try {
  generateSitemap();
  generateRobots();
  generateManifest();
  console.log('\n🎉 All SEO files generated successfully!');
} catch (error) {
  console.error('❌ Error generating SEO files:', error);
  process.exit(1);
}
