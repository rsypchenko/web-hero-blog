---
external: false
draft: false
title: You Don't Know JavaScript - Exploring Core Principles
description: Exploring JavaScript code principles every developer should understand
date: 2024-01-20
image: '/images/javascript-core.webp'
thumb: '/images/thumbs/10.png'
tags: ['javascript']
popular: true
---

![JavaScript](/images/javascript-core.webp)

As a Senior Software Developer, I meet a lot of developers who don't know these basic JavaScript core principles, and in this article, I will share some examples and explain.
So, let's jump to the code examples!

### [] is equal ![]

Array is equal not array:

```js
[] == ![]; // -> true
```
💡 Explanation:
The abstract equality operator converts both sides to numbers to compare them, and both sides become the number 0 for different reasons. Arrays are truthy, so on the right, the opposite of a truthy value is false, which is then coerced to 0. On the left, however, an empty array is coerced to a number without becoming a boolean first, and empty arrays are coerced to 0, despite being truthy.

Here is how this expression simplifies:

```js
+[] == +![];
0 == +false;
0 == 0;
true;
```

### Double dot

Let's try to coerce a number to a string:

```js
27.toString() // > Uncaught SyntaxError: Invalid or unexpected token
```

```js
27..toString(); // -> '27'
```

But why doesn't first example work?

💡 Explanation:
It's just a language grammar limitation.

The . character presents an ambiguity. It can be understood to be the member operator, or a decimal, depending on its placement.

The specification's interpretation of the . character in that particular position is that it will be a decimal. This is defined by the numeric literal syntax of ECMAScript.

You must always use parenthesis or an addition dot to make such expression valid.

```js
(27).toString(); // -> '27'
// or
27..toString(); // -> '27'
```

### Tricky arrow functions

Consider the example below:

```js
let f = () => 10;
f(); // -> 10
```

Okay, fine, but what about this:

```js
let f = () => {};
f(); // -> undefined
```

💡 Explanation:
You might expect {} instead of undefined. This is because the curly braces are part of the syntax of the arrow functions, so f will return undefined. It is however possible to return the {} object directly from an arrow function, by enclosing the return value with brackets.

```js
let f = () => ({});
f(); // -> {}
```

### Insidious try..catch

What will this expression return? 2 or 3?

```js
(() => {
  try {
    return 2;
  } finally {
    return 3;
  }
})();
```

The answer is 3. Surprised?

💡 Explanation:
[13.15 The try Statement](https://ecma-international.org/publications-and-standards/standards/ecma-262/#sec-try-statement)

### Dots and spreading

Interesting examples could be composed with spreading of arrays. Consider this:

```js
[...[..."..."]].length; // -> 3
```

💡 Explanation:
Why 3? When we use the spread operator, the @@iterator method is called, and the returned iterator is used to obtain the values to be iterated. The default iterator for string spreads a string into characters. After spreading, we pack these characters into an array. Then we spread this array again and pack it back to an array.

A '...' string consists with three . characters, so the length of resulting array is 3.

Now, step-by-step:

```js
[...'...']             // -> [ '.', '.', '.' ]
[...[...'...']]        // -> [ '.', '.', '.' ]
[...[...'...']].length // -> 3
```

```js
[...'...']                 // -> [ '.', '.', '.' ]
[...[...'...']]            // -> [ '.', '.', '.' ]
[...[...[...'...']]]       // -> [ '.', '.', '.' ]
[...[...[...[...'...']]]]  // -> [ '.', '.', '.' ]
// and so on …
```

### Call call call

```js
console.log.call.call.call.call.call.apply(a => a, [1, 2]);
```

Explanation:
Attention, it could break your mind! Try to reproduce this code in your head: we're applying the call method using the apply method. Read more:

[19.2.3.3 Function.prototype.call(thisArg, ...args)](https://ecma-international.org/publications-and-standards/standards/ecma-262/#sec-function.prototype.call)
[**19.2.3.1 ** Function.prototype.apply(thisArg, argArray)](https://ecma-international.org/publications-and-standards/standards/ecma-262/#sec-function.prototype.apply)

### Funny math

Often the results of arithmetic operations in JavaScript might be quite unexpected. Consider these examples:

```js
 3  - 1  // -> 2
 3  + 1  // -> 4
'3' - 1  // -> 2
'3' + 1  // -> '31'

'' + '' // -> ''
[] + [] // -> ''
{} + [] // -> 0
[] + {} // -> '[object Object]'
{} + {} // -> '[object Object][object Object]'

'222' - -'111' // -> 333

[4] * [4]       // -> 16
[] * []         // -> 0
[4, 4] * [4, 4] // NaN
```

💡 Explanation:
What's happening in the first four examples? Here's a small table to understand addition in JavaScript:

```js
Number  + Number  -> addition
Boolean + Number  -> addition
Boolean + Boolean -> addition
Number  + String  -> concatenation
String  + Boolean -> concatenation
String  + String  -> concatenation
```

What about other examples? A ToPrimitive and ToString methods are being implicitly called for [] and {} before addition. Read more about evaluation process in the specification:

[12.8.3 The Addition Operator (+)](https://ecma-international.org/publications-and-standards/standards/ecma-262/#sec-addition-operator-plus)
[7.1.1 ToPrimitive(input [,PreferredType])](https://ecma-international.org/publications-and-standards/standards/ecma-262/#sec-toprimitive)
[7.1.12 ToString(argument)](https://ecma-international.org/publications-and-standards/standards/ecma-262/#sec-tostring)

Notably, {} + [] here is the exception. The reason why it differs from [] + {} is that, without parenthesis, it is interpreted as a code block and then a unary +, converting [] into a number. It sees the following:

```js
{
  // a code block here
}
+[]; // -> 0
```

To get the same output as [] + {} we can wrap it in parenthesis.

```js
({} + []); // -> [object Object]
```

### Comparison of three numbers

```js
1 < 2 < 3; // -> true
3 > 2 > 1; // -> false
```

💡 Explanation:
Why does this work that way? Well, the problem is in the first part of an expression. Here's how it works:

```js
1 < 2 < 3; // 1 < 2 -> true
true < 3; // true -> 1
1 < 3; // -> true

3 > 2 > 1; // 3 > 2 -> true
true > 1; // true -> 1
1 > 1; // -> false
```

We can fix this with Greater than or equal operator (>=):

```js
3 > 2 >= 1; // true
```

[12.10 Relational Operators](https://ecma-international.org/publications-and-standards/standards/ecma-262/#sec-relational-operators)

### Object.is() and === weird cases

Object.is() determines if two values have the same value or not. It works similar to the === operator but there are a few weird cases:

```js
Object.is(NaN, NaN); // -> true
NaN === NaN; // -> false

Object.is(-0, 0); // -> false
-0 === 0; // -> true

Object.is(NaN, 0 / 0); // -> true
NaN === 0 / 0; // -> false
```

💡 Explanation:
In JavaScript lingo, NaN and NaN are the same value but they're not strictly equal. NaN === NaN being false is apparently due to historical reasons so it would probably be better to accept it as it is.

Similarly, -0 and 0 are strictly equal, but they're not the same value.

For more details about NaN === NaN, see the above case.

[Here are the TC39 specs about Object.is](https://tc39.es/ecma262/#sec-object.is)
[Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) on MDN


### [] is truthy, but not true

An array is a truthy value, however, it's not equal to true.

```js
!![]       // -> true
[] == true // -> false
```

💡 Explanation:
Here are links to the corresponding sections in the ECMA-262 specification:

[12.5.9 Logical NOT Operator (!)](https://ecma-international.org/publications-and-standards/standards/ecma-262/#sec-logical-not-operator)
[7.2.15 Abstract Equality Comparison](https://262.ecma-international.org/11.0/#sec-abstract-equality-comparison)

### null is falsy, but not false

Despite the fact that null is a falsy value, it's not equal to false.

```js
!!null; // -> false
null == false; // -> false
```

At the same time, other falsy values, like 0 or '' are equal to false.

```js
0 == false; // -> true
"" == false; // -> true
```

💡 Explanation:
The explanation is the same as for previous example. Here's the corresponding link:

[7.2.15 Abstract Equality Comparison](https://262.ecma-international.org/11.0/#sec-abstract-equality-comparison)

### Conclusion

In conclusion, this article has explored some of the intriguing and often overlooked aspects of JavaScript's core principles.
We delved into the peculiarities of JavaScript arithmetic, where operations on different data types can yield unexpected results.

Overall, this article emphasizes the importance of mastering JavaScript's core principles for any developer working in the language. A thorough grasp of these concepts is essential not only for writing robust and efficient code but also for debugging and maintaining existing projects. As the language continues to evolve, staying updated with these fundamental principles remains a key part of being an effective JavaScript developer.
