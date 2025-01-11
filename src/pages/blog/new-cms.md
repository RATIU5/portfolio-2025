---
layout: ../../layouts/BlogLayout.astro
title: I Don't Like Existing CMS Options, So I'm Building a New One
category: code
date: Dec 18, 2024
time: 7
description: There are a plethora of CMS options to choose from, and many of them are free. What's the point in creating a new one? Can't you just make any one work for my use case?
---

Here is a ~~complete~~ incomplete list of ~~all~~ most CMS solutions:

- [Apostrophe](https://apostrophecms.com/)
- [Builder.io](https://www.builder.io/)
- [Butter](https://buttercms.com/)
- [caisy](https://caisy.io/)
- [cloudcannon](https://cloudcannon.com/)
- [Dato](https://www.datocms.com/)
- [Crystallize](https://crystallize.com/)
- [Craft](https://craftcms.com/)
- [Cosmic](https://www.cosmicjs.com/)
- [Contentful](https://www.contentful.com/)
- [Decap](https://decapcms.org/)
- [Directus](https://directus.io/)
- [Drupal](https://new.drupal.org/home)
- [Flotiq](https://flotiq.com/)
- [FrontMatter](https://frontmatter.codes/)
- [Keystone](https://keystonejs.com/)
- [Keystatic](https://keystatic.com/)
- [hygraph](https://hygraph.com/)
- [Hashnode](https://hashnode.com/)
- [Ghost](https://ghost.org/)
- [Kontent](https://kontent.ai/)
- [microCMS](https://microcms.io/en)
- [Payload](https://payloadcms.com/)
- [Prepr](https://prepr.io/)
- [Prismic](https://prismic.io/)
- [Storyblok](https://www.storyblok.com/)
- [Statamic](https://statamic.com/)
- [Sitecore XM](https://www.sitecore.com/products/experience-manager)
- [Sanity](https://www.sanity.io/)
- [Strapi](https://strapi.io/)
- [TinaCMS](https://tina.io/)
- [Umbraco](https://umbraco.com/)
- [Wordpress](https://wordpress.org/)

## Why the Heck Are You Building a New One Then?

Good question. There are a plethora of CMS options to choose from, and many of them are free. What's the point in creating a new one? Can't you just make any one work for my use case?

That's it! I have to make it "work for my use case", which really means I need to bend and twist existing solutions until they fit perfectly with what I got. Or I need to pick a CMS and use their recommended technology stack. At some point, you have to ask yourself: wouldn't it be more efficient to use something that aligns with my workflows and technology stack?

![Kid tries to put square toy peg in round hole](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExajFodTI5bmNjZWNxOXJrMHBlNWlocnU1Z2JvbWJoMmp1emY2b2NhaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lIPatKk3J7ZEA/giphy.gif)

I sure have. And that's where the idea came from: Why not add another to that list?

## The Current Ecosystem

![City in the morning](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4i3v5qojwtrkdtg6wl3x.jpg)
(Photo by ben o'bro on Unsplash)

Honestly I didn't think that was a good idea at first. Each CMS that's out there already solves a problem, but they all seem to solve it with their own set of trade-offs and compromises. After years of working with different systems, I've noticed a pattern: we keep accepting these compromises as "just the way things are" instead of questioning whether they need to exist at all.

I'm not going to build some magical perfect CMS that does everything for everyone. After time and time again fighting with CMS solutions that either don't understand component-based development or force me to completely change how I work, I'm building something different. I want a CMS that actually gets how we build modern websites and fits naturally into our workflow, not the other way around. I want components, man!

"Hey, what about Builder.io or Prismic?" I hear. "They let you build components and schemas right out of the box!" And you're absolutely right - these platforms have made huge strides in the right direction. I've used both, and there's a lot to love about their approach.

But here's the thing that keeps nagging at me: while they're great for certain use cases, they start showing their limitations once you scale up: their cost per page view or per user. Plus, even with all their features, I still found myself wanting just a bit more control over how everything worked together.
Don't get me wrong - they're solid platforms. But I think we can push this idea further without requiring developers to empty their wallets just to handle growing traffic.

"But wait, what about Payload? It's open-source and has all those features you mentioned!" I hear you. I've been down that road. And yes, Payload is impressive, I actually really like the work their team has done. I just wish I could love it. On top of many issues I faced getting it setup and working for me, I noticed a trend with Payload as well as many others: any CMS that tries to be super flexible while also being simple to use ends up sacrificing something. I've yet to find a CMS that manages to thread that needle perfectly, and honestly, maybe that's okay. Maybe we need to accept that different tools serve different needs, and we need to find the best tool for the job.

Nope, not me. I think we can do better.

## My Proposition

Call me crazy, I think there is a better solution. A solution that already exists in different forms, but has proven its worth in other areas of development: composability. The idea that small, focused pieces can be combined to create powerful systems that are both flexible and maintainable.

Let me introduce to you (if you haven't already met), [Astro](https://astro.build) and [Medusa](https://medusajs.com). These are two amazing feats of engineering. These two projects are built around modularity, especially Medusa. It's simple: you start with a core foundation that handles the essential functionality, and then you can plug in exactly what you need, when you need it. No bloat, no unnecessary features weighing down your project.

This is exactly the kind of thinking we need in the CMS space. Instead of trying to be everything to everyone out of the box, be a solid foundation that developers can easily extend. A CMS that follows these principles could start lean and grow precisely in the direction any project needs, without forcing developers to work around features they'll never use or features they require.

**Quick shout-out moment**!

If you have not tried out Astro as a modern web development solution for your site, give it a try! Medusa is an amazing product for a complex or custom e-commerce experience! This CMS would not exist without heavy inspiration from these two tools.

## What Will Make This CMS Stand Apart?

![Puzzle pieces painted on a wall](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zw3nuiweyc65xvtb2kzr.jpg)
(Photo by Ashkan Forouzani on Unsplash)

As I stated before, it all revolves around the principle of modularity and composability. Small, independent pieces that fit nicely together, like a puzzle. This core detail will help shape the future of this and hopefully many more CMS solutions.

Let's look at what core modules I'm planning to feature:

- **Objects**: Small key-value pairs of any standard data type: strings, numbers, booleans, arrays, and of course, other objects. This provides the foundation for anyone to create any data type.

- **Documents**: Documents are essentially larger objects, with special formatting and extra features. Documents are made up of a custom template or schema, which define what data fields will exist. Data can be entered for each of those fields, specific to their own data type.

- **Media**: Simply put, file uploads. A perfect place to store images, videos, documents, and more all with metadata and attributes.

- **Widgets**: Widgets are pieces or sections of a website. They can be considered as documents with a twist: they have a custom renderer. This renderer enables a widget to be converted from a component template (ie. Astro, React, Vue, Svelte) into rendered HTML by the framework of your choice.

- **Pages**: Pages work will with widgets, allowing you to put together documents and widgets to form a page, perfect for any modern site. Pages also can be rendered to output page previews with whatever technology stack you are currently using.

These modules will provide the foundation for many new and unique data structures defined by the developers, all of which are extendable via plugins.

## What's In It For Me?

This is an ambitious project, and I'm well aware of the challenges that lay ahead. I've decided to document every step of this journey openly, from the initial architecture decisions to the inevitable roadblocks I'll face. My experience has taught me that even failed projects can be valuable learning opportunities for the developer community. When I was starting out, I learned lots of valuable lessons from other developers who were open about their struggles and decision-making processes.

I'm putting my heart into this project because I genuinely believe it can succeed. My goal isn't to build another CMS, but to demonstrate that we can challenge the status quo when we see problems worth solving, even if we are the only ones with that problem (honestly, if we've faced a problem before, I can almost guarentee someone else has faced that same problem ;) ). If this CMS takes off, that's fantastic. But even if it only serves to inspire other developers to tackle ambitious projects they care about, or helps someone else build a better solution down the line, I'll consider that a win. After all, every innovation in our field started with someone looking at a problem and thinking "I believe there's a better way." Which leads me to the actual project.

## Introducing LuxeCMS

The project has taken the name of LuxeCMS, and will be a **100% open-source** project.

[https://github.com/luxeCMS/luxe](https://github.com/luxeCMS/luxe)

Just to be transparent, this is still in its early stages and nowhere near ready for real-world use yet. But I'm excited to connect with other developers who've faced the same CMS frustrations I have. My hope is that together, we can build something that actually addresses the pain points we've all experienced firsthand.

If you are excited about the potential future of this project, consider giving it a star! And if you're interested in contributing to or sponsoring this project, reach out to me on [our Discord server](https://discord.gg/6XzN3e8VCk) and let's chat!

I'm excited for this opportunity to grow as a developer, and to build a community of like-minded individuals to bring something new to the world! If you've experienced pain points of existing CMS solutions or are excited about this project, comment down below!

If you want to follow updates on LuxeCMS, consider following us on [X/Twitter](https://x.com/luxecms_dev).
