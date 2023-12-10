export interface Point {
    readonly x: number;
    readonly y: number;

    readonly add: (other: Point) => Point;
    readonly multiply: (factor: number) => Point;
    readonly mapY: (mapper: (y: number) => number) => Point;
    readonly mapX: (mapper: (x: number) => number) => Point;
    readonly map: (projection: (point: Point) => Point) => Point;
    readonly withX: (x: number) => Point;
    readonly withY: (y: number) => Point;
    readonly distanceTo: (other: Point) => number;
    readonly rotate: (pivot: Point, angle: number) => Point;

}

export const createPoint = (x: number, y: number): Point => {
    const withX = (x: number) => createPoint(x, y);
    const withY = (y: number) => createPoint(x, y);

    const add = (other: Point) => createPoint(x + other.x, y + other.y);

    const distanceTo = (other: Point) => {
        const hDistance = other.x - x;
        const vDistance = other.y - y;
        return Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2));
    };

    const rotate = (pivot: Point, angle: number) => {
        const hDistance = x - pivot.x;
        const vDistance = y - pivot.y;
        const radius = Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2));
        // Angle between the horizontal line and the line connecting the pivot and the point
        const slant = Math.atan2(vDistance, hDistance);

        const newX = pivot.x + radius * Math.cos(slant + angle);
        const newY = pivot.y + radius * Math.sin(slant + angle);

        return createPoint(newX, newY);
    }

    const multiply = (factor: number) => createPoint(x * factor, y * factor);

    const map = (mapper: (point: Point) => Point) => mapper(createPoint(x, y));
    const mapX = (mapper: (x: number) => number) => withX(mapper(x));
    const mapY = (mapper: (y: number) => number) => withY(mapper(y));

    return { x, y, withX, withY, distanceTo, rotate, map, mapX, mapY, add, multiply };
};
