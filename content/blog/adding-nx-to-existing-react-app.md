---
external: false
draft: false
title: Adding NX To Existing React App - Step-By-Step Guide
description: NX integration to existing React app - Step-By-Step guide
date: 2023-12-14
image: '/images/nx-react.webp'
thumb: '/images/thumbs/10.png'
tags: ['react', 'monorepo', 'nx']
popular: false
---

![NX](/images/nx-react.webp)

So, what is NX, and how could it improve your existing React App? Here is the description from the official website: Nx is a powerful open-source build system that provides tools and techniques for enhancing developer productivity, optimizing CI performance, and maintaining code quality.

But why should we use it for our React application, and what are the benefits? Let’s discover it!

### How Does Nx Help You?

In a nutshell, Nx helps to: speed up your computation (e.g. builds, tests etc), locally and on CI and to integrate and automate your tooling via its plugins. All of this can be adopted incrementally. You can use plugins, but you don’t have to. Look at the Nx architecture in the next section to learn more.

You can use Nx to

- speed up your existing project’s builds and tests, locally and on CI (whether that’s a monorepo or standalone application)
- quickly scaffold a new project (using Nx plugins) without having to configure any lower-level build tools
- easily integrate new tooling (e.g., Storybook, Tailwind etc), into your project.
- ensure consistency and code quality with custom generators and lint rules
- update your frameworks and tools and keep your workspace evergreen using the automated code migration feature

### Benefits for React App

Nx is a powerful open-source build system that offers several benefits for your React project:

1. Clear architectural guidelines and best practices: Nx helps you organize and scale your codebase by providing clear architectural guidelines and promoting best practices.

2. Integration with modern tooling: Nx actively works with devtool authors to ensure seamless integration with Nx and your chosen framework. This allows you to leverage modern tooling and enhance your development experience.

3. Adaptability: Nx allows you to start small with a single-project setup and easily grow it into a monorepo when needed. This adaptability enables you to scale your project as it evolves.

4. Active community: Nx has a vibrant community of contributors and plugin authors who actively contribute to its development and provide support.

5. Proven in enterprise-level projects: Nx has been successfully used in large enterprise-level projects, demonstrating its reliability and scalability.

Overall, Nx is focused on improving developer productivity and providing a comprehensive set of tools and techniques to optimize CI performance and maintain code quality.

### Installing Nx on a Non-Monorepo Project

```bash
npx nx@latest init
```

This will

- collect all the NPM scripts in the corresponding package.json files of your workspace packages
- ask you which of those scripts are cacheable (e.g. build, test, lint)
- ask you which of those scripts might need to be run in a certain order (e.g. if you run the build script you might want to first build all the dependent projects)
- ask you for custom output folders that should be captured as part of the caching

### Wrapping Cacheable Scripts

Nx also automatically wraps your cacheable scripts with the `nx exec` command. The main advantage here is that you can still keep using `npm start` or `npm run build` (or other package manager's alternatives) as you're accustomed to. But still get the benefits of making those operations cacheble.

Here’s an example of a `build` and `lint` script being wrapped by Nx:

```json
{
  ...
  "scripts": {
    "build": "nx exec -- vite build",
    "lint": "nx exec -- eslint \"src/**/*.ts*\"",
    ...
    "dev": "vite",
    "start": "vite --open",
  },
  "devDependencies": {
    ...
    "nx": "17.2.0"
  }
}

```

### Migrating a Create-React-App project into an Nx Workspace

Create-React-App (CRA) is one of the most widely used tool for creating, building and testing a React app. This guide will show you how to move an app generated with CRA into an Nx workspace. Once the migration process is complete, you’ll be able to take advantage of all of Nx’s features without needing to completely recreate your build process.

#### Automated migration

The easiest way to setup Nx in your CRA project is to use the automated migration tool.

```bash
npx nx@latest init

```

The command above will detect that the project is generated with CRA, and that it has not been ejected, or _ customized_ with either `react-app-rewired` or `@craco/craco`. If the project has either been ejected or customized, then the migration will still continue but you will be prompted for more information.

That’s it!

#### Try Nx

Use the same scripts as before, and Nx will run underneath the hood with nx `exec`.

```bash
npm start
npm run build
npm test
```

### Conclusion

Now you know how to add NX to your existing React Application and how it can improve your CI. NX is powerful and can help create a great project as monorepo or standalone. I hope this article was helpful!
