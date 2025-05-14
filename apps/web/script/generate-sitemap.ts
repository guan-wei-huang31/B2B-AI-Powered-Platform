import { createWriteStream } from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { fileURLToPath } from 'url';

const links = [
  { url: '/', changefreq: 'monthly', priority: 0.7 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.7 },
  { url: '/product/*', changefreq: 'weekly', priority: 1.0 },
];

const sitemap = new SitemapStream({ hostname: 'http://172.178.36.76:5000/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, '../dist/sitemap.xml');
const writeStream = createWriteStream(distPath);

sitemap.pipe(writeStream);

links.forEach((item) => sitemap.write(item));

sitemap.end();

streamToPromise(sitemap)
  .then(() => {
    console.log(`✅ Sitemap generated at ${distPath}`);
  })
  .catch(console.error);
