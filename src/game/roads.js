import _ from 'lodash'

/**
 * A nested map which contains the following mapping for each road:
 * `coords` -> `edge key` -> `road`.
 */
export class Roads {
  static from () {
    return new Roads()
  }

  #map = {}

  get (coords, edgeKey) {
    const coordsId = coords.id()
    return this.#map[coordsId]?.[edgeKey]
  }

  set (coords, edgeKey, road) {
    const coordsId = coords.id()
    let nestedMap = this.#map[coordsId]
    if (nestedMap === undefined) {
      nestedMap = {}
      this.#map[coordsId] = nestedMap
    }
    nestedMap[edgeKey] = road
  }

  plain () {
    return _.mapValues(this.#map, nestedMap => {
      _.mapValues(nestedMap, road => road?.plain())
    })
  }
}
