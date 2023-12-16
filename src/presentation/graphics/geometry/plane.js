import { createPoint } from './point'

/**
 * @param props.angleBetweenAxes - Angle between x-axis and y-axis.
 * @param props.tiltAngle - Angle between horizontal line and x-axis (how much to tilt the x-axis
 * upwards).
 */
export const createPlane = (props) => {
  const {
    angleBetweenAxes: _angleBetweenAxes = Math.PI / 2,
    tiltAngle: _tiltAngle = 0
  } = props

  function angleBetweenAxes () { return _angleBetweenAxes }

  function tiltAngle () { return _tiltAngle }

  function project (vector) {
    return createPoint({
      x: myXToX(vector.x()) + myYToX(vector.y()),
      y: myYToY(vector.y()) + myXToY(vector.x())
    })
  }

  return ({
    angleBetweenAxes,
    tiltAngle,
    project
  })

  /**
   * Contribution to x.
   */
  function myXToX (myX) { return Math.cos(tiltAngle()) * myX }

  function myYToX (myY) { return Math.cos(tiltAngle() + angleBetweenAxes()) * myY }

  /**
   * Contribution to y.
   */
  function myXToY (myX) { return Math.sin(tiltAngle()) * myX }

  function myYToY (myY) { return Math.sin(tiltAngle() + angleBetweenAxes()) * myY }
}
