import { createPoint } from './point'

/**
 * @param props.angleBetweenAxes - Angle between x-axis and y-axis.
 * @param props.tiltAngle - Angle between horizontal line and x-axis (how much to tilt the x-axis
 * upwards).
 * @return {any}
 */
export const createPlane = (props) => {
  const {
    angleBetweenAxes: _angleBetweenAxes = Math.PI / 2,
    tiltAngle: _tiltAngle = 0
  } = props

  function angleBetweenAxes () { return _angleBetweenAxes }

  function tiltAngle () { return _tiltAngle }

  function project ({ x, y }) { return createPoint({x:myXToX(x) + myYToX(y), y:myYToY(y) + myXToY(x)}) }

  return ({
    angleBetweenAxes,
    /**
     * Angle between horizontal line and x-axis (how much to tilt the x-axis upwards).
     */
    tiltAngle,
    project
  })

  // Contribution to x.
  function myXToX (myX) { return Math.cos(tiltAngle()) * myX }

  function myYToX (myY) { return Math.cos(tiltAngle() + angleBetweenAxes()) * myY }

  // Contribution to y.
  function myXToY (myX) { return Math.sin(tiltAngle()) * myX }

  function myYToY (myY) { return Math.sin(tiltAngle() + angleBetweenAxes()) * myY }
}
