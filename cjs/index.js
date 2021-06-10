'use strict';
/*! (c) Andrea Giammarchi - ISC */

function Bound(_) {
  this._ = _;
}

const empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

const er = '<☠>';

const re = /^on([A-Z])/;
const place = (_, $) => ('@' + $.toLowerCase());

/**
 * Return the `name` and `value` to use with an attribute.
 * @param {string} name the attribute name.
 * @param {any} value the attribute value.
 * @returns {object} An object with `name` and `value` fields.
 */
const attribute = (name, value) => {
  const type = typeof value;
  switch (type) {
    case 'string':
      return {name, value};
    case 'boolean':
      return {name: '?' + name, value};
    case 'object':
      if (value instanceof Bound)
        return {name: '.' + name, value: value._};
  }
  return {name: name.replace(re, place), value};
};

const bind = value => new Bound(value);
exports.bind = bind;

/**
 * Return an `h` / pragma function usable with JSX transformation.
 * @param {function} tag A template literal tag function to invoke.
 * @param {Map<string,string[]>?} cache A cache to avoid passing along different arrays per same template / values.
 * @returns {function} The `h` / pragma function to use with JSX.
 */
const createPragma = (tag, cache) => {
  if (!cache)
    cache = new Map;
  return function h(entry, attributes) {
    const component = typeof entry === 'function';
    const template = ['<'];
    const args = [null];
    let i = 0;
    if (component) {
      args.push(entry);
      i = template.push('') - 1;
    }
    else
      template[i] += entry;
    for (const key in attributes) {
      const {name, value} = attribute(key, attributes[key]);
      args.push(value);
      template[i] += ` ${name}="`;
      i = template.push('"') - 1;
    }
    template[i] += '>';
    const {length} = arguments;
    for (let child, j = 2; j < length; j++) {
      child = arguments[j];
      if (typeof child === 'string')
        template[i] += child;
      else {
        args.push(child);
        i = template.push('') - 1;
      }
    }
    if (
      2 < length ||
      (component && !empty.test(component.tagName || '')) ||
      !empty.test(entry)
    ) {
      if (component) {
        template[i] += '</';
        args.push(entry);
        template.push('>');
      }
      else
        template[i] += `</${entry}>`;
    }
    const whole = template.join(er);
    args[0] = cache.get(whole) || template;
    if (args[0] === template)
      cache.set(whole, template);
    return tag.apply(this, args);
  };
};
exports.createPragma = createPragma;
