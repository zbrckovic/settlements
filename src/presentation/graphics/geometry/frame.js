export class Frame {
  static create ({ minPoint, maxPoint }) {
    return new Frame({ minPoint, maxPoint })
  }

  constructor ({ minPoint, maxPoint }) {
    this._minPoint = minPoint
    this._maxPoint = maxPoint
  }

  minPoint () { return this._minPoint }

  maxPoint () { return this._maxPoint }

  width () { return this.maxPoint().x() - this.minPoint().x() }

  height () { return this.maxPoint().y() - this.minPoint().y() }

  withMinPoint (minPoint) {
    return Frame.create({ minPoint, maxPoint: this.maxPoint() })
  }

  withMaxPoint (maxPoint) {
    return Frame.create({ minPoint: this.minPoint(), maxPoint })
  }
}
