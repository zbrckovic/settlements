import { IPoint, IPointData } from 'pixi.js';

export const calculateHexPoints = (origin: IPointData, side: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
        const x = side * Math.cos(i * Math.PI / 3) + origin.x;
        const y = side * Math.sin(i * Math.PI / 3) + origin.y;
        points.push({ x, y });
    }
    return points;
};

export const rotatePoint = (pivot: IPointData, point: IPointData, angle: number) => {
    const hDistance = point.x - pivot.x;
    const vDistance = point.y - pivot.y;
    const radius = Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2));
    const attitude = Math.atan2(vDistance, hDistance);

    const x = pivot.x + radius * Math.cos(attitude + angle);
    const y = pivot.y + radius * Math.sin(attitude + angle);

    return { x, y };
};

export const distanceBetweenPoints = (p1: IPointData, p2: IPointData) => {
    const horizontalDistance = p2.x - p1.x;
    const verticalDistance = p2.y - p1.y;
    return Math.sqrt(Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2));
}
