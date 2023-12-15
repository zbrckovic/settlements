import { createPoint, Point } from './point';

export const createPlane = (angleBetweenAxes = Math.PI / 2, tiltAngle = 0) => {
    // Contribution to x.
    const myXToX = (myX) => Math.cos(tiltAngle) * myX;
    const myYToX = (myY) => Math.cos(tiltAngle + angleBetweenAxes) * myY;

    // Contribution to y.
    const myXToY = (myX) => Math.sin(tiltAngle) * myX;
    const myYToY = (myY) => Math.sin(tiltAngle + angleBetweenAxes) * myY;


    return ({
        angleBetweenAxes,
        /**
         * Angle between horizontal line and x-axis (how much to tilt the x-axis upwards).
         */
        tiltAngle,
        project: ({ x, y }) => createPoint(myXToX(x) + myYToX(y), myYToY(y) + myXToY(x))
    });
}
