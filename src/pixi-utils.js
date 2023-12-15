export const addPointsToGraphics = (graphics, [firstPoints, ...restPoints]) => {
    graphics.moveTo(firstPoints.x, firstPoints.y);
    restPoints.forEach(p => graphics.lineTo(p.x, p.y));
    return graphics;
};
