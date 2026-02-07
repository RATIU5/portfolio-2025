import { defineStudioCMSConfig } from "studiocms/config"
import md from '@studiocms/md';
import mdx from '@studiocms/mdx';
import s3Storage from '@studiocms/s3-storage';
import rehypeSketchCodeBlock from './src/plugins/rehypeSketchCodeBlock';
import { refractor } from 'refractor'
import javascript from 'refractor/lang/javascript.js'
import typescript from 'refractor/lang/typescript.js'
import rehypePrismGenerator from 'rehype-prism-plus/generator'

refractor.register(javascript)
refractor.register(typescript)

const rehypePrism = rehypePrismGenerator(refractor)

export default defineStudioCMSConfig({
  dbStartPage: false,
  storageManager: s3Storage(),
  plugins: [
    md(),
    mdx({
      rehypePlugins: [
        rehypePrism,
        rehypeSketchCodeBlock,
      ],
    }),
  ],
  componentRegistry: {
    'a': './src/components/ui/registry/A.astro',
    'img': './src/components/ui/registry/Img.astro',
  },
})
