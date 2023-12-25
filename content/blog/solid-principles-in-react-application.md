---
external: false
draft: false
title: S.O.L.I.D Principles in React
description: Understanding and Implementing S.O.L.I.D Principles in React Applications
date: 2023-04-24
image: '/images/react-solid.webp'
thumb: '/images/thumbs/10.png'
tags: ['react', 'system design']
popular: false
---

![React](/images/react-solid.webp)

S.O.L.I.D is an acronym that represents five fundamental principles of object-oriented programming and design. These principles, when applied correctly, can help improve the maintainability, scalability, and readability of your React applications. In this article, we’ll briefly cover each principle and provide code examples to demonstrate their implementation in React.

### Single Responsibility Principle (SRP)

The Single Responsibility Principle states that a class should have only one reason to change. In React, this principle can be applied to components, ensuring that each component is focused on a single task.

```jsx
// Bad: A component that handles both user input and displaying a list of items
function UserInputAndList({ items }) {
  const [input, setInput] = useState('');

  // ...

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Good: Separate components for user input and displaying the list
function UserInput({ onInputChange }) {
  const [input, setInput] = useState('');

  return (
    <input value={input} onChange={(e) => setInput(e.target.value)} />
  );
}

function ItemList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function App() {
  // ...

  return (
    <div>
      <UserInput onInputChange={handleInputChange} />
      <ItemList items={items} />
    </div>
  );
}
```

```jsx
// Bad: A component that handles filtering and displaying items
function FilteredItemList({ items }) {
  const [filter, setFilter] = useState('');

  const filteredItems = items.filter((item) => item.name.includes(filter));

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Good: Separate components for filtering and displaying items
function Filter({ onFilterChange }) {
  const [filter, setFilter] = useState('');

  return (
    <input
      type="text"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}

function ItemList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function App() {
  const [filter, setFilter] = useState('');
  const filteredItems = items.filter((item) => item.name.includes(filter));

  return (
    <div>
      <Filter onFilterChange={setFilter} />
      <ItemList items={filteredItems} />
    </div>
  );
}
```

### 2. Open/Closed Principle (OCP)

The Open/Closed Principle states that software entities should be open for extension but closed for modification. In React, this can be achieved by creating components that are easily extensible through props or higher-order components.

```jsx
// Bad: Hardcoded styles and text
function Button() {
  return (
    <button style={{ backgroundColor: 'blue', color: 'white' }}>
      Click me
    </button>
  );
}

// Good: Customizable styles and text through props
function Button({ backgroundColor, color, text }) {
  return (
    <button style={{ backgroundColor, color }}>{text}</button>
  );
}

function App() {
  return (
    <div>
      <Button backgroundColor="blue" color="white" text="Click me" />
      <Button backgroundColor="red" color="white" text="Submit" />
    </div>
  );
}
```

```jsx
// Bad: Hardcoded list item styles
function ListItem({ children }) {
  return <li style={{ fontSize: '16px' }}>{children}</li>;
}

// Good: Customizable list item styles through props
function ListItem({ children, fontSize }) {
  return <li style={{ fontSize }}>{children}</li>;
}

function App() {
  return (
    <ul>
      <ListItem fontSize="16px">Item 1</ListItem>
      <ListItem fontSize="18px">Item 2</ListItem>
    </ul>
  );
}
```

### 3. Liskov Substitution Principle (LSP)

The Liskov Substitution Principle states that objects of a superclass should be able to be replaced with objects of a subclass without affecting the correctness of the program. In React, this principle can be applied when using component composition or inheritance.

```jsx
// Base Component
function ListItem({ children }) {
  return <li>{children}</li>;
}

// Derived Component
function ListItemWithIcon({ children, icon }) {
  return (
    <ListItem>
      <span>{icon}</span>
      {children}
    </ListItem>
  );
}

function App() {
  return (
    <ul>
      <ListItem>Item 1</ListItem>
      <ListItemWithIcon icon="🚀">Item 2 with icon</ListItemWithIcon>
    </ul>
  );
}
```

```jsx
// Base Component
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Derived Component
function UserCard({ user }) {
  return (
    <Card>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </Card>
  );
}

function App() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <div>
      <Card>
        <h2>Generic Content</h2>
        <p>Some text here...</p>
      </Card>
      <UserCard user={user} />
    </div>
  );
}
```

### 4. Interface Segregation Principle (ISP)

The Interface Segregation Principle states that classes should not be forced

to implement interfaces they do not use. In React, this principle can be applied by creating focused components that expose only the necessary props and functionality.

```jsx
// Bad: A single component with multiple responsibilities and unnecessary props
function UserForm({ user, onUpdate, onCreate, showCreateForm }) {
  return (
    <form onSubmit={showCreateForm ? () => onCreate(user) : () => onUpdate(user)}>
      {/* ... */}
      {showCreateForm ? (
        <button type="submit">Create User</button>
      ) : (
        <button type="submit">Update User</button>
      )}
    </form>
  );
}

// Good: Separate components for creating and updating users
function CreateUserForm({ user, onCreate }) {
  return (
    <form onSubmit={() => onCreate(user)}>
      {/* ... */}
      <button type="submit">Create User</button>
    </form>
  );
}

function UpdateUserForm({ user, onUpdate }) {
  return (
    <form onSubmit={() => onUpdate(user)}>
      {/* ... */}
      <button type="submit">Update User</button>
    </form>
  );
}

function App() {
  // ...

  return (
    <div>
      <CreateUserForm user={user} onCreate={createUser} />
      <UpdateUserForm user={user} onUpdate={updateUser} />
    </div>
  );
}
```

```jsx
// Bad: A single component with multiple responsibilities and unused props
function Notification({ message, type, onClose, autoClose }) {
  // ...
}

// Good: Separate components for different types of notifications
function Alert({ message, onClose }) {
  // ...
}

function Toast({ message, autoClose }) {
  // ...
}

function App() {
  return (
    <div>
      <Alert message="Error occurred" onClose={() => {}} />
      <Toast message="Action successful" autoClose={3000} />
    </div>
  );
}
```

### 5. Dependency Inversion Principle (DIP)

The Dependency Inversion Principle states that high-level modules should not depend on low-level modules, but both should depend on abstractions. In React, this principle can be applied using dependency injection, higher-order components, or context API to decouple components and their dependencies.

```jsx
// Bad: Direct dependency on a specific data fetching implementation
function UserList() {
  const users = fetchUsers(); // fetchUsers is a specific data fetching function

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Good: Dependency inversion through props
function UserList({ fetchUsers }) {
  const users = fetchUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function App() {
  // ...

  return (
    <div>
      <UserList fetchUsers={fetchUsers} />
    </div>
  );
}
```


```jsx
// Bad: Direct dependencyon a specific user service implementation
class UserService {
  // ...
  getCurrentUser() {
  // Implementation details
  }
}

function UserProfile() {
  const userService = new UserService();
  const user = userService.getCurrentUser();

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Good: Dependency inversion through context or props
const UserContext = React.createContext();

class UserService {
// ...
  getCurrentUser() {
  // Implementation details
  }
}

function UserProfile({ userService }) {
const user = userService.getCurrentUser();

return (
  <div>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
);
}

function App() {
const userService = new UserService();

return (
  <UserContext.Provider value={userService}>
    <UserProfile />
  </UserContext.Provider>
);
}

// Alternatively, using props
function App() {
  const userService = new UserService();

  return <UserProfile userService={userService} />;
}
```

### Conclusion

Applying the S.O.L.I.D principles in your React applications can help you write cleaner, more maintainable, and scalable code. By understanding and implementing these principles through practical examples, you can create a strong foundation for your application’s architecture and set your project up for success.
