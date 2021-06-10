'use strict';
/*! (c) Andrea Giammarchi - ISC */

/**
 * A value wrap/placeholder to easily find "bound" properties.
 * The `bind(any)` export will result into `.name=${value}` in the template.
 */
class Bound {
  /**
   * @param {any} _ a "protected" value to carry along for further `instanceof` checks.
   */
  constructor(_) {
    this._ = _;
  }
}

const empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
const er = '<☠>';
const re = /^on([A-Z])/;
const place = (_, $) => ('@' + $.toLowerCase());

/**
 * @typedef {object} attr - a DOM attribute facade with a `name` and a `value`.
 * @property {string} name - the attribute name as shown in the template literal.
 * @property {any} value - the attribute value to pass along to the attribute.
 */

/**
 * Return the `name` and `value` to use with an attribute.
 *  * boolean values transform the `name` as `"?" + name`.
 *  * bound values transform the `name` as `"." + name`
 *  * events like `onX` transform the `name` as `"@" + name`
 *  * strings, numbers, `null`, or `undefined` values don't change the `name`
 * @param {string} name the attribute name.
 * @param {any} value the attribute value.
 * @returns {attr} the attribute facade to use in the template as `name=${value}`.
 */
const defaultAttribute = (name, value) => {
  switch (typeof value) {
    case 'string':
    case 'number':
      return {name, value};
    case 'boolean':
      return {name: '?' + name, value};
    case 'object':
    case 'undefined':
      if (value == null)
        return {name, value};
      if (value instanceof Bound)
        return {name: '.' + name, value: value._};
  }
  return {name: name.replace(re, place), value};
};

/**
 * Allow binding values directly to nodes via `name={bind(value)}`.
 * @param {any} value the value expected, in the template, as `.name=${value}`.
 * @returns 
 */
const bind = value => new Bound(value);
exports.bind = bind;

/**
 * @typedef {object} config - optionally configure the pragma function
 * @property {function} [attribute=defaultAttribute] - a `callback(name, value)` to return a `{name, value}` literal.
 * @property {Map<string,string[]>} [cache=new Map()] - a cache for already known/parsed templates.
 * @property {boolean} [xml=false] - treat nodes as XML with self-closing tags.
 */

/**
 * Return an `h` / pragma function usable with JSX transformation.
 * @param {function} tag a template literal tag function to invoke.
 * @param {config} [config={}] an optional configuration object.
 * @returns {function} the `h` / `React.createElement` like pragma function to use with JSX.
 */
const createPragma = (
  tag,
  {
    attribute = defaultAttribute,
    cache = new Map,
    xml = false
  } = {}
) => function h(entry, attributes, ...children) {
  const component = typeof entry === 'function';
  // avoid dealing with µbe classes
  if (component && !('tagName' in entry)) {
    // pass {...props, children} to the component
    (attributes || (attributes = {})).children = children;
    return 'prototype' in entry ? new entry(attributes) : entry(attributes);
  }
  const template = ['<'];
  const args = [template];
  let i = 0;
  if (component) {
    args.push(entry);
    i = template.push('') - 1;
  }
  else
    template[i] += entry;
  for (const key in attributes) {
    const {name, value} = attribute(key, attributes[key]);
    template[i] += ` ${name}="`;
    args.push(value);
    i = template.push('"') - 1;
  }
  const {length} = children;
  template[i] += (length || !xml) ? '>' : ' />';
  for (let child, j = 0; j < length; j++) {
    child = children[j];
    if (typeof child === 'string')
      template[i] += child;
    else {
      args.push(child);
      i = template.push('') - 1;
    }
  }
  if (
    length || (
      !xml && (
        (component && !empty.test(component.tagName)) ||
        !empty.test(entry)
      )
    )
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
exports.createPragma = createPragma;
