const {render, html, svg} = require('uhtml-ssr');
const {bind, createPragma} = require('../cjs/index.js');

module.exports = {
  render, html, svg,
  bind,
  jsx2: {
    html: createPragma(html),
    svg: createPragma(svg, {xml: true})
  }
};
