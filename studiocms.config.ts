import { defineStudioCMSConfig } from "studiocms/config"
import html from '@studiocms/html';
import md from '@studiocms/md';
import mdx from '@studiocms/mdx';
import s3Storage from '@studiocms/s3-storage';

export default defineStudioCMSConfig({
  dbStartPage: false,
  storageManager: s3Storage(),
  plugins: [html(), md(), mdx()],
  componentRegistry: {
    'a': './src/components/ui/registry/A.astro',
    'img': './src/components/ui/registry/Img.astro',
  },
  verbose: true,
})
