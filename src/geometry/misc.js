/**
 * Returns a function which takes y in cartesian coordinate (0 at the bottom) system and translates
 * it to y in inverted Y axis coordinate system used by graphics libraries (0 at the top).
 *
 * @param height Height of the area we are drawing in (usually the whole canvas).
 */
export function createYInverter (height) { return function (y) { return height - y } }
