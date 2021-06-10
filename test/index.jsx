// your template literal library of choice
const {render, html} = require('uhtml-ssr');

// this module
const {bind, createPragma} = require('../cjs/index.js');

// create your `h` / pragma function
const h = createPragma(html);

// any component (passed as template value)
function Bold() {
  return 'strong';
}

// any generic value
const test = 123;

// test it!
const myDocument = (
  <p class="what" test={bind(test)} onClick={console.log}>
    <Bold>Hello</Bold>, <input type="password" disabled={true} />
    <span id="greetings">Hello</span>
  </p>
);

/* c8 ignore start */
const expected = `<p class="what" test="123"><strong>Hello</strong>, <input type="password" disabled><span id="greetings">Hello</span></p>`;
if (expected !== render(String, myDocument)) {
  console.error('got     ', render(String, myDocument));
  console.error('expected', expected);
  process.exit(1);
}
console.log('\x1b[1mOK\x1b[0m');
/* c8 ignore stop */
