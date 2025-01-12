---
layout: ../../layouts/BlogLayout.astro
title: Implementing Signals from Scratch
description: Recently, the JavaScript community has been buzzing about signals. Their rise in popularity can be traced back to Solid.js, which drew inspiration from Knockout.js' Observables to craft their version of signals.
tags: ["code", "javascript", "signals"]
time: 6
featured: true
timestamp: 2023-09-28T02:39:03+00:00
source: signals-from-scratch
---

## What Are Signals?

Recently, the JavaScript community has been buzzing about signals. Their rise in popularity can be traced back to Solid.js, which drew inspiration from Knockout.js' [Observables](https://knockoutjs.com/documentation/observables.html#observables) to craft their version of signals. Not long after, prominent frameworks like Preact, Angular, and Qwik integrated signals into their core. Vue 3 introduced its distinctive take on signals with `ref` and `reactive` (although they are not signals in the same context as Solid.js' signals), while Svelte 5 unveiled the Svelte Runes which is fundamentally built on this type of reactivity. For the purpose of this article, I'll use the term "signals" to describe these reactive systems. With that said, what the heck are signals?

Signals are basic units of data that can automatically alert functions or computations when the data they hold changes. This alerting capability allows parts of a system to automatically and immediately update when the data changes, making the system feel dynamic and real-time. The problem this solves is updating something visually when some data changes behind-the-scenes.

When data changes, a function is triggered to update a specific element on the DOM. Solid.js achieves this with fine-grained reactivity. This ensures that your code directly updates only the specified value, avoiding unnecessary side effects or redundant re-renders of other DOM elements. With a defined reactive system in place, you can build large-scale and maintainable web applications with ease.

## How Do Signals Work?

Let's look at how signals work under-the-hood. I will be referring mostly to Solid's functional approach of signals, although a class-based solution wouldn't be too different. The signal function we will be creating today isn't going to be as performant or feature-full as with many frameworks, but should serve instead as a starting point to understanding signals at a low level.

### Functions and Closures

Before we look at signals, it's important to have a grasp of how JavaScript handles functions. Let's dive deep into how those work, starting with the following code:

```js
function createSignal() {}
```

Let's dive in. The function createSignal is stored in JavaScript's global memory. Simple enough, right?

Next, we'll embed a variable within our function and return another function to retrieve this value.

```js
function createSignal() {
  let value = "Hello, World";
  return function () {
    return value;
  };
}
```

Our function now gets a little more complex, and shows the creative inner workings of JavaScript. By invoking:

```js
let signal = createSignal();
signal();
```

We initiate a fresh execution context for createSignal. Within that context, the string "Hello, World" is assigned to our context's memory under the value label. When we return the new function, a closure is created that holds the `value` data, and is stored alongside the returned function. This allows us to have persistent storage of our `value` across execution contexts.

Upon invoking the returned function, JavaScript sets up a new execution environment. Since it doesn't immediately spot the value variable, it consults the closure, locates value, and duly returns it.

Now, let's modify our function. We will now return an object with a setter function and the value. Then we will add a parameter that receives a default argument for our value as well.

```js
function createSignal(initialValue) {
  let value = initialValue;
  return {
    value,
    set: (v) => {
      value = v;
    },
  };
}
```

We have one problem. Because we are returning the `value` variable within our object, it remains unchanged even after calling our set function. This happens because the value we pass to the object is a copy of the value at the point in time where we return the object from the function. Hence we need to write a dedicated getter function for the value.

```js
function createSignal(initialValue) {
  let value = initialValue;
  return {
    get: () => {
      return value;
    },
    set: (v) => {
      value = v;
    },
  };
}
```

It's coming together! Let's try using it.

```js
let signal = createSignal(10);
console.log(signal.get()); // 10
signal.set(20);
console.log(signal.get()); // 20
```

One thing that stands out is the need to call a set and get function each time we read or write to the `value` variable. Let's improve this by using JavaScript's get and set functions.

```js
function createSignal(initialValue) {
  let _value = initialValue;
  return {
    get value() {
      return _value;
    },
    set value(v) {
      _value = v;
    },
  };
}
```

Now we can use our function as such:

```js
let signal = createSignal(10);
console.log(signal.value); // 10
signal.value = 20;
console.log(signal.value); // 20
```

A bit more readable, eh? We still have one problem: it's not reactive. No "effect" happens aside of the `_value` changing states when we call the set function. This is where we will create a subscriber.

## Subscribers

A subscriber will "subscribe" a function to run some code whenever our `_value` changes. To do this, we will be making use of our get function.

```js
function createSignal(initialValue) {
  let _value = initialValue;

  function notify() {}

  return {
    get value() {
      return _value;
    },
    set value(v) {
      _value = v;
      notify();
    },
  };
}
```

What's happening here? Whenever the set function is called (aka. we reassign the value `signal.value = "hello";`), we will run a function. This function will then call the subscriber function... which means we also need a subscribe function as part of our return. While were at it, let's accommodate for multiple subscribers and then call them within our notify function.

```js
function createSignal(initialValue) {
  let _value = initialValue;
  let subscribers = [];

  function notify() {
    for (let subscriber of subscribers) {
      subscriber(_value);
    }
  }

  return {
    get value() {
      return _value;
    },
    set value(v) {
      _value = v;
      notify();
    },
    subscribe: (subscriber) => {
      subscribers.push(subscriber);
    },
  };
}
```

## The Finished Signal

And with that, we have a (very) basic signal! Let's see how we will use it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Signals from Scratch</title>
  </head>
  <body>
    <span id="mySpan"></span>
    <script>
      function createSignal(initialValue) {
        let _value = initialValue;
        let subscribers = [];

        function notify() {
          for (let subscriber of subscribers) {
            subscriber(_value);
          }
        }

        return {
          get value() {
            return _value;
          },
          set value(v) {
            _value = v;
            notify();
          },
          subscribe: (subscriber) => {
            subscribers.push(subscriber);
          },
        };
      }

      const mySignal = createSignal("");
      mySignal.subscribe((value) => {
        document.getElementById("mySpan").innerHTML = value;
      });

      mySignal.value = "Hello World!";
    </script>
  </body>
</html>
```

What's happening here is we defined a variable `mySignal` to hold our reactive signal. We call the `subscribe` method on our returned and bind a function that will be called whenever our `value` setter is called which will in turn update the DOM. Now whenever we set the value of our signal, our subscriber is notified and the DOM is updated!

At the root, this is what's happening with signals. Of course, frameworks implement lots of additional features like derives and effects. In Solid's case, they make use of additional improvements to performance with the use of subscriber cleanups and a compilation step to check where you use the getter within your JSX and create the fine-grained update code from that.
