import { compareListsOfNumbers } from '../src/utils'

describe('compareListsOfNumbers', () => {
  test.each([
    [[], [], 0],
    [[0], [], 1],
    [[], [0], -1],
    [[0], [0], 0],
    [[0], [1], -1],
    [[1], [0], 1],
    [[0, 0], [0, 0], 0],
    [[0, 0], [1, 0], -1],
    [[0, 0], [0, 1], -1],
    [[1, 0], [0, 0], 1],
    [[0, 1], [0, 0], 1],
    [[0, 0], [0, 0, 0], -1],
  ])('comparing %s to %s gives %p', (first, second, expected) => {
    const actual = compareListsOfNumbers(first, second)
    expect(actual).toBe(expected)
  })
})
