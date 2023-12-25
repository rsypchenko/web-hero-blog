---
external: false
draft: false
title: JavaScript 2023 Updates You Probably Missed
description: Exploring new JavaScript features 2023 
date: 2023-12-10
image: '/images/js2023.webp'
thumb: '/images/thumbs/10.png'
tags: ['javascript']
popular: false
---

![JavaScript](/images/js2023.webp)

In this article, I will delve into some of the latest JavaScript features that you might have overlooked in the 2023 updates.

### .groupBy()

The `Object.groupBy()` static method groups the elements of a given iterable according to the string values returned by a provided callback function. The returned object has separate properties for each group, containing arrays with the elements in the group.

This method should be used when strings can represent group names. If you need to group elements using a key that is some arbitrary value, use Map.groupBy() instead.

```js
const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 },
];
```

```js
const result = Object.groupBy(inventory, ({ type }) => type);

/* Result is:
{
  vegetables: [
    { name: 'asparagus', type: 'vegetables', quantity: 5 },
  ],
  fruit: [
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  meat: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
}
*/
```

### .toSorted()
The `toSorted()` method of Array instances is the copying version of the `sort()` method. It returns a new array with the elements sorted in ascending order.

```js
const months = ["Mar", "Jan", "Feb", "Dec"];
const sortedMonths = months.toSorted();
console.log(sortedMonths); // ['Dec', 'Feb', 'Jan', 'Mar']
console.log(months); // ['Mar', 'Jan', 'Feb', 'Dec']

const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => a - b);
console.log(sortedValues); // [1, 2, 10, 21]
console.log(values); // [1, 10, 21, 2]
```

### The Dialog element

The `<dialog>` The HTML element represents a modal or non-modal dialog box or another interactive component, such as a dismissible alert, inspector, or subwindow.

The HTML `<dialog>` element is used to create both modal and non-modal dialog boxes. Modal dialog boxes interrupt interaction with the rest of the page being inert, while non-modal dialog boxes allow interaction with the rest of the page.

JavaScript should be used to display the `<dialog>` element. Use the `.showModal()` method to display a modal dialog and the `.show()` method to display a non-modal dialog. The dialog box can be closed using the `.close()` method or using the dialog method when submitting a `<form>` that is nested within the `<dialog>` element. Modal dialogs can also be closed by pressing the Esc key.

```js
<dialog open>
  <p>Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

```js
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
```

We can style the backdrop of the dialog by using the `::backdrop` pseudo-element.

```css
::backdrop {
  background-image: linear-gradient(
    45deg,
    magenta,
    rebeccapurple,
    dodgerblue,
    green
  );
  opacity: 0.75;
}
```

### The generic search element

The `<search>` HTML element is a container representing the parts of the document or application with form controls or other content related to performing a search or filtering operation. The `<search>` element semantically identifies the purpose of the element's contents as having search or filtering capabilities. The search or filtering functionality can be for the website or application, the current web page or document, or the entire Internet or subsection thereof.

```html
<search>
  <label>
    Find and filter your query
    <input type="search" id="query" />
  </label>
  <label>
    <input type="checkbox" id="exact-only" />
    Exact matches only
  </label>

  <section>
    <h3>Results:</h3>
    <ul id="results">
      <!-- search result content -->
    </ul>
    <output id="no-results">
      <!-- no results content -->
    </output>
  </section>
</search>
```

This example demonstrates potential DOM content when dynamically including JavaScript search functionality in a web application. When search functionality is implemented entirely with JavaScript, if no form is submitted, neither a `<form>` element nor a submit` <button>` is required. For semantics, the `<search>` element is included to contain the search and filtering capabilities.

### .findLast()

The `findLast()` method of `Array` instances iterates the array in reverse order and returns the value of the first element that satisfies the provided testing function. If no elements satisfy the testing function, `undefined` is returned.

```js
const array1 = [5, 12, 50, 130, 44];

const found = array1.findLast((element) => element > 45);

console.log(found);
// Expected output: 130
```

### .with()

The with() method of Array instances is the copying version of using the bracket notation to change the value of a given index. It returns a new array with the element at the given index replaced with the given value.

Creating a new array with a single changed element

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6)); // [1, 2, 6, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]
```

With the `with()` method, you can update a single element in an array and then apply other array methods.

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6).map((x) => x ** 2)); // [1, 4, 36, 16, 25]
```

The `with()` method creates and returns a new array. It reads the length property of this and then accesses each property whose key is a nonnegative integer less than length. As each property of this is accessed, the array element having an index equal to the key of the property is set to the value of the property. Finally, the array value at `index` is set to `value`.

```js
const arrayLike = {
  length: 3,
  unrelated: "foo",
  0: 5,
  2: 4,
  3: 3, // ignored by with() since length is 3
};
console.log(Array.prototype.with.call(arrayLike, 0, 1));
// [ 1, undefined, 4 ]
```

### Conclusion

In conclusion, the JavaScript updates of 2023 have introduced some powerful and convenient features that enhance the language’s capabilities and developer experience. The `Object.groupBy()` method simplifies the process of grouping elements in an iterable, making data manipulation more straightforward. The `Array.prototype.toSorted()` method offers a non-mutating way to sort arrays, preserving the original array's order. The introduction of the `<dialog>` HTML element, along with its JavaScript methods, brings a native and more streamlined approach to creating modal and non-modal dialog boxes, enhancing user interaction and interface design. Lastly, the `<search>` element signifies a semantic and functional advancement in handling search and filter operations in web applications. These updates not only demonstrate JavaScript's continuous evolution but also its commitment to providing developers with efficient and effective tools for building modern web applications.
