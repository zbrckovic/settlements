import { Container, Graphics } from 'pixi.js';
import { Projection } from './geometry/projection';
import { calculateRegularPolygonPoints, createPoint } from './geometry';
import { addPointsToGraphics } from './pixi-utils';

export const renderBoard = (projection: Projection = p => p): Container => {
    const container = new Container();

    const center = createPoint(100, 100);

    const hexPoints = calculateRegularPolygonPoints(center, 100, 6, Math.PI / 6);

    container.addChild(
        addPointsToGraphics(
            new Graphics().beginFill(0xff0000),
            hexPoints.map(projection),
        )
    );

    return container;
}
