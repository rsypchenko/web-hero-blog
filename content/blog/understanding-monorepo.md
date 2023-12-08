---
external: false
draft: false
title: Understanding Monorepo
description: ''
date: 2023-08-10
image: '/images/monorepo.webp'
thumb: '/images/thumbs/10.png'
---

![Blogster](/images/monorepo.webp)

Monorepos are hot right now, especially among Web developers. We created this resource to help developers understand what monorepos are, what benefits they can bring, and the tools available to make monorepo development delightful.

There are many great monorepo tools, built by great teams, with different philosophies. We do our best to represent each tool objectively, and [we welcome pull requests if we got something wrong!](https://github.com/nrwl/monorepo.tools?utm_source=monorepo.tools)

The tools we’ll focus on are: Bazel (by Google), Gradle Build Tool (by Gradle, Inc), Lage (by Microsoft), Lerna, Nx (by Nrwl), Pants (by the Pants Build community), Rush (by Microsoft), and Turborepo (by Vercel). We chose these tools because of their usage or recognition in the Web development community.

### What is a Monorepo?
A monorepo is a single repository containing multiple distinct projects with well-defined relationships.

![Blogster](/images/monorepo2.webp)

Consider a repository with several projects in it. We have “code colocation”, but if there are no well-defined relationships among them, we would not call it a monorepo.

Likewise, if a repository contains a massive application without division and encapsulation of discrete parts, it’s just a big repo. You can give it a fancy name like “garganturepo,” but we’re sorry to say, it’s not a monorepo.

In fact, such a repo is prohibitively monolithic, which is often the first thing that comes to mind when people think of monorepos. Keep reading; you’ll see that a good monorepo is the opposite of monolithic.

![Blogster](/images/monorepo3.webp)

✋ Monorepo ≠ Monolith
A good monorepo is the opposite of monolithic! Read more about this and other misconceptions in the article “Misconceptions about Monorepos: Monorepo != Monolith”.

#### But why?
Let’s go deeper into the rabbit hole.

— No overhead to create new projects
Use the existing CI setup, and no need to publish versioned packages if all consumers are in the same repo.

— Atomic commits across projects
Everything works together at every commit. There’s no such thing as a breaking change when you fix everything in the same commit.

— One version of everything
No need to worry about incompatibilities because of projects depending on conflicting versions of third party libraries.

— Developer mobility
Get a consistent way of building and testing applications written using different tools and technologies. Developers can confidently contribute to other teams’ applications and verify that their changes are safe.

#### What monorepo tools should provide?
Monorepos have a lot of advantages, but to make them work, you need to have the right tools. As your workspace grows, the tools have to help you keep it fast, understandable, and manageable.

![Blogster](/images/monorepo4.webp)

#### It’s not just about the features.
Features matter! Things like support for distributed task execution can be a game changer, especially in large monorepos. But there are other extremely important things such as dev ergonomics, maturity, documentation, editor support, etc. We don’t cover them here because they are more subjective.

You may find, say, Lage more enjoyable to use than Nx or Bazel even though in some ways it is less capable.

Some features are easy to add even when a given tool doesn’t support it (e.g., code generation), and some aren’t really possible to add (e.g., distributed task execution).


#### Many solutions for different goals
Each tool fits a specific set of needs and gives you precise features.
Depending on your needs and constraints, we’ll help you decide which tools best suit you.

- Bazel (by Google)
“A fast, scalable, multi-language and extensible build system.”

- Gradle (by Gradle, Inc)
“A fast, flexible polyglot build system designed for multi-project builds.”

- Lage (by Microsoft)
“Task runner in JS monorepos”

- Lerna (maintained by Nrwl)
“A tool for managing JavaScript projects with multiple packages.”

- Nx (by Nrwl)
“Next generation build system with first class monorepo support and powerful integrations.”

- Pants (by Pants Build)
“A fast, scalable, user-friendly build system for codebases of all sizes.”

- Rush (by Microsoft)
“Geared for large monorepos with lots of teams and projects. Part of the Rush Stack family of projects.”

- Turborepo (by Vercel)
“The high-performance build system for JavaScript & TypeScript codebases.”

![Blogster](/images/monorepo5.webp)


### Resources
Here is a curated list of useful videos and podcasts to go deeper or see the information in another way.

- [SyntaxFM #426: Monorepos! Workspaces, pnpm, turborepo + more!](https://syntax.fm/show/426/monorepos-workspaces-pnpm-turborepo-more?utm_source=monorepo.tools)
- [Monorepos — How the Pros Scale Huge Software Projects](https://www.youtube.com/watch?v=9iU_IE6vnJ8&utm_source=monorepo.tools)
- [Nx: Google-level Monorepo Tools for Everyone — Jeff Cross and Victor Savkin](https://www.youtube.com/watch?v=eZQ_jWaTCVM&utm_source=monorepo.tools)
- [Turborepo Demo and Walkthrough (High-Performance Monorepos)](https://www.youtube.com/watch?v=YX5yoApjI3M&utm_source=monorepo.tools)
- [Monorepos: Any Size Fits All, by Altan Stalker](https://www.youtube.com/watch?v=elKsZvowdok&utm_source=monorepo.tools)
- [BazelCon 2021 (Playlist)](https://www.youtube.com/watch?v=7M9c6x3WgIQ&list=PLxNYxgaZ8Rsc3auKhtfIB4qXAYf7whEux&utm_source=monorepo.tools)
- [NxConf 2021 (Playlist)](https://www.youtube.com/watch?v=VKVTzVM0nVM&list=PLakNactNC1dG1CoyVWFppw3X8hnXRhFuy&utm_source=monorepo.tools)
- [NxConf Lite 2022 (Playlist)](https://youtube.com/playlist?list=PLakNactNC1dGmYYdDqWTMae5YiC_DRrTx)
- [Pants Podcasts](https://www.pantsbuild.org/docs/media#podcasts&utm_source=monorepo.tools)

### Monorepo articles
Here is a curated list of articles about monorepos that will greatly support what you just learned.

- [The One Version Rule — opensource.google](https://opensource.google/docs/thirdparty/oneversion?utm_source=monorepo.tools)
- [Why TurboRepo Will Be The First Big Trend of 2022](https://dev.to/swyx/why-turborepo-will-be-the-first-big-trend-of-2022-4gfj?utm_source=monorepo.tools)
- [Build Monorepos, not Monoliths](https://dev.to/agentender/build-monorepos-not-monoliths-4gbc?utm_source=monorepo.tools)
- [Lerna 5.1 — New website, new guides, new Lerna example repo, distributed caching support and speed!](https://dev.to/nrwl/lerna-51-new-website-new-guides-new-lerna-example-repo-distributed-caching-support-and-speed-31oe?utm_source=monorepo.tools)
- [Nx monorepo documentation](https://nx.dev/guides/why-monorepos#monorepos?utm_source=monorepo.tools)
- [Pants Articles](https://www.pantsbuild.org/docs/media#posts--articles?utm_source=monorepo.tools)


### Conclusion
In conclusion, monorepos stand as a remarkable innovation in the software development landscape, offering a multitude of advantages including ease of creating new projects, atomic commits, uniform versions, and heightened developer mobility. It’s crucial to dispel the misconception of a monorepo being equivalent to a monolith, as the essence of a well-crafted monorepo lies in its exact opposition to monolithic structures.

The choice of the right tool, be it Bazel, Gradle, Lage, Lerna, Nx, Pants, Rush, or Turborepo, should be guided by the specific needs and goals of your project. Each tool is equipped with a unique set of capabilities to support the management of monorepos, making the environment efficient and manageable.

Remember, adopting a monorepo is not merely about leveraging a new technology or tool — it represents a shift in the entire organizational framework. By transforming the approach towards coding, project creation, large-scale refactoring, code sharing, and team collaboration, monorepos open avenues for enhancing overall efficiency and productivity. However, this shift calls for a keen understanding of monorepos, careful tool selection, and strategic planning, all of which this article aimed to guide you through.

Embrace the complexity, leverage the resources provided, and embark on this transformative journey towards an efficient and streamlined development environment with monorepos. Your organization stands to gain immensely from the power and potential that this approach offers.

Happy codding 🚀