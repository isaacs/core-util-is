const t = require('tap');

const util = require('./lib/util');

t.equal(util.isArray([]), true);
t.equal(util.isArray({}), false);
{
  const { isArray } = Array
  Array.isArray = null
  const is = util.isArray({ [Symbol.toStringTag]: 'Array' })
  Array.isArray = isArray
  t.equal(is, true);
}

t.equal(util.isBoolean(null), false);
t.equal(util.isBoolean(true), true);
t.equal(util.isBoolean(false), true);

t.equal(util.isNull(null), true);
t.equal(util.isNull(undefined), false);
t.equal(util.isNull(false), false);
t.equal(util.isNull(), false);

t.equal(util.isNullOrUndefined(null), true);
t.equal(util.isNullOrUndefined(undefined), true);
t.equal(util.isNullOrUndefined(false), false);
t.equal(util.isNullOrUndefined(), true);

t.equal(util.isNumber(null), false);
t.equal(util.isNumber('1'), false);
t.equal(util.isNumber(1), true);

t.equal(util.isString(null), false);
t.equal(util.isString('1'), true);
t.equal(util.isString(1), false);

t.equal(util.isSymbol(null), false);
t.equal(util.isSymbol('1'), false);
t.equal(util.isSymbol(1), false);
t.equal(util.isSymbol(Symbol()), true);

t.equal(util.isUndefined(null), false);
t.equal(util.isUndefined(undefined), true);
t.equal(util.isUndefined(false), false);
t.equal(util.isUndefined(), true);

t.equal(util.isRegExp(null), false);
t.equal(util.isRegExp('1'), false);
t.equal(util.isRegExp(new RegExp()), true);

t.equal(util.isObject({}), true);
t.equal(util.isObject([]), true);
t.equal(util.isObject(new RegExp()), true);
t.equal(util.isObject(new Date()), true);

t.equal(util.isDate(null), false);
t.equal(util.isDate('1'), false);
t.equal(util.isDate(new Date()), true);

t.equal(util.isError(null), false);
t.equal(util.isError({ err: true }), false);
t.equal(util.isError(new Error()), true);

t.equal(util.isFunction(null), false);
t.equal(util.isFunction({ }), false);
t.equal(util.isFunction(function() {}), true);

t.equal(util.isPrimitive(null), true);
t.equal(util.isPrimitive(''), true);
t.equal(util.isPrimitive(0), true);
t.equal(util.isPrimitive(new Date()), false);

t.equal(util.isBuffer(null), false);
t.equal(util.isBuffer({}), false);
t.equal(util.isBuffer(Buffer.alloc(0)), true);
t.equal(util.isBuffer(Buffer.from('')), true);

t.test('require buffer instead of using global', t => {
  const util = t.mock('./lib/util.js', {
    buffer: {
      Buffer: {
        isBuffer: true
      }
    }
  });
  t.equal(util.isBuffer, true, 'loaded from require(), not global')
  t.end()
})
