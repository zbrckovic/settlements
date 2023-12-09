import { IPoint, IPointData } from 'pixi.js';

interface IsometricPlane {
    /**
     * Converts isometric coordinates to cartesian coordinates.
     */
    isoToCar(isoPoint: IPointData): IPointData;
}

export const createIsometricPlane = (yAngle: number, xAngle: number): IsometricPlane => {
    const isoXToCarX = (isoX: number) => Math.cos(xAngle) * isoX;
    const isoYToCarY = (isoY: number) => Math.cos(yAngle) * isoY;

    const isoYToCarX = (isoY: number) => Math.sin(yAngle) * isoY;
    const isoXToCarY = (isoX: number) => Math.sin(xAngle) * isoX;

    const isoToCar = (isoPoint: IPointData): IPointData => ({
        x: isoXToCarX(isoPoint.x) - isoYToCarX(isoPoint.y),
        y: isoYToCarY(isoPoint.y) + isoXToCarY(isoPoint.x)
    });

    return { isoToCar }
};
