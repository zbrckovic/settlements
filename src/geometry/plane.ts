import { createPoint, Point } from './point';

export interface Plane {
    readonly angleBetweenAxes: number;
    /**
     * Angle between horizontal line and x-axis (how much to tilt the x-axis upwards).
     */
    readonly tiltAngle: number;

    readonly project: (point: Point) => Point;
}

export const createPlane = (angleBetweenAxes: number = Math.PI / 2, tiltAngle: number = 0): Plane => {
    // Contribution to x.
    const myXToX = (myX: number) => Math.cos(tiltAngle) * myX;
    const myYToX = (myY: number) => Math.cos(tiltAngle + angleBetweenAxes) * myY;

    // Contribution to y.
    const myXToY = (myX: number) => Math.sin(tiltAngle) * myX;
    const myYToY = (myY: number) => Math.sin(tiltAngle + angleBetweenAxes) * myY;


    return ({
        angleBetweenAxes,
        tiltAngle,
        project: ({ x, y }: Point): Point =>
            createPoint(myXToX(x) + myYToX(y), myYToY(y) + myXToY(x))
    });
}
