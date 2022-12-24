/**
 * @description Type guard for checking a number
 * @param {any} value - any
 * @returns {boolean} boolean
 * @example
 * isNumeric(3) // true
 * isNumeric('3') // false
 * isNumeric(undefined) // false
 * isNumeric(null) // false
 */

export default function isNumeric(value) {
  return !isNaN(value) && isFinite(value) && typeof value === "number";
}
