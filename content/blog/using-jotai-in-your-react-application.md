---
external: false
draft: false
title: Using Jotai in Your React Application
description: Create more maintainable and efficient React applications by mastering Jotai’s core concepts and applying its best practices.
date: 2023-01-10
image: '/images/jotai.webp'
thumb: '/images/thumbs/10.png'
---

![Blogster](/images/jotai.webp)

Jotai takes an atomic approach to global React state management with a model inspired by Recoil.

Build state by combining atoms, and renders are automatically optimized based on atom dependency. This solves the extra re-render issue of React context and eliminates the need for memoization.

It scales from a simple useState replacement to an enterprise TypeScript application with complex requirements. Plus, plenty of utilities and integrations will help you along the way!

Jotai is trusted in production by teams at innovative companies like these.

### Features

- Minimal core API (2kb)
- Many utilities and integrations
- TypeScript oriented
- Works with Next.js, Gatsby, Remix, and React Native
- React Fast Refresh with SWC and Babel plugins

### Jotai vs. Redux

Jotai is very different from Redux and [React Context API](https://legacy.reactjs.org/docs/context.html) in almost every way. But there’s one central concept that is the catch-all — the one that you need to internalize.

Redux stores are monolithic, but Jotai is **atomic**.

This means in Redux, it’s a pattern to store all the needed global state in the app in one big object. In Jotai, it’s the opposite. You break your state into atoms i.e. — one store for one single store or for a closely related state.

### Installation

First, add Jotai as a dependency to your React project.

```js
# npm
npm i jotai

# yarn
yarn add jotai

# pnpm
pnpm install jotai
```

### Setting it up in the app

```react
// index.jsx (or index.tsx)
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

// Jotai provider
import { Provider } from 'jotai';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

### Use atoms

Then use atoms within React components to read or write state.

- *Read and write from the same component*

When atoms are both read and written within the same component, use the combined useAtom hook for simplicity.

```js
import { useAtom } from 'jotai'

const AnimeApp = () => {
  const [anime, setAnime] = useAtom(animeAtom)

  return (
    <>
      <ul>
        {anime.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
      <button onClick={() => {
        setAnime((anime) => [
          ...anime,
          {
            title: 'Cowboy Bebop',
            year: 1998,
            watched: false
          }
        ])
      }}>
        Add Cowboy Bebop
      </button>
    <>
  )
}
```

- *Read and write from separate components* 

When atom values are only read or written, use the separate `useAtomValue` and `useSetAtom` hooks to optimize re-renders.

```js
import { useAtomValue, useSetAtom } from 'jotai'

const AnimeList = () => {
  const anime = useAtomValue(animeAtom)

  return (
    <ul>
      {anime.map((item) => (
        <li key={item.title}>{item.title}</li>
      ))}
    </ul>
  )
}

const AddAnime = () => {
  const setAnime = useSetAtom(animeAtom)

  return (
    <button onClick={() => {
      setAnime((anime) => [
        ...anime,
        {
          title: 'Cowboy Bebop',
          year: 1998,
          watched: false
        }
      ])
    }}>
      Add Cowboy Bebop
    </button>
  )
}

const ProgressTracker = () => {
  const progress = useAtomValue(progressAtom)

  return (
    <div>{Math.trunc(progress * 100)}% watched</div>
  )
}

const AnimeApp = () => {
  return (
    <>
      <AnimeList />
      <AddAnime />
      <ProgressTracker />
    </>
  )
}
```

### Server-side rendering
If server-side rendering with a framework such as Next.js or Gatsby, make sure to use at least one Provider component at the root.

```js
import { Provider } from 'jotai'

// Placement is framework-specific (see below)
<Provider>
  {...}
</Provider>
```

### Next.js (app directory)

Create the provider in a separate client component. Then import the provider into the root layout.js server component.

```js
// providers.js (app directory)
'use client'

export default function Providers({ children }) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}


// layout.js (app directory)
import Providers from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

### Next.js (pages directory)

Create the provider in `_app.js`

```
// _app.js (pages directory)
export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
```

### API overview

Jotai has a very minimal API and is TypeScript oriented. It is as simple to use as React’s integrated `useState` hook, but all state is globally accessible, derived state is easy to implement, and unnecessary re-renders are automatically eliminated.

```js
import { atom, useAtom } from 'jotai'

// Create your atoms and derivatives
const textAtom = atom('hello')
const uppercaseAtom = atom(
  (get) => get(textAtom).toUpperCase()
)

// Use them anywhere in your app
const Input = () => {
  const [text, setText] = useAtom(textAtom)
  const handleChange = (e) => setText(e.target.value)
  return (
    <input value={text} onChange={handleChange} />
  )
}

const Uppercase = () => {
  const [uppercase] = useAtom(uppercaseAtom)
  return (
    <div>Uppercase: {uppercase}</div>
  )
}

// Now you have the components
const App = () => {
  return (
    <>
      <Input />
      <Uppercase />
    </>
  )
}
```

The Jotai package also includes a `jotai/utils` bundle. These extra functions support persisting an atom in localStorage, hydrating an atom during server-side rendering, creating atoms with Redux-like reducers and action types, and much more.

```js
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Set the string key and the initial value
const darkModeAtom = atomWithStorage('darkMode', false)

const Page = () => {
  // Consume persisted state like any other atom
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  const toggleDarkMode = () => setDarkMode(!darkMode)
  return (
    <>
      <h1>Welcome to {darkMode ? 'dark' : 'light'} mode!</h1>
      <button onClick={toggleDarkMode}>toggle theme</button>
    </>
  )
}
```

- **createStore**

This function is to create a new empty store. The store can be used to pass in. `Provider`.

The store has three methods: `get` for getting atom values, `set` for setting atom values, and sub for subscribing to atom changes.

```js
const myStore = createStore()

const countAtom = atom(0)
myStore.set(countAtom, 1)
const unsub = myStore.sub(countAtom, () => {
  console.log('countAtom value is changed to', myStore.get(countAtom))
})
// unsub() to unsubscribe

const Root = () => (
  <Provider store={myStore}>
    <App />
  </Provider>
)
```

- **getDefaultStore**

```js
const defaultStore = getDefaultStore()
```

### How is Jotai different from Zustand?

#### Name

Jotai means “state” in Japanese. Zustand means “state” in German.

#### Analogy

Jotai is like Recoil. Zustand is like Redux.

#### Where state resides

To hold states, Both have stores that can exist either at module level or at context level. Jotai is designed to be context first and module second. Zustand is designed to be module first, and context second.

#### How to structure state

Jotai state consists of atoms (i.e. bottom-up). Zustand state is one object (i.e. top-down).

#### Technical difference

The major difference is the state model. Zustand is a single store (although you could create multiple separate stores), while Jotai consists of primitive atoms and allows composing them together. In this sense, it’s a matter of programming a mental model.


### When to use which

- If you need a replacement for useState+useContext, Jotai fits well.
- If you want a simple module state, Zustand fits well.
- If code splitting is important, Jotai should perform well.
- If you prefer Redux devtools, Zustand is good to go.
- If you want to make use of Suspense, Jotai is the one.

### How is Jotai different from Recoil?

(Disclaimer: the author is not very familiar with Recoil, this may be biased and inaccurate.)

#### Developer

- Jotai is developed with collective work by a few developers in Poimandres (formerly react-spring) org.
- A team at Facebook develops recoil.

#### Basis

- Jotai focuses on primitive APIs for easy learning, and it’s unopinionated. (The same philosophy as Zustand)
- Recoil is all-in-one, and it has various cache strategies.

#### Technical difference

- Jotai depends on atom object referential identities.
- Recoil depends on atom string keys.

### When to use which

- If you want to learn something new, either should work.
- If you like Zustand, Jotai would also be pleasant.
- If you need React Context alternatives, Jotai comes with enough features.
- If you need to read and write atoms outside React, Jotai provides store API.
- If you try creating a new library, Jotai might give good primitives.
- Otherwise, both are similar in general goals and basic techniques, so please try both and share your feedback with us.

### Examples:

- React Todo List:
{% sandbox url="github/pmndrs/jotai/tree/main/examples/todos" title="Todo App" /%}
- NextJs Timer:
{% sandbox url="nextjs-with-jotai-5ylrj" title="Tic Tac Toe" /%}
- Tic-Tac-Toe:
{% sandbox url="jotai-tic-tac-6cg3h" title="Tic Tac Toe" /%}

### Conclusion

Jotai is a powerful and flexible state management library that can help you easily manage the state in your React applications. Its lightweight nature and simple API make it an attractive choice for developers looking to reduce complexity and improve performance. You can create more maintainable and efficient React applications by mastering Jotai’s core concepts and applying its best practices.