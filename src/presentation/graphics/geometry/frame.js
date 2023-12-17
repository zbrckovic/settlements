import { createPoint } from './point'

/**
 * @param position {createPoint}
 * @param width {number}
 * @param height {number}
 */
export function createFrame ({ position, width, height }) {
  return {
    position () { return position },
    width () { return width },
    height () { return height }
  }
}
