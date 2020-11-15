/**
 * How it works?
 * fnString:
 *   function foo(a, b) {
 *    return a + b;
 *   }
 * wrapper {return function foo(a, b) {return a + b;};}
 * func: function anonymous() {
 *    return function foo(){
 *     };
 * }
 * call(null) => foo(a, b)
 * apply(null, args) => invoke foo with args
 *
 * Things to note:
 * the fnString should not have newline or space
 */
export function getResultFromFunctionString(fnString, args) {
  const wrapper = s => `{return ${fnString}}`;
  const func = new Function(wrapper(fnString));

  const fn = func.call(null);
  if (typeof fn === "function") {
    return fn.apply(null, args);
  }
  return undefined;
}
