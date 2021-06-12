/** @jsx h *//** @jsxFrag h */

// your template literal library of choice
const {render, html, svg} = require('uhtml-ssr');

// this module
const {bind, createPragma} = require('../cjs/index.js');

const assert = (value, expected) => {
  /* c8 ignore start */
  if (expected !== render(String, value)) {
    console.error('got     ', render(String, value));
    console.error('expected', expected);
    process.exit(1);
  }
  /* c8 ignore stop */
};

// create your `h` / pragma function
let h = createPragma(html);

// any component (passed as template value)
const Bold = ({children}) => html`<strong>${children}</strong>`;

class Span {
  constructor({id, children}) {
    return html`<span id=${id}>${children}</span>`;
  }
}

// This is specific for ube or classes with a `tagName`
// these well be used as interpolations values
function World() { return World.tagName; }
World.tagName = 'div';

// any generic value
const test = 123;

// test it!
const myDocument = (
  <p class="what" nope={null} test={bind(test)} onClick={console.log}>
    <Bold>Hello</Bold>, <input type="password" disabled={true} />
    <Span id="greetings">Hello</Span> <World />
  </p>
);

assert(
  myDocument,
  `<p class="what" test="123"><strong>Hello</strong>, <input type="password" disabled><span id="greetings">Hello</span> <div></div></p>`
);

h = createPragma(svg, {
  xml: true
});

const svgDocument = (
  <rect x={10} y="20"></rect>
);

assert(
  svgDocument,
  '<rect x="10" y="20" />'
);

const fragment = (
  <>
    <rect key={Math.random()} x={1} y="2"></rect>
    <rect x="3" y={4}></rect>
    OK
  </>
);

assert(
  fragment,
  '<rect x="1" y="2" /><rect x="3" y="4" />OK'
);

console.log('Test: \x1b[1mOK\x1b[0m');
