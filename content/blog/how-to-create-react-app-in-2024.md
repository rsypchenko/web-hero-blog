---
external: false
draft: false
title: 4 Ways To Create React App in 2024
description: In 2024, there are more ways than ever to get your React projects started. But which one should you choose?
date: 2024-02-10
image: '/images/create-react-app-in-2024.webp'
thumb: '/images/thumbs/10.png'
tags: ['frontend', 'react', 'javascript']
popular: false
---

![React 2024](/images/create-react-app-in-2024.webp)

In 2024, there are more ways than ever to get your React projects started. But which one should you choose?

In this article, I will discuss the different ways to create a React app and help you choose the best option based on your project’s requirements.
I will include a quick guide at the end to help you choose the best option for your project.

## Create React App

In 2023, the Create React App tool was deprecated, meaning that it was no longer being maintained. Create React App had been the most popular way to start a new React project, but it was replaced by various other alternatives.

For that reason, Create React App is not an option for creating a new React project in 2024.

## Vite

You may be asking, “What’s a good replacement for Create React App?” That option is Vite.

Vite is ideal for making client-rendered React projects that run exclusively in the browser.

![Vite](/images/create-react-app-in-2024/vite.webp)

To create a new React project with Vite, simply execute one command:

```bash
npm create vite@latest my-react-app -- --template react
```

The advantage of Vite is that it's much faster than alternatives, especially in development.

Vite is unopinionated, however, which means you will likely need to install a suite of third-party libraries for basic functionality, like routing and data fetching.

If your application doesn’t have a server or you are using an external API and it doesn’t need server-side rendering, Vite is a perfect choice.

Additionally, Vite comes with its own config file, `vite.config.js`, which might require reading the documentation in order to configure things such as environment variables, build options, and image options.

## Next.js

If you’re looking for a way to build a React app that gives you a single-page app (SPA) experience but with server-side rendering and server components, Next.js is your choice.

![next](/images/create-react-app-in-2024/next.webp)

Next.js is the only option at the moment that comes with server components, which allows you to mark a component as `async` and `await` in some operation on the server.

```js
async function getData() {
  const res = await fetch('https://api.example.com/...');
  return res.json();
}
 
export default async function Page() {
  const data = await getData();
 
  return <main>{data}</main>;
}
```

Server components offer a great benefit when it comes to improving user experience. By eliminating the need to show a loading spinner before fetching data, you can enhance the overall performance of your application. Additionally, the reduced amount of JavaScript sent to the client by using server components results in faster load times, making for a more responsive and enjoyable user experience.

Server components require a server to deploy, which is more complex than a client-rendered React app with Vite.

Next.js has many built-in features, including dedicated file-based routing, image optimization, and font loading.

Next.js also allows you to tap into server actions, which is a new React feature that allows you to run server code by calling a function.

```js
// Server Component
export default function Page() {
  // Server Action
  async function create() {
    'use server'
 
    // ...
  }
 
  return (
    // ...
  )
}
```

Next.js has route handlers to make HTTP requests to an API endpoint. This is not possible in client-rendered React apps since there is no server.

With all of Next.js’ benefits, it comes with a steeper learning curve. There are a number of Next.js-specific concepts that may seem to go against some React concepts you’ve already learned.

For example, within server components, you can’t use React Hooks. This means that you have to rely on patterns such as storing state in the URL.

Next.js, the most popular React framework, is relied upon to build impressive React apps powering small startups to Fortune 500 companies, despite the learning curve.

## Remix

Remix, like Next.js, is a React-based framework that has a different focus on web standards to deliver a better user experience. Remix allows you also to write server and client React code.

![Remix](/images/create-react-app-in-2024/remix.webp)

Remix prides itself on serving static and dynamic content faster than Next.js. This means it’s equally good at building full-stack applications as well as static websites.

Instead of server components and server actions, Remix has actions. Actions allow you to handle data mutations on your server, which is anything that isn’t a GET request. Actions are just simple functions with the name action.

To fetch data, use loaders - simple functions. React Remix uses React Router, so if you’re familiar with React Router, you’ll feel comfortable with Remix.

```js
export async function loader() {
  return json(await fakeGetTodos());
}
```

```jsx
export default function Todos() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <TodoList todos={data} />
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">Create Todo</button>
      </Form>
    </div>
  );
}
```

Remix is a relatively more stable framework than Next.js and has a less steep learning curve. It enables you to create impressive applications with ease. However, the only downside is that it lacks popularity when compared to Next.js. As a result, it does not have the same level of community support and libraries available for it.

But if you do want something with server-side rendering and client-side rendering, Remix still remains a great option to build your next React project.

## Astro

The newest way to build a React project is the most performant. React apps can also be built using a framework called Astro.

![Astro](/images/create-react-app-in-2024/astro.webp)

Astro’s goal is deliver content to users quickly through something called “island architecture”.

In summary, JavaScript is loaded on demand for an optimal user experience. Consider using Astro for faster websites.

Astro supports server-side rendering and is great for SEO-focused websites that are largely static. However, what’s neat about Astro is that it can also run code on the server if you choose to. It’s not as popular to build fully dynamic, full-stack applications with Astro, but it is possible to do so.

Astro is also very flexible as it’s not even tied to React. You don’t need to use React whatsoever to build an Astro app, and you can use React alongside other frameworks such as Vue and Svelte within the same app.

If you're creating a website that includes posts or content using markdown or MDX, Astro is a great option. It employs a feature known as "collections" to define all the data in your markdown files, so you can easily determine which content will be displayed in your React components.

Astro is becoming increasingly popular, and it is perhaps the best option available if you want to create a static website that doesn't require a database or authentication, or a website that is predominantly static.

## So What Should I Choose?

If you’ve read up to this point and you’re still trying to figure out which framework would be best for you to build a React project in 2024, here’s the rundown:

- If you’re just starting out and learning the React basics but want to build a simple or medium-sized project, stick with Vite.
- If you want a full-stack framework with all the bells and whistles, like server components, and you don’t mind spending time learning additional concepts, check out Next.js.
- If you’ve tried Next.js and find some of its concepts difficult to understand, but still want to build a full-stack React application, look into Remix.
- If you have a website that is static or content-driven and you don't require a database or authentication, I highly recommend using Astro.
