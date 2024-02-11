---
external: false
draft: false
title: How To Use Shadcn UI with Next.js
description: Shadcn is a collection of React components for building web applications with Next.js
date: 2024-02-10
image: '/images/shadcn-ui-with-next.webp'
thumb: '/images/thumbs/10.png'
tags: ['css', 'next.js']
popular: false
---

![Shadcn UI](/images/shadcn-ui-with-next.webp)

Shadcn is a collection of React components for building web applications with Next.js. The components are designed to be customizable and accessible, allowing for quick and easy creation of stylish and functional user interfaces.

If you want to build modern, stylish, and accessible web applications with Next.js, then Shadcn is an excellent option.
In this guide, you will learn how to install and use Shadcn in your Next.js projects. You will also learn how to style elements and customize Shadcn components.

## What is Shadcn?

![Shadcn](/images/shadcn.webp)

Shadcn UI is not specifically a component library or UI framework. The documentation describes it as “a compilation of reusable components that can be easily copied and pasted into our applications.”

Shadcn is built on Tailwind CSS and Radix UI. It is compatible with Next.js, Gatsby, Remix, Astro, Laravel, and Vite. There’s a [manual integration guide](https://ui.shadcn.com/docs/installation/manual) that can help you incorporate it with other technologies.

## How to Install Next.js and Shadcn

I’ll follow the instructions in the Shadcn docs, so you can follow along if you like.

First, you have to choose what framework you are currently using.

![Shadcn Projects](/images/shadcn1.webp)

Now, you need to install and configure a new Next.js project.

### Next.js

To install Next.js with npm:

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

To install Next.js with bun:

```bash
bunx --bun create-next-app@latest my-app --typescript --tailwind --eslint
```

### How to Install Shadcn

Before continuing, remember to go into the `my-app` directory in your terminal:

```bash
cd my-app
```

To initialize Shadcn with npm:

```bash
npx shadcn-ui@latest init
```

To initialize Shadcn with yarn:

```bash
npx shadcn-ui@latest init
```

To initialize Shadcn with bun:

```bash
bunx --bun shadcn-ui@latest init
```

You can see the questions and my responses in the code above.

For the first question, there are two options, `default` and New York. I chose the `"New York"` style.

For the second question, there are five options `Slate`, `Gray`, `Zinc`, `Neutral`, `Stone`. I chose Slate because I like minimalist black-and-white styling.

For the third question, I there are two options Yes and No. I chose yes, as I prefer to have CSS variables enabled for styling (although we won't be using this in this article).

You can read more about the style options, base options, and this configuration setup [here](https://ui.shadcn.com/docs/components-json).

And with that, you’ve set up a new Next.js 14 project with Shadcn.

## How to Use Shadcn in Next.js

First, let’s remove all the boilerplate code from the my-app project's page.tsx file. (You only need to remove the boilerplate code from my-app/page.tsx.)

After removing all the boilerplate code from the page.tsx file inside the app directory, I'll add a simple hello world text.

Here’s the updated page.tsx code:

```jsx
export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
    </>
  );
```

### How to Style a Button the Hard Way and the Shadcn Way

Before we add our buttons, though, we have to learn how to add a component from Shadcn into our project. Here’s how to do that:

1. Go to the [Shadcn docs](https://ui.shadcn.com/docs).
2. Click on whatever component you want to use.
3. Then you’ll see the command you should run to add that component to your project.
4. Finally, import that component into your project and start using it.

To add the Button component from Shadcn, follow these steps:

1. Go to the [Button component page](https://ui.shadcn.com/docs/components/button).
2. Then run this command in your terminal: `npx shadcn-ui@latest add button`. Note: This command is for npm – if you use a different package manager, you'll need to modify the command slightly.
3. Finally, import the button component in the file where you want to use it.

Now we’ll see examples of adding a button in two different ways: using Tailwind CSS, and using Shadcn.

### Styling a Button the Hard Way (Using Tailwind)

```jsx
export default function Home() {
  return (
    <>
      <button className="p-2 bg-orange-400">Click me</button>
    </>
  );
}
```

I have created a button with an orange background having a padding of 2 units. You can see that it looks ugly and also doesn’t have any hover effects by default.

### Styling a Button the Shadcn Way

```jsx
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Button variant="outline">Button</Button>
    </>
  );
}
```

To use the Shadcn button, first import the Button component to the file where you want to use it – you don't need to add any styling to it (You can customize it, which you'll learn how to do in the next section). By default it looks good and it has hover effects. So just import the component and then you can use it.

Let’s take a look at `button.tsx` source code to check how many variants of buttons you can create.

```jsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button, buttonVariants };
```

## How to Customize Shadcn Components

Remember that after installing Shadcn, the `components` directory was empty. But after adding the `Button` component, you can see a directory inside the components directory. And inside the ui directory, you'll have the Button.tsx file, which is the code for the Button component.

If you open the `Button.tsx` file, you'll see that there are multiple variants of the `Button` component like default, destructive, outline, secondary, ghost, and link. There's also a default size, and other sizes to choose from:

```jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

Contents of the `Button.tsx` file

Shadcn components offer customization options for elements, allowing the removal of unused variants and the addition of new ones.

For example, say that you want to add the custom button we coded first as a Shadcn Button component variant. You can do that like this:

```jsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        myButton: "p-2 bg-orange-400",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button, buttonVariants };
```

Notice that the code now includes a new variant named, and I simply pasted in the styling for the custom button from our earlier example. And that's it! Now you have your own custom Shadcn Button component variant.

Here’s how you can use the custom `myButton` variant in your project:

```jsx
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <Button variant="outline" size="sm">
        sm button
      </Button>
      <Button variant="destructive" size="lg">
        large button
      </Button>
      <Button variant="ghost" size="lg">
        ghost button
      </Button>
      <Button variant="link" size="lg">
        link button
      </Button>
      <Button variant="myButton">My Button</Button>
    </div>
  );
}
```

Note that I’ve added more variants of the Button component just to show you that you can easily create multiple types of buttons with different sizes.

The last button in the example above has the variant myButton, which is the custom variant you added to the Button.tsx file. But that just affects the styling, and you can add your own custom size if you'd like.

## Conclusion

This guide provides you with the necessary steps to integrate Shadcn into your Next.js projects. You have the option to use Shadcn's extensive component library as is, or you can customize them as per your preferences. With the potential to create your next app, feel free to begin building it!
