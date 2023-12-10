import { createPoint, Point } from './point';

export const calculateRegularPolygonPoints = (
    center: Point,
    radius: number,
    sides: number,
    rotation: number = 0
) => {
    const points: Point[] = [];
    const angle = 2 * Math.PI / sides;

    for (let i = 0; i < sides; i++) {
        const x = radius * Math.cos(i * angle) + center.x;
        const y = radius * Math.sin(i * angle) + center.y;
        points.push(createPoint(x, y).rotate(center, rotation));
    }
    return points;
};

