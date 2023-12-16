export const addPointsToGraphics = (graphics, [firstPoint, ...restPoints]) => {
    graphics.moveTo(firstPoint.x(), firstPoint.y());
    restPoints.forEach(p => graphics.lineTo(p.x(), p.y()));
    return graphics;
};
