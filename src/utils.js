import _ from 'lodash'

/**
 * Compares two lists of numbers.
 * @param list1 - List of numbers.
 * @param list2 - List of numbers.
 * @returns {number} -1 if `list1` is smaller than `list2`, 1 if `list1` is bigger than `list2`, 0
 * if they are equal.
 */
export function compareListsOfNumbers (list1, list2) {
  if (list1.length < list2.length) return -1
  if (list1.length > list2.length) return 1

  for (let i = 0; i < list1.length; i++) {
    if (list1[i] < list2[i]) return -1
    if (list1[i] > list2[i]) return 1
  }

  return 0
}

export function equals (a, b) {
  return _.isEqualWith(a, b, (value1, value2) => {
    if (_.isFunction(value1?.equals)) {
      return value1.equals(value2)
    } else {
      return undefined
    }
  })
}
