export function defaultAttribute(name: string, value: any): attr;
export function bind(value: any): Bound;
export function createPragma(tag: Function, { attribute, keyed, cache, xml }?: config): Function;
/**
 * - a DOM attribute facade with a `name` and a `value`.
 */
export type attr = {
    /**
     * - the attribute name as shown in the template literal.
     */
    name: string;
    /**
     * - the attribute value to pass along to the attribute.
     */
    value: any;
};
/**
 * - optionally configure the pragma function
 */
export type config = {
    /**
     * - a `callback(name, value)` to return a `{name, value}` literal.
     * If `null` or `undefined` is returned, the attribute is skipped all along.
     */
    attribute?: Function;
    /**
     * - a `callback(entry, props)` to return a keyed version of the `tag`.
     */
    keyed?: Function;
    /**
     * - a cache for already known/parsed templates.
     */
    cache?: any;
    /**
     * - treat nodes as XML with self-closing tags.
     */
    xml?: boolean;
};
/*! (c) Andrea Giammarchi - ISC */
/**
 * A value wrap/placeholder to easily find "bound" properties.
 * The `bind(any)` export will result into `.name=${value}` in the template.
 */
declare class Bound {
    /**
     * @param {any} _ a "protected" value to carry along for further `instanceof` checks.
     */
    constructor(_: any);
    _: any;
}
export {};
