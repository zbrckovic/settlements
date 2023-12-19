import { Point } from './point'

export class Plane {
  static create (props) {
    return new Plane(props)
  }

  #angleBetweenAxes
  #tiltAngle

  /**
   * @param angleBetweenAxes - Angle between x-axis and y-axis.
   * @param tiltAngle - Angle between horizontal line and x-axis (how much to tilt the x-axis
   * upwards).
   */
  constructor ({ angleBetweenAxes = Math.PI / 2, tiltAngle = 0 }) {
    this.#angleBetweenAxes = angleBetweenAxes
    this.#tiltAngle = tiltAngle
  }

  angleBetweenAxes () { return this.#angleBetweenAxes }

  tiltAngle () { return this.#tiltAngle }

  project (vector) {
    return Point.create({
      x: this.#myXToX(vector.x()) + this.#myYToX(vector.y()),
      y: this.#myYToY(vector.y()) + this.#myXToY(vector.x())
    })
  }

  /**
   * Contribution of x to x.
   */
  #myXToX (myX) { return Math.cos(this.tiltAngle()) * myX }

  /**
   * Contribution of y to x.
   */
  #myYToX (myY) { return Math.cos(this.tiltAngle() + this.angleBetweenAxes()) * myY }

  /**
   * Contribution of x to y.
   */
  #myXToY (myX) { return Math.sin(this.tiltAngle()) * myX }

  /**
   * Contribution of y to y.
   */
  #myYToY (myY) { return Math.sin(this.tiltAngle() + this.angleBetweenAxes()) * myY }
}
