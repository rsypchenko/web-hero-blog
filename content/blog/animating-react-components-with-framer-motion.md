---
external: false
draft: false
title: Animating React Components with Framer Motion
description: Framer Motion is a popular animation library for React that makes it easy to create complex animations and interactions
date: 2023-04-22
image: '/images/react-motion.webp'
thumb: '/images/thumbs/10.png'
tags: ['react', 'animation']
popular: true
---

![Motion](/images/react-motion.webp)

Framer Motion is a popular animation library for React that makes it easy to create complex animations and interactions. In this article, we’ll explore how to animate React components using Framer Motion with plenty of code examples.

### 1. Installation and Setup

First, install Framer Motion using npm or yarn:

```bash
npm install framer-motion
```

or

```bash
yarn add framer-motion
```

### 2. Basic Animations

To create basic animations, import the motion object from Framer Motion and use it to create a motion component.

```jsx
import { motion } from 'framer-motion';

const AnimatedBox = () => {
  return <motion.div animate={{ scale: 1.5 }}>Hello, World!</motion.div>;
};
```

In this example, we’re animating the scale of a `<div>` element.

### 3. Animating on Mount and Unmount

Framer Motion makes it easy to animate components when they mount or unmount. Use the `initial`, `animate`, and `exit` props to define these animations:

```jsx
import { motion } from 'framer-motion';

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatedText = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInOut}
    >
      Fade in and out
    </motion.div>
  );
};
```

### 4. Animating Lists and Arrays

To animate list items or arrays, use the AnimatePresence and motion components:

```jsx
import { motion, AnimatePresence } from 'framer-motion';

const listItem = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const AnimatedList = ({ items }) => {
  return (
    <ul>
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.li
            key={item.id}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={listItem}
          >
            {item.text}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};
```

### 5. Gesture-Based Interactions

Framer Motion enables gesture-based animations, such as drag and hover:

```jsx
import { motion } from 'framer-motion';

const DraggableBox = () => {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 50 }}
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
      }}
    />
  );
};

const HoverableBox = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'red',
      }}
    />
  );
};
```

These examples illustrate how Framer Motion can help you create animations and interactions in your React components with just a few lines of code.

### 6. Orchestrate Animations with Framer Motion

Framer Motion allows you to orchestrate animations by controlling the order and duration of individual animations.

```jsx
import { motion } from 'framer-motion';

const parent = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const StaggeredAnimation = () => {
  return (
    <motion.div variants={parent} initial="initial" animate="animate">
      <motion.div variants={child}>Item 1</motion.div>
      <motion.div variants={child}>Item 2</motion.div>
      <motion.div variants={child}>Item 3</motion.div>
    </motion.div>
  );
};
```

In this example, we’re using the `staggerChildren` property to stagger the animation of the child elements. The `duration` property allows you to control the animation duration.

### 7. Animating Routes in React

To animate route transitions, use Framer Motion with React Router and `AnimatePresence`:

```jsx
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PageOne = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    Page One
  </motion.div>
);

const PageTwo = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    Page Two
  </motion.div>
);

const App = () => {
  return (
    <Router>
      <AnimatePresence>
        <Switch>
          <Route path="/" exact component={PageOne} />
          <Route path="/page-two" component={PageTwo} />
        </Switch>
      </AnimatePresence>
    </Router>
  );
};
```

This example demonstrates how to create route transition animations using Framer Motion and React Router.

These code examples show the versatility of Framer Motion and how it can be used to create engaging animations and interactions in your React applications.

### 8. Custom Animation Controls with Framer Motion

Framer Motion provides a `useAnimation` hook that allows you to create custom animation controls for your components.

```jsx
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const boxVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ControlledBox = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return <motion.div variants={boxVariants} initial="hidden" animate={controls} />;
};
```

In this example, we use the `useAnimation` hook to create a `controls` object, which we then pass to the animate prop of the `motion.div` component. The `start` method triggers the animation when the component mounts.

### 9. Keyframe Animations with Framer Motion

Framer Motion supports keyframe animations, allowing you to create complex animations with multiple stages.

```jsx
import { motion } from 'framer-motion';

const keyframeVariants = {
  initial: { opacity: 0, scale: 1 },
  animate: {
    opacity: [0, 1, 1, 0],
    scale: [1, 1.5, 0.5, 1],
    transition: { duration: 2, times: [0, 0.2, 0.8, 1] },
  },
};

const KeyframeAnimation = () => {
  return (
    <motion.div
      variants={keyframeVariants}
      initial="initial"
      animate="animate"
      style={{ backgroundColor: 'purple', width: 100, height: 100 }}
    />
  );
};
```

In this example, we’re creating a keyframe animation that alters the opacity and scale of the element. The `times` array in the `transition` object defines the timing for each keyframe.

### 10. Animate Shared Layouts with Framer Motion

Framer Motion provides a way to animate shared layouts, which is useful when the component structure changes during animations.

```jsx
import { motion, AnimateSharedLayout } from 'framer-motion';

const listItems = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
];

const SharedLayoutExample = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <AnimateSharedLayout>
      <motion.ul layout>
        {listItems.map((item) => (
          <motion.li
            layout
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            style={{ fontWeight: item.id === selectedId ? 'bold' : 'normal' }}
          >
            {item.text}
          </motion.li>
        ))}
      </motion.ul>
    </AnimateSharedLayout>
  );
};
```

In this example, we use `AnimateSharedLayout` and the `layout` prop on `motion` components to create a smooth animation when the font weight of a list item changes.

These additional examples showcase more advanced features and use cases for Framer Motion, demonstrating its power and flexibility for creating animations in React applications.

### 11. Animation Callbacks and Event Handling with Framer Motion

Framer Motion provides callback functions and event handlers that allow you to respond to different stages of an animation. This can be useful for triggering other animations or updating your component’s state based on the animation progress.

```jsx
import { motion } from 'framer-motion';

const spinVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: { duration: 2, repeat: Infinity },
  },
};

const Spinner = () => {
  const handleAnimationStart = () => {
    console.log('Animation started');
  };

  const handleAnimationComplete = () => {
    console.log('Animation completed');
  };

  return (
    <motion.div
      variants={spinVariants}
      initial="initial"
      animate="animate"
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      style={{ backgroundColor: 'green', width: 100, height: 100 }}
    />
  );
};
```

### 12. Spring Animations with Framer Motion

Framer Motion supports spring animations, which can add a natural and smooth feel to your animations. Spring animations can be especially useful for physics-based interactions like dragging and swiping.

```jsx
import { motion } from 'framer-motion';

const scaleSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
};

const SpringAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      transition={scaleSpring}
      style={{ backgroundColor: 'orange', width: 100, height: 100 }}
    />
  );
};
```

In this example, we’re using a spring animation to scale an element when it’s hovered. The `stiffness` and `damping` properties allow you to customize the spring's behavior, controlling how quickly it returns to its original position and how much it oscillates.

By exploring these various animation techniques and features provided by Framer Motion, you can create engaging and dynamic experiences for users of your React applications.

### 13. Framer Motion with SVG Animations

Framer Motion can be used to animate SVG elements, allowing you to create visually striking animations and transitions. Here’s an example of how to animate an SVG path using Framer Motion:

```jsx
import { motion } from 'framer-motion';

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2 },
  },
};

const SvgAnimation = () => {
  return (
    <motion.svg width="200" height="100" viewBox="0 0 200 100">
      <motion.path
        d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
        stroke="black"
        strokeWidth="3"
        fill="none"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
    </motion.svg>
  );
};
```

In this example, we’re using an SVG path with a cubic Bezier curve. The `pathVariants` define the initial and animate states, and Framer Motion animates the path length and opacity accordingly.

Animating SVG elements with Framer Motion opens up a vast array of possibilities for creating visually appealing and interactive designs in your React applications.

### 14. Drag and Swipe Interactions with Framer Motion

Framer Motion makes it simple to create interactive drag and swipe interactions in your React applications. This can be particularly useful for creating carousels, sliders, or custom gestures.

```jsx
import { motion } from 'framer-motion';

const DragExample = () => {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      style={{ backgroundColor: 'blue', width: 100, height: 100 }}
    />
  );
};
```

In this example, we’re creating a draggable element with constraints on its movement. The drag prop enables dragging along the specified axis, while `dragConstraints` limits the range of the draggable element.

### 15. Parallax Scrolling Effects with Framer Motion

Framer Motion can be used to create engaging parallax scrolling effects in your React applications, adding depth and visual interest to your designs.

```jsx
import { useEffect } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

const ParallaxExample = () => {
  const { scrollY } = useViewportScroll();
  const translateY = useTransform(scrollY, [0, 1000], [0, -500]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        height: 500,
        backgroundColor: 'pink',
        y: translateY,
      }}
    />
  );
};
```

### Conclusion
In conclusion, Framer Motion is a powerful and versatile library for creating animations in React applications. It provides an extensive set of features and techniques that allow you to create dynamic and engaging user experiences. In this article, we explored various examples and use cases, such as animating React components, working with CSS Grid and SVG animations, spring animations, and more.

As you dive deeper into Framer Motion, you’ll discover even more ways to enhance your React applications with smooth and interactive animations. By mastering these techniques and best practices, you can create captivating and immersive experiences for your users, making your applications stand out in the competitive web development landscape.
