import { Point } from './point'

export const calculateRegularPolygonPoints = (
  center,
  radius,
  sides,
  rotation = 0
) => {
  const points = []
  const angle = 2 * Math.PI / sides

  for (let i = 0; i < sides; i++) {
    const x = radius * Math.cos(i * angle) + center.x()
    const y = radius * Math.sin(i * angle) + center.y()
    points.push(Point.create({ x, y }).withRotation(center, rotation))
  }
  return points
}

