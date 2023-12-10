import { Graphics, IPointData } from 'pixi.js';
import { Point } from './geometry/point';

export const addPointsToGraphics = (graphics: Graphics, [firstPoints, ...restPoints]: Point[]): Graphics => {
    graphics.moveTo(firstPoints.x, firstPoints.y);
    restPoints.forEach(p => graphics.lineTo(p.x, p.y));
    return graphics;
};
