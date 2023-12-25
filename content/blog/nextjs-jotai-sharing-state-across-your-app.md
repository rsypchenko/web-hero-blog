---
external: false
draft: false
title: Next.js + Jotai - Sharing State Across Your App
description: How to share state across your Next.js application
date: 2023-12-18
image: '/images/nextjs-jotai.webp'
thumb: '/images/thumbs/10.png'
tags: ['next.js', 'jotai', 'state management']
popular: false
---

![Jotai](/images/nextjs-jotai.webp)

The React ecosystem has simplified and improved the web over the past few years. It has led to many valuable patterns and practices for building modern web applications.

React is a library that focuses on rendering the view layer of an application. It is designed to be flexible and not impose a particular approach or philosophy on the application's structure. React achieves this by allowing developers to manage the application's state themselves rather than providing a pre-defined solution. Essentially, React is responsible for updating the user interface and rendering changes to the DOM. At the same time, the logic of how to share the state between components is left up to the developer.

### Core principles of Jotai

Jotai, being a tiny library, has a lot to take care of as a state-sharing solution. It was inspired by Facebook’s Recoil, which solves similar problems but is recommended for larger organizations.

Jotai relies on its atomicity principle, which says that every state at its core can be defined as an `atom`. These atoms can then be chained and scaled together to form complex states. The state value only ever re-renders if its atom dependency changes.

These dependency trackers are highly optimized for production. And unlike React, you usually don’t need to use any memoization techniques like the Memo component or useMemo Hook.

For example, in the below case, you can initialize an `atomCount` variable with the atom API:

```jsx
import { useAtom, atom } from "jotai";

// states can be created using atom API
const atomCount = atom(1)

// pass the above atom variable to the `useAtom` hook to read and 
// mutate its values
const [count, setCount] = useAtom(atomCount)
```

### Next.js applications performance bottlenecks

One of the trickiest parts of working with large-scale Next.js applications is handling state across the application.

React Hooks simplifies state management by providing the Context API to handle application-wide states that can’t be dealt with via the Hook. However, if you’re not too careful with Context APIs, you could run into performance problems quite easily.

For example, in the below case, you are passing three state values — theme, `isSignedIn`, and `subscription` — to your child components by wrapping them in AppContext providers:

```jsx
<AppContext.Provider value={theme, isSignedIn, subscription}>        
    <Navbar />
    <Main />
    <Subscription />
</AppContext.Provider>
```

All three child components would re-render themselves in this case even if a single state value changes. This unnecessary rerendering issue causes huge bottlenecks while scaling your Next.js application.

To address this issue, firstly ensure that you are utilizing the Context API to manage only those states that are required application-wide, such as themes, global language, and other similar ones. Secondly, as advised by the core React team, divide your context providers among the relevant components only.

In the above example, the subscription state value has nothing to do with the `<Navbar />` or `<Main />` components. Therefore, you can split the Context Provider like so:

```jsx
<AppContext.Provider value={ theme, isSignedIn }>        
    <Navbar />
    <Main />
</AppContext.Provider>

<SubscriptionContext.Provider value={ subscription }>        
    <Subscription />
</SubscriptionContext.Provider>
```

One way to further reduce unnecessary re-rendering is to wrap state values with memo before passing them to the Context Provider.

```jsx
const value = React.useMemo(() => [subscription, setSubscription], [subscription])

<SubscriptionContext.Provider value={subscription}>
    <Subscription />
</SubscriptionContext.Provider>

```

This approach solves unnecessary re-rendering issues. However, caution is required while using Context APIs as handling hundreds of provider APIs in large-scale projects can be tricky.

Jotai handles most of these issues with the Context API, like the manual memoization problem, splitting context providers, and more. Let’s explore how.

### Using Jotai with Next.js

JJotai utilizes an atomic principle that allows for the resolution of the memoization issue often encountered in Next.js applications. Everything declared in Jotai can be simplified to atoms that are memoized by default and only re-render when a state changes:

```jsx
import { atom, useAtom } from 'jotai'
import { useState } from 'react';

const init = atom('value')
function App(){
  return (
    const [search, setSearch] = useAtom(init)
  return (
    <input type="search" value={search} onChange={(e) => setSearch(e.target.value) } />
  ))
}
```

You may notice how similar it is to the `useState` hook, except that the `atoms` are declared outside the App component. This allows for more flexibility and readability from anywhere within your application.

Jotai goes a step further and allows you to have more control over these atoms. You can declare atoms to be read-only, write-only, or read- and write-only, like so:

```jsx
const atomCount = atom(1)
const readOnlyAtom = atom((get) => get(atomCount) * get(atomCount))

// this is write-only allows you to mutate the initial value using `get` & //`set`

const writeOnlyAtom = atom(null, (get, set, _arg) => {
  set(atomCount, get(atomCount) - 12)
})

// read-write atoms allows you to both mutate & read atom values
const readwriteAtom = atom(
  (get) => get(atomCount),
  (get, set, _arg) => {
    set(atomCount, get(atomCount) - 12)
  }
)

// read values using useAtom() hook
const [count, setCount] = useAtom(atomCount)
const [readAtom, setReadAtom] = useAtom(readOnlyAtom)
const [writeAtom, setWriteAtom] = useAtom(writeOnlyAtom)
const [readwriteonly, setReadWriteOnly] = useAtom(readwriteAtom)
```

Like React’s Context API, you can wrap your components with Jotai’s Provider API. Wrap your root components in the `_app.tsx` file of your Next.js app like so:

```jsx
const counterInit = atom(0);

const Counter = () => {
  const [counter, setCounter] = useAtom(counterInit);
  return (
    <>
      <h2>{counter}</h2>
      <button onClick={() => setCounter((value) => value + 1)}>inc</button>
    </>
  );
};

const App = () => {
  return (
    <>
      <Provider initialValues={[[counterState, 10]]}>
        <Counter />
      </Provider>

      <Provider initialValues={[[counterState, 20]]}>
        <Counter />
      </Provider>
    </>
  );
};
```

In the example above:

- There are two `Provider` subtrees wrapping the `<counter />` component
- The Provider API takes initialValues as a prop
- You can pass the `atom` state with its initial state as an array
- The `App` component would render two instances of the `<Counter />` component with initial values of 10 and 20, respectively

Jotai’s Provider API is helpful when creating a collection of components and wrapping them in a Provider to pass values to each wrapped component. These are optimized by default.

You can create multiple Provider subtrees for different scopes like so:

```jsx
<Provider initialValues={[languageAtom, initialValue]}>
  <App />
</Provider>

<Provider initialValues={[themeAtom, initialValue]}>
  <Main />
</Provider>
```

### Hydrating SSR pages in Next.js with Jotai

When working with SSR applications, especially in the case of Next.js, the atoms You define in Jotai what has to be prefetched to generate the SSR pages.

Unfortunately, the server-side components cannot return asynchronous promise-based events. To generate the server-side pages and prefetch atoms with values sent from the server, Jotai exposes a useHydrateAtoms hook.

In a typical SSR page — or, if you’re using Next.js v13 or newer, a page using React Server Components — you would use the useHydrateAtoms hook like so:

```jsx
import { atom, useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

const countInit = atom(0)

function CounterApp({ countSentFromServer }){
  useHydrateAtoms([[countInit, countSentFromServer]])
  const [count] = useAtom(countInit)
 
return (
    <>
      <h1> Count : { count } </h1>
    </>
  )
}
```

In the example above, Next.js would hydrate this page using Jotai’s `useHydrateAtoms` hook. The count value that was initially 0 would now hydrate its value from the server.

One important pattern worth talking about is the `atomWithHash` API. In Jotai, you can subscribe to the changes in router events using the `atomWithHash` API like so:

```jsx
import React from 'react';
import { useAtom } from 'jotai';
import { atomWithLocation } from 'jotai-location';

const locationAtom = atomWithLocation();

function HomePage() {
  const [location, setLocation] = useAtom(locationAtom);
  return (
<button onClick={() => setLoc((prev) => ({ ...prev, pathname: '/dashboard',
 searchParams: new URLSearchParams([['page', '1']]), }))}>
     Goto Page 1
</button>
  );
};
```

The `atomWithHash` API is a straightforward API that subscribes to changes in router events. You can pair this further with the `Router.events` API provided by Next.js, which would allow you to have more control over server-rendered pages by subscribing to changes in router events:

```jsx
const pagination = atomWithHash('page', 1, {
  subscribe: (callbackFn) => {
     // triggers when route change is detected
    Router.events.on('routeChangeComplete', callbackFn)
   // return callback function for memory cleanup 
   return () => {
      Router.events.off('routeChangeComplete', callbackFn)
    }
  },
})
```

In a Next.js application, the atomWithHash API can be used to subscribe to the changes in router events.

### Conclusion

Jotai is a small library that can be easily paired with other patterns and libraries, such as Redux, Immer, and others. Jotai is not intended to replace existing state management solutions. Rather, it can work in parallel with other state managers or with React itself. Despite being small, Jotai offers flexibility and can adapt to different use cases.

The Jotai APIs share many similarities with those in React, making them easy to learn. Jotai is a great option as an alternative to the Context API and other APIs. Unlike React's Context API, Jotai doesn't require additional overhead as your application scales up.
