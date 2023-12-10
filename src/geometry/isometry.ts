import { createPoint, Point } from './point';
import { Projection } from './projection';

/**
 * @param xAngle - angle between x-axis and isometric x-axis (how much to tilt the x-axis upwards)
 * @param yAngle - angle between y-axis and isometric y-axis (how much to tilt the y-axis leftwards)
 * @note If you want standard 30-degrees isometric plane, put PI/6 and PI/3 as values.
 */
export const createIsometricProjection = (xAngle: number, yAngle: number): Projection => {
    const isoXToOrtX = (isoX: number) => Math.cos(xAngle) * isoX;
    const isoYToOrtY = (isoY: number) => Math.cos(yAngle) * isoY;

    const isoYToOrtX = (isoY: number) => Math.sin(yAngle) * isoY;
    const isoXToOrtY = (isoX: number) => Math.sin(xAngle) * isoX;

    return (isoPoint: Point): Point => createPoint(
        isoXToOrtX(isoPoint.x) - isoYToOrtX(isoPoint.y),
        isoYToOrtY(isoPoint.y) + isoXToOrtY(isoPoint.x)
    );
};
