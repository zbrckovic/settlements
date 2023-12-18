/**
 * Moves to the first point and then draws the line between successive points.
 */
export function addPointsToGraphics(graphics, [firstPoint, ...restPoints]) {
    graphics.moveTo(firstPoint.x(), firstPoint.y());
    restPoints.forEach(p => graphics.lineTo(p.x(), p.y()));
    return graphics;
}
