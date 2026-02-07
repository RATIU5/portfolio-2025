import { defineStudioCMSConfig } from "studiocms/config"
import mdx from '@studiocms/mdx';
import s3Storage from '@studiocms/s3-storage';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import rehypeSketchCodeBlock from './src/plugins/rehypeSketchCodeBlock';

// Create highlighter once
const highlighter = await createHighlighterCore({
  themes: [import('@shikijs/themes/gruvbox-light-soft')],
  langs: [
    import('@shikijs/langs/javascript'),
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/css'),
    // add others you need
  ],
  engine: createJavaScriptRegexEngine(),
});

export default defineStudioCMSConfig({
  dbStartPage: false,
  storageManager: s3Storage(),
  plugins: [
    mdx({
      rehypePlugins: [
        [rehypeShikiFromHighlighter, highlighter, { theme: 'gruvbox-light-soft' }],
        rehypeSketchCodeBlock,
      ],
    }),
  ],
  componentRegistry: {
    'a': './src/components/ui/registry/A.astro',
    'img': './src/components/ui/registry/Img.astro',
  },
})
