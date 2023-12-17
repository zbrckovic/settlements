export class Frame {
  static create ({ position, width, height }) {
    return new Frame({ position, width, height })
  }

  constructor ({ position, width, height }) {
    this._position = position
    this._width = width
    this._height = height
  }

  position () { return this._position }

  width () { return this._width }

  height () { return this._height }

  withPosition (position) {
    return Frame.create({
      position,
      width: this.width(),
      height: this.height()
    })
  }

  withMappedPosition (mapper) {
    return this.withPosition(this.position().map(mapper))
  }
}
