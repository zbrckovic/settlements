import { Point } from './point'

/**
 * @param angleBetweenAxes - Angle between x-axis and y-axis.
 * @param tiltAngle - Angle between horizontal line and x-axis (how much to tilt the x-axis
 * upwards).
 */
export const createPlane = ({ angleBetweenAxes = Math.PI / 2, tiltAngle = 0 }) => {
  const that = ({
    angleBetweenAxes () { return angleBetweenAxes },
    tiltAngle () { return tiltAngle },
    project (vector) {
      return Point.create({
        x: myXToX(vector.x()) + myYToX(vector.y()),
        y: myYToY(vector.y()) + myXToY(vector.x())
      })
    }
  })
  return that

  /**
   * Contribution to x.
   */
  function myXToX (myX) { return Math.cos(that.tiltAngle()) * myX }

  function myYToX (myY) { return Math.cos(that.tiltAngle() + that.angleBetweenAxes()) * myY }

  /**
   * Contribution to y.
   */
  function myXToY (myX) { return Math.sin(that.tiltAngle()) * myX }

  function myYToY (myY) { return Math.sin(that.tiltAngle() + that.angleBetweenAxes()) * myY }
}
