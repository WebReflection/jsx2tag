/** @jsx h */

/** @jsxFrag h */
const {
  render,
  html,
  bind,
  jsx2
} = require('./jsx.js');

const assert = (value, expected) => {
  /* c8 ignore start */
  if (expected !== render(String, value)) {
    console.error('got     ', render(String, value));
    console.error('expected', expected);
    process.exit(1);
  }
  /* c8 ignore stop */

};

let h = jsx2.html; // any component (passed as template value)

const Bold = ({
  children
}) => html`<strong>${children}</strong>`;

class Span {
  constructor({
    id,
    children
  }) {
    return html`<span id=${id}>${children}</span>`;
  }

} // This is specific for ube or classes with a `tagName`
// these well be used as interpolations values


function World() {
  return World.tagName;
}

World.tagName = 'div'; // any generic value

const test = 123; // test it!

const myDocument = h("p", {
  class: "what",
  nope: null,
  test: bind(test),
  onClick: console.log
}, h(Bold, null, "Hello"), ", ", h("input", {
  type: "password",
  disabled: true
}), h(Span, {
  id: "greetings"
}, "Hello"), " ", h(World, null));
assert(myDocument, `<p class="what" test="123"><strong>Hello</strong>, <input type="password" disabled><span id="greetings">Hello</span> <div></div></p>`);
h = jsx2.svg;
const svgDocument = h("rect", {
  x: 10,
  y: "20"
});
assert(svgDocument, '<rect x="10" y="20" />');
const fragment = h(h, null, h("rect", {
  key: Math.random(),
  x: 1,
  y: "2"
}), h("rect", {
  x: "3",
  y: 4
}), "OK");
assert(fragment, '<rect x="1" y="2" /><rect x="3" y="4" />OK');
console.log('Test: \x1b[1mOK\x1b[0m');
const svg = h("svg", null, h("g", {
  transform: "translate(20,20)"
}, h("text", null, "hello")));