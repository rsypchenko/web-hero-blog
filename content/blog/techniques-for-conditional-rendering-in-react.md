---
external: false
draft: false
title: Techniques for Conditional Rendering in React
description: Explore common techniques for conditional rendering in react applicaiton
date: 2023-12-18
image: '/images/react-conditional.webp'
thumb: '/images/thumbs/10.png'
tags: ['react', 'performance']
popular: false
---

![React.js](/images/react-conditional.webp)

Conditional rendering is a crucial concept in React that enables us to show different UI elements based on specific conditions. It is an essential tool for building interactive and responsive applications that can adjust to user actions and data changes. In this article, we will discuss the different techniques used in conditional rendering, how they work, and the best practices to create effective and interactive user interfaces.

### If-else Statement

If-else statements are control flow structures that allow us to execute different codes based on whether a condition tests true or false. They can be used to render components based on the result. Let’s look at how this works:

```jsx
if ( condition ) {
  The task to be done if the condition tests true 
} else {
  Tasks to be done when the condition is tested false 
} 
```

In the scenario we presented earlier, we need the navigation bar to display an additional button when the user logs in, but remain unchanged when the user logs out. To achieve this, we will create a JSON object that will contain the user information, including their login status.

```json
{
"Users": [
  {
    "Name": "Yemi",
    "Age": 23,
    "cartProducts": ["Tote bag", "Sports Cap", "Trainers", "Joggers"],
    "Status": "loggedIn"
  },
  {
    "Name": "John",
    "Age": 30,
    "cartProducts": ["Laptop", "Mouse", "Keyboard"],
    "Status": "loggedIn"
  },
  {
    "Name": "Alice",
    "Age": 25,
    "cartProducts": ["Dress", "Shoes", "Bag"],
    "Status": "loggedOut"
  }]
}
```

Next, we’ll create a logic that checks the status of the user and renders the navbar based on the result of the condition:

```jsx
const user = users[0];
if (user.status === "loggedIn") {
  return <LoggedInNavbar />;
} else {
  return <LoggedOutNavbar />;
}
```

Now, let’s look at a breakdown of how we made use of the if-else statement to render elements:

- The if statement takes a condition as its argument. In this case, the condition is `isLoggedIn`.
- If the condition is true, the code inside the if statement is executed, which returns a View Cart button element in the navbar.
- If the condition is false, the code inside the else statement is executed, and this renders the navbar without the extra button.

One of the most commonly used methods in React for rendering elements based on conditions is conditional rendering. However, it can make the code more verbose, especially when dealing with simple conditions. This is where the ternary operator comes in handy, as it provides a more concise alternative.

Ternary Operator

A ternary operator is also known as a conditional operator. It’s a simpler way of writing an if-else statement.

```jsx
return ( 
  <div>{user.status === "loggedIn" 
    ? <LoggedInNavbar /> : <LoggedOutNavbar />}
  </div>
)
```

As before, the component is rendered if the condition is true, and not rendered if the condition is false.

When to use the ternary operator?

The ternary operator is best suited for simple conditional statements with two outcomes. However, for more complex conditional logic involving multiple conditions or nested statements, an if-else statement may be more appropriate.

### Logical AND Operator

An operator is a logical operator that evaluates multiple conditions or expressions. It tests as true only when all the conditions are true.

Assuming that only registered sellers who are logged in can access the navbar with a dashboard button.

```jsx
const users = [
  {
    name: "Yemi",
    age: 23,
    cartProducts: ["Tote bag", "Sports Cap", "Trainers", "Joggers"],
    status: "loggedIn",
    userClass: "Admin",
  },
];
const user = users[0];
if (user.status === "loggedIn" && user.userClass === "Admin") {
  return <AdminNavbar />;
} else {
  return <LoggedOutNavbar />;
}
```

This code checks if the user who is currently logged in is an admin or not. If the user is an admin, they should see the admin-specific navbar. Otherwise, if the user is not logged in or not an admin, the code inside the else block is executed, which returns the standard navbar.

### Switch Statements

Consider a scenario where we need to handle multiple conditional expressions simultaneously. For example, while building an app with different user tiers, we may need to render different pages for each tier. If we use an if statement to render each page, it could get complicated and voluminous. This is where switch statements come in handy. Switch statements are constructs that help handle multiple conditional cases in a more organized way. They provide a cleaner syntax when we have a variable to check against multiple possible values.

Conditional rendering is a technique used to render different components or content based on certain conditions. Switch statements are particularly useful when we want to determine which component or content to render based on a specific variable or prop in different cases. Here's an example of how switch statements work:

```jsx
switch (user.userClass) {
case  "Admin":
return  <AdminNavbar  />;
case  "Customer":
return  <CustomerNavbar  />; // Assuming a customer should see the CustomerNavBar_
case  "Guest":
return  <GuestNavbar  />; // Assuming a guest should see the GuestNavbar_
default:
return  <LoggedOutNavbar  />;
}
```

Switch statements can make our code more readable and maintainable when dealing with multiple conditional cases. They are especially useful when we have a variable that can take on distinct values, and we want to handle each case differently.

### Higher-order components and conditional rendering

Conditional rendering is among the most popular use cases for Higher Order Components (HOCs). HOCs can take a component and return a different one based on a condition. For instance, we can use an HOC to show or hide a component based on whether a user is logged in or not.

Here is an example of how to use a HOC to render a component conditionally:

```jsx
import React from 'react';

const withLoginCheck = (WrappedComponent) => {
  return (props) => {
    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    } else {
      return <p>Please log in to access this content.</p>;
    }
  };
};

const MyComponent = (props) => {
  return <div>Hello, {props.name}!</div>;
};

const App = () => {
  return (
    <div>
      <withLoginCheck(MyComponent) name="John Doe" />
    </div>
  );
};
```

In this example, the `withLoginCheck` HOC is used to conditionally render the MyComponent component. If the `isLoggedIn` variable is true, the `MyComponent` component is rendered. Otherwise, a message is displayed telling the user to log in.

Benefits of using HOCs for conditional rendering

There are several benefits to using HOCs for conditional rendering:

- Reusability. HOCs can be reused in different parts of an application, which can save time and code.
- Maintainability. HOCs can make code more maintainable by encapsulating conditional rendering logic in a single place.
- Testability. HOCs can be easily tested, which can help to improve the code quality.

### Element Variables

Element variables provide a useful technique for conditionally rendering JSX elements in React. They enable us to store JSX elements in variables and then render those variables if certain conditions are met. This approach can simplify our code and enhance readability, particularly when handling complex conditional rendering scenarios. For example, suppose we need to display different pages depending on the user's age:

```jsx
const user = { age: 25 };
const pageContent = user.age >= 18 ? (
  <div>
    <h1>Welcome, Adult User!</h1>
    <p>You have access to all content.</p>
  </div>
) : (
<div>
<h1>Welcome, Young User!</h1>
<p>You have access to age-appropriate content.</p>
</div>
);
return <div>{pageContent}</div>;
```

### Handling Loading State when Rendering Components

"Loading state" is a term used in React to indicate that an application or website is currently processing or fetching data. To handle loading state, one common method is "conditional rendering". This involves displaying different UI elements dynamically based on the current state of the data loading process. This approach enhances user experience by providing feedback at every application stage.

For instance, we might conditionally render a loading indicator while data is fetching and then switch to rendering the actual data once it’s available. This ensures that users see relevant information at the appropriate time.

Here’s an example of how to use conditional rendering to display a loading indicator while data is fetching:

```jsx
import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
    setData(json);
    setIsLoading(false);
  });
  }, []);
  return (
    <div>
      {isLoading ? <p>Loading...</p> : data.map((post) => <p key={post.id}>{post.title}</p>)}
    </div>
  );
};
```

### Component State for Dynamic Rendering

Component state is mutable data stored in a component that allows us to store and manage information specific to that component. It’s managed within the component and can be updated using the setState() method. When the state changes, React re-renders the component and its children, allowing us to update the UI based on the new state value dynamically. For instance:

```jsx
import React, { useState } from 'react';

const Counter = () => {
const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### Props for Dynamic Rendering

Props are arguments consisting of data passed down from parent components to child components. They provide a way to communicate data and control the behavior of child components from the parent. When the parent component updates its props, the child component receives the new data and re-renders accordingly.

For example:

```jsx
import React from 'react';

const Greeting = ({ name }) => {
  return (<p>Hello, {name}!</p>);
};

const App = () => {
  return (
    <div>
      <Greeting name="John Doe" />
      <Greeting name="Jane Doe" />
    </div>
  );
};
```

Now, just like the other method we mentioned, the changes in component state or props can trigger conditional rendering, dynamically showing or hiding specific elements based on the updated data. These techniques allow us to build UI components that adapt and change based on user interactions, data changes, and the flow of information within the application. For example:

```jsx
import React, { useState } from 'react';

const UserStatus = ({ isAdmin }) => {
  let statusElement;
  if (isAdmin) {
    statusElement = <p>Administrator</p>;
  } else {
    statusElement = <p>Customer</p>;
  }
  return (
    <div>
      {statusElement}
    </div>
  );
};
```

### Best Practices for Conditional Rendering

As we mentioned earlier, conditional rendering is a fundamental concept in React that allows us to display different UI elements based on specific 
conditions dynamically. To ensure the effective and efficient use of conditional rendering, there are best practices to follow, including:

- Keep conditional rendering logic clear and easy to understand. Avoid complex nested conditions or overly intricate logical expressions.
- Leverage component state and props to control conditional rendering. Stateful components can manage internal state changes, while props can be used for data-driven rendering based on external sources.
- Consider extracting complex conditional logic into separate functions or components. This enhances code reusability and maintainability.
- Implement error handling mechanisms to gracefully handle unexpected situations and provide informative error messages to users.
- Strike a balance between performance optimization and code readability. Use conditional rendering effectively, but don’t sacrifice clarity for the sake of optimization.
- Thoroughly test conditional rendering logic to ensure it behaves as expected under various conditions and edge cases.

### Conclusion

In this article, we discussed several conditional rendering techniques in React, including if-else statements, ternary operators, switch statements, higher-order components, and element variables. We have also discussed effective ways to handle errors and the best practices for using conditional rendering efficiently. By understanding and implementing these techniques, we can build efficient React applications that are flexible, responsive, and user-friendly.
