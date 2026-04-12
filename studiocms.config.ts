import { defineStudioCMSConfig } from "studiocms/config"
import html from '@studiocms/html';
import md from '@studiocms/md';
import mdx from '@studiocms/mdx';
import s3Storage from '@studiocms/s3-storage';
import rehypeShiki from '@shikijs/rehype';
import rehypeSketchCodeBlock from './src/plugins/rehypeSketchCodeBlock';

export default defineStudioCMSConfig({
  dbStartPage: false,
  storageManager: s3Storage(),
  logLevel: "Debug",
  plugins: [
    html(),
    md(),
    mdx({
      rehypePlugins: [
        [rehypeShiki, { theme: 'gruvbox-light-soft' }],
        rehypeSketchCodeBlock,
      ],
    }),
  ],
  componentRegistry: {
    'a': './src/components/ui/registry/A.astro',
    'img': './src/components/ui/registry/Img.astro',
  },
})
