---
external: false
draft: false
title: Front-End Interview Questions - JavaScript Basics
description: Exploring common javascript interview questions
date: 2023-10-28
image: '/images/js1.webp'
---

![Blogster](/images/js1.webp)

Of all the crucial aspects of an interview, knowing the commonly asked questions can significantly increase your chances of success. Allow me to share my expertise and provide you with a list of such questions.

### 1. What is Prototypal Inheritance? How does it work?

In JavaScript, prototypal inheritance is a mechanism where objects can inherit properties and methods from other objects. Every object in JavaScript has a prototype, which is another object that it can inherit properties and methods from.


When an object is created, it is assigned a prototype. If the object needs a property or a method that it doesn’t have, JavaScript will look for that property or method in the object’s prototype. If it finds the property or method in the prototype, it will use it as if it were part of the original object.

```javascript
var personPrototype = {
  sayName: function() {
    console.log("My name is " + this.name);
  }
};
```

```javascript
var person = {
  name: "John"
};
Object.setPrototypeOf(person, personPrototype);
```
We can call the “sayName” method on the “person” object like this:

```javascript
person.sayName(); // Output: "My name is John"
```

This will output “My name is John”, because the “sayName” method is defined on the “personPrototype” object, which is the prototype of the “person” object.

### 2. Explain macrotask and microtask
macrotask — task from task queue in event loop, setTimeout, setInterval, requestAnimationFrame, Web APIs move callbacks into the task queue, where they wait for the call stack to be empty before executing

**microtask** — task from microtask queue in event loop; Promises, process.nextTick, queueMicrotask, MutationObserver; used for callback functions passed to promise.then(), promise.catch() and promise.finally(), microtasks can be manually queued using queueMicrotask() function; microtasks have higher priority than standard macrotasks since the entire microtask queue must be empty before the browser will move on to a macrotask

JS engine consists of mostly of two primary components: *heap — used for memory allocation to store objects, this can be thought of as largely unstructured data store *call stack — a stack data structure used to keep track of the currently executing function, each function call pushed a stack frame onto the stack which contains information about the function and its local variables, when the function ends, it is popped off the stack, when stack is empty, there is no code currently running.

Event loop process: 1) Remove one task from the macro task queue 2) Execute code until the call stack is empty 3) execute microtask one at a time until the microtask queue is empty 4) render any changes to the DOM 5) go to step one.

### 3. What does Object.freeze() do?
Object.freeze() is a JavaScript method that is used to freeze an object, making it immutable. When you freeze an object, it prevents any changes to the object’s properties, including adding, modifying, or deleting properties.

This can be useful in situations where you want to ensure that an object’s state remains constant and cannot be accidentally or maliciously altered.

```javascript
const myObject = {
  name: 'John',
  age: 30
};
```

```javascript
// Freeze the object
Object.freeze(myObject);
// Attempting to modify properties will have no effect and will not throw an error
myObject.name = 'Alice';
myObject.age = 25;
// Attempting to add a new property will also have no effect
myObject.city = 'New York';
// Attempting to delete a property will not work
delete myObject.age;
console.log(myObject); // Output: { name: 'John', age: 30 }
```
Note: It’s important to note that Object.freeze() it only applies to the top-level properties of the object. You would need to apply Object.freeze() to nested objects or arrays individually if you want them to be frozen as well.