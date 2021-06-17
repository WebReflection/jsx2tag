# JSX2TAG

[![Build Status](https://travis-ci.com/WebReflection/jsx2tag.svg?branch=main)](https://travis-ci.com/WebReflection/jsx2tag) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/jsx2tag/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/jsx2tag?branch=main)

<sup>**Social Media Photo by [Andre Taissin](https://unsplash.com/@andretaissin) on [Unsplash](https://unsplash.com/)**</sup>


Enable JSX for Template Literal Tags based projects.

  * [µhtml live demo](https://codepen.io/WebReflection/pen/KKWxXYY?editors=0010)
  * [µland live demo](https://codepen.io/WebReflection/pen/bGqxYpZ?editors=0010)
  * [µbe live demo](https://codepen.io/WebReflection/pen/BaWqNpd?editors=0010)
  * [lit-html live demo](https://codepen.io/WebReflection/pen/abJaVzm?editors=0010)


### Features

  * a `createPragma(tag, config?)` utility to have a `React.createElement` like function to use as *pragma*
  * a `bind` utility to mimic `.prop=${value}` in the template
  * automatic `onEventName` to `@eventName` conversion
  * automatic `?prop=${value}` conversion in the template, when the property is boolean
  * optionally boost performance via [@ungap/plugin-transform-static-jsx](https://github.com/ungap/plugin-transform-static-jsx#readme), able to create best template literals tags' arguments


### Example

See [test/index.jsx](./test/index.jsx) to see all features applied.

```js
/** @jsx h *//** @jsxFrag h */

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

Specify `pragma` and `pragmaFrag` or use this syntax on top:

```js
/** @jsx h */
/** @jsxFrag h */
```

Otherwise, follow [@Robbb_J](https://twitter.com/Robbb_J) post [about minimal requirements](https://blog.r0b.io/post/using-jsx-without-react/) and you'll be good.

A huge thanks to him for writing such simple, step by step, guide.

## How to render keyed components

The `config` object accepts a `keyed(tagName, props)` callback that can return a keyed version of the component.

```js
/** @jsx h *//** @jsxFrag h */
import {createPragma} from '//unpkg.com/jsx2tag?module';
import {render, html} from '//unpkg.com/uhtml?module';

// used as weakMap key for global keyed references
const refs = {};
const h = createPragma(html, {
  // invoked when a key={value} is found in the node
  // to render regular elements (or µbe classes)
  keyed(tagName, {key}) {
    const ref = refs[tagName] || (refs[tagName] = {});
    return html.for(ref, key);
  }
});

render(document.body, <div key={'unique-id'} />);

```

Alternatively, each library might have its own way, but the gist of this feature, whenever available, is that the `key` property is all we're after:

```js
/** @jsx h *//** @jsxFrag h */

import {createPragma} from '//unpkg.com/jsx2tag?module';
import {render, html} from '//unpkg.com/uhtml?module';

const h = createPragma(html);

const App = ({name, key}) => html.for(App, key)`Hello ${name} 👋`;

render(document.body, <App name="JSX" key={'specific-key'} />);
```

Conditional *keyed* components are also possible.

Here another *uhtml* example:

```js
/** @jsx h *//** @jsxFrag h */

import {createPragma} from '//unpkg.com/jsx2tag?module';
import {render, html} from '//unpkg.com/uhtml?module';

const h = createPragma(html);

const App = ({name, key}) => {
  const tag = key ? html.for(App, key) : html;
  return tag`Hello ${name} 👋`;
};

render(document.body, <App name="JSX" key={'specific-key'} />);
```

In few words, there's literally *nothing* stopping template literal tags libraries to be *keyed* compatible.
