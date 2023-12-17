export class Frame {
  static create ({ point1, point2 }) {
    return new Frame({ point1, point2 })
  }

  constructor ({ point1, point2 }) {
    this._point1 = point1
    this._point2 = point2
  }

  point1 () { return this._point1 }

  point2 () { return this._point2 }

  width () { return this.point2().x() - this.point1().x() }

  height () { return this.point2().y() - this.point1().y() }

  withPoint1 (point1) {
    return Frame.create({ point1, point2: this.point2() })
  }

  withPoint2 (point2) {
    return Frame.create({ point1: this.point1(), point2 })
  }
}
