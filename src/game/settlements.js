/**
 * A nested map which contains the following mapping for each settlement:
 * `coords` -> `vertex key` -> `settlement`.
 */
export class Settlements {
  static from() {
    return new Settlements()
  }

  #map = {}

  get(coords, vertexKey) {
    const coordsId = coords.id()
    return this.#map[coordsId]?.[vertexKey]
  }

  set(coords, vertexKey, settlement) {
    const coordsId = coords.id()
    let nestedMap = this.#map[coordsId]
    if (nestedMap === undefined) {
      nestedMap = {}
      this.#map[coordsId] = nestedMap
    }
    nestedMap[vertexKey] = settlement
  }
}
