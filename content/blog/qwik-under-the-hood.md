---
external: false
draft: false
title: Qwik Under the Hood
description: Dive deep into the reactive state management of Qwik with our in-depth article
date: 2023-11-09
image: '/images/qwik.webp'
thumb: '/images/thumbs/10.png'
---

![Redux](/images/qwik.webp)

In modern web development, state management is the cornerstone of interactive applications. Qwik, a promising new player in the frontend framework arena, introduces a reactivity model that’s as efficient as it is innovative. This article peels back the layers of Qwik’s reactive state management, offering a glimpse into its inner workings and demonstrating how it can be leveraged to build dynamic user interfaces with unparalleled performance.

### The Basics of Qwik’s Reactivity

At its core, Qwik’s reactivity system is designed around the concept of fine-grained reactivity. Unlike traditional frameworks that rely on a virtual DOM to track changes, Qwik operates directly on the actual DOM, attaching listeners and updating only the parts of the DOM that have changed. This approach minimizes the overhead and maximizes performance, especially for large applications.

Code Example: Simple State Management

Let’s start with a simple counter component to understand how state management works in Qwik:

```js
import { component$, useStore } from '@builder.io/qwik';

export const Counter = component$(() => {
  const state = useStore({ count: 0 });

  return (
    <div>
      <button onClick$={() => state.count--}>-</button>
      <span> {state.count} </span>
      <button onClick$={() => state.count++}>+</button>
    </div>
  );
});
```

In this example, useStore creates a reactive state that automatically updates the DOM when `state.count` changes. The `$` suffix in `onClick$` indicates that the event handler is serializable and can be lazily loaded.

#### Advanced Reactivity: Computed Values and Effects

Qwik also allows for computed values and side effects, which are reactive operations that can derive new data or perform actions in response to state changes.

```js
import { component$, useStore, useWatch$ } from '@builder.io/qwik';

export const TemperatureConverter = component$(() => {
  const state = useStore({ celsius: 0 });

  useWatch$(({ track }) => {
    track(() => state.celsius);
    const fahrenheit = (state.celsius * 9) / 5 + 32;
    console.log(`The temperature is ${fahrenheit}°F`);
  });

  return (
    <div>
      <label for="celsius">Celsius:</label>
      <input
        id="celsius"
        type="number"
        value={state.celsius}
        onInput$={(event) => (state.celsius = +event.target.value)}
      />
    </div>
  );
});
```

In the `TemperatureConverter` component, `useWatch$` is used to create a side effect that logs the temperature in Fahrenheit whenever the celsius state changes. The track function is used to specify which state should trigger the side effect.

### Reactivity Behind the Scenes

Qwik’s reactivity is powered by its intelligent diffing algorithm, which identifies the smallest possible mutation to the DOM based on state changes. This is achieved through the use of “stores” — lightweight proxies that track access and mutations to the state.

When a component is rendered, Qwik creates a snapshot of the accessed properties. When an event occurs that mutates the state, Qwik compares the new state to the snapshot and updates only the parts of the DOM that depend on the changed properties.

Code Example: Reactive Store

```js
import { component$, useStore } from '@builder.io/qwik';

export const StoreExample = component$(() => {
  const store = useStore({ name: 'Qwik' });

  return (
    <div>
      <input
        type="text"
        onInput$={(event) => (store.name = event.target.value)}
      />
      <p>Hello, {store.name}!</p>
    </div>
  );
});
```

In the `StoreExample`, `useStore` creates a reactive store with a `name` property. When the input's value changes, the name property is updated, and Qwik automatically updates the `<p>` tag to reflect the new name.

#### Snapshotting and Diffing

When a component is rendered, Qwik takes a “snapshot” of the accessed properties from the store. Later, when an event triggers a state change, Qwik compares the new state to the snapshot. It then updates the DOM, but only for those components whose tracked properties have changed.

Code Example: Snapshotting and Diffing

```js
import { component$, useStore } from '@builder.io/qwik';

export const DiffingExample = component$(() => {
  const store = useStore({ firstName: 'John', lastName: 'Doe' });

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        onInput$={(event) => (store.firstName = event.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        onInput$={(event) => (store.lastName = event.target.value)}
      />
      <p>
        Full Name: {store.firstName} {store.lastName}
      </p>
    </div>
  );
});
```

In the `DiffingExample`, each input field updates a different property in the store. Qwik's diffing algorithm ensures that typing in the "First Name" field only causes the `firstName` part of the `<p>` tag to update, and similarly for the "Last Name" field.

### Optimizing with Qwik

Qwik’s reactivity model is not just about performance; it’s also about developer experience. The framework provides a set of best practices and utilities that make it easy to write efficient, reactive code:

- Inline Handlers: By inlining event handlers, Qwik can more effectively optimize the reactivity of the application.

```js
import { component$, useStore } from '@builder.io/qwik';

export const InlineExample = component$(() => {
  const state = useStore({ active: false });

  return (
    <button onClick$={() => (state.active = !state.active)}>
      {state.active ? 'Active' : 'Inactive'}
    </button>
  );
});
```

In this example, the click handler is defined inline, allowing Qwik to serialize the handler with the button element, leading to more efficient loading and interaction.

- Lazy Loading: Event handlers and side effects are only loaded when needed, reducing the initial JavaScript payload.

```js
import { component$, useStore } from '@builder.io/qwik';

export const LazyLoadingExample = component$(() => {
  const state = useStore({ loaded: false });

  return (
    <div>
      <button
        onClick$={async () => {
          state.loaded = true;
          await import('./HeavyComponent');
        }}
      >
        Load Heavy Component
      </button>
      {state.loaded && <HeavyComponent />}
    </div>
  );
});
```

In the `LazyLoadingExample`, the `HeavyComponent` is not loaded until the user clicks the button, demonstrating how Qwik optimizes resource loading.

- **Serialization**: Qwik’s event handlers are serializable, meaning they can be stored in the DOM and rehydrated without needing the entire component code.

```js
import { component$, useStore } from '@builder.io/qwik';

export const SerializationExample = component$(() => {
  const state = useStore({ count: 0 });

  return (
    <div>
      <button onClick$={() => state.count++}>
        Increment
      </button>
      <span>Count: {state.count}</span>
    </div>
  );
});
```

In the `SerializationExample`, the `onClick$` handler is serialized with the button. When the button is clicked, Qwik knows to load only the code necessary to handle the increment action.

By applying these optimization techniques, developers can ensure that their Qwik applications are not only performant but also provide a seamless user experience. Qwik’s focus on optimization is evident in its API design, encouraging developers to write code that naturally leads to better-performing applications.

### Conclusion

Qwik’s reactive state management is a testament to the framework’s commitment to performance and scalability. By understanding and utilizing its reactivity model, developers can create web applications that are not only fast and responsive but also maintainable and enjoyable to work with.

As web development continues to evolve, frameworks like Qwik are leading the charge in redefining what’s possible. With its under-the-hood magic, Qwik is poised to become a favorite for developers who value performance and user experience above all.