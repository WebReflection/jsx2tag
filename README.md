# JSX2TAG

Enable JSX for Template Literal Tags based projects.

### Example
```js
// your template literal library of choice
const {render, html} = require('uhtml-ssr');

// this module
const createPragma = require('jsx2tag');

// create your `h` / pragma function
// pass the tag, and optionally a cache (Map),
// so you can clear it when/if ever needed.
const h = createPragma(html);

// any component (passed as template value)
function Bold() {
  return 'strong';
}

// any generic value
const test = 123;

// test it!
const myDocument = (
  <p class="what" test={test}>
    <Bold>Hello</Bold>, <input type="password" />
    <span id="greetings">Hello</span>
  </p>
);

render(String, myDocument);
// <p class="what" test="123"><strong>Hello</strong>, <input type="password"><span id="greetings">Hello</span></p>
```

## How To Transpile JSX

Follow [@Robbb_J](https://twitter.com/Robbb_J) post [about minimal requirements](https://blog.r0b.io/post/using-jsx-without-react/) and you'll be good.

A huge thanks to hom for writing such simple, step by step, guide.
