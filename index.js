'use strict';

/**
 * return the type of an item
 * @param {string} item the item whose type we need 
 * @returns {string}
 */
function type_of(item) {
  if (Array.isArray(item)) {
    return 'array';
  }
  if (Number.isNaN(item)) {
    return 'NaN';
  }

  return typeof item;
}

/**
 * check if types match
 * 
 * @param {any} item the item whose type we are verifying
 * @param {string} expectedType string representation of expected type
 * @returns {boolean}
 */
module.exports = function check(item, expectedType) {
  return type_of(item) === expectedType;
}