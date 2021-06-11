# JSX2TAG

[![Build Status](https://travis-ci.com/WebReflection/jsx2tag.svg?branch=main)](https://travis-ci.com/WebReflection/jsx2tag) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/jsx2tag/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/jsx2tag?branch=main)

<sup>**Social Media Photo by [Andre Taissin](https://unsplash.com/@andretaissin) on [Unsplash](https://unsplash.com/)**</sup>


Enable JSX for Template Literal Tags based projects.

  * [uhtml live demo](https://codepen.io/WebReflection/pen/KKWxXYY?editors=0010)
  * [uland live demo](https://codepen.io/WebReflection/pen/bGqxYpZ?editors=0010)
  * [lit-html live demo](https://codepen.io/WebReflection/pen/abJaVzm?editors=0010)


### Features

  * a `createPragma(tag, config?)` utility to have a `React.createElement` like function to use as *pragma*
  * a `bind` utility to mimic `.prop=${value}` in the template
  * automatic `onEventName` to `@eventName` conversion
  * automatic `?prop=${value}` conversion in the template, when the property is boolean


### Example

See [test/index.jsx](./test/index.jsx) to see all features applied.

```js
// your template literal library of choice
const {render, html} = require('uhtml-ssr');

// this module utils
const {bind, createPragma} = require('jsx2tag');

// create your `h` / pragma function
const h = createPragma(html);
// if your env works already with `React.createElement`, use:
// const React = {createElement: createPragma(html)};

// any component (passed as template value)
const Bold = ({children}) => html`<strong>${children}</strong>`;

// any generic value
const test = 123;

// test it!
const myDocument = (
  <p class="what" test={bind(test)} onClick={console.log}>
    <Bold>Hello</Bold>, <input type="password" disabled={false} />
    <span id="greetings">Hello</span>
  </p>
);

render(String, myDocument);
// <p class="what" test="123"><strong>Hello</strong>, <input type="password"><span id="greetings">Hello</span></p>
```

## How To Transpile JSX

Follow [@Robbb_J](https://twitter.com/Robbb_J) post [about minimal requirements](https://blog.r0b.io/post/using-jsx-without-react/) and you'll be good.

A huge thanks to him for writing such simple, step by step, guide.
