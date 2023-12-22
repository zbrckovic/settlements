import { Coords } from '../../src/game/misc'

describe('Coords', () => {
  describe('compare()', () => {
    test.each([
      [{ x: 0, y: 0 }, { x: 0, y: 0 }, 0],
      [{ x: 0, y: 0 }, { x: 1, y: 0 }, 1],
      [{ x: 0, y: 0 }, { x: 0, y: 1 }, 1],
      [{ x: 1, y: 0 }, { x: 0, y: 0 }, -1],
      [{ x: 0, y: 1 }, { x: 0, y: 0 }, -1],
    ])('comparing %s to %s gives %p', (firstPlain, secondPlain, expected) => {
      const first = Coords.from(firstPlain)
      const second = Coords.from(secondPlain)
      const actual = first.compare(second)
      expect(actual).toBe(expected)
    })
  })
})
