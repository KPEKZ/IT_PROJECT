import _ from "lodash";
import isNumeric from "./is-numeric";

/**
 * @description split an array and filter by key
 * @param {Array} array - Array
 * @param {Number} count - number of chunks
 * @param {String | undefined} key - optional : key for an array filtering
 * @returns {Array} Array
 * @example
 * splitedUniqueArray([1,2,3,4,5], 3) // [[1,2,3], [4,5]]
 * splitedUniqueArray([1,2,3,4,5], null | undefined) // []
 * splitedUniqueArray([{id:1, value: 1}, {id:1, value: 1}, {id:2, value: 2}, {id:3, value: 3}], 3, 'id') // [[{id:1, value: 1}], [{id:2, value: 2}], [{id:3, value: 3}]]
 */

export default function splitedUniqueArray(array, count, key = undefined) {
  if (!Array.isArray(array) || !array || !isNumeric(count)) return [];

  const uniqueArray =
    key && typeof key === "string"
      ? _.uniqBy(array, (listItem) => listItem[key])
      : _.uniq(array);

  return _.chunk(uniqueArray, count);
}
