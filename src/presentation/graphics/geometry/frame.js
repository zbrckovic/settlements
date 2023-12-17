/**
 * @param position
 * @param width {number}
 * @param height {number}
 */
export function createFrame ({ position, width, height }) {
  const that = {
    position () { return position },
    width () { return width },
    height () { return height },
    withPosition (position) {
      return createFrame({ position, width, height })
    },
    withMappedPosition (mapper) {
      return that.withPosition(that.position().map(mapper))
    }
  }
  return that
}
