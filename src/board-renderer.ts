import { Container, Graphics, Text } from 'pixi.js';
import { Projection } from './geometry/projection';
import { calculateRegularPolygonPoints, createPoint } from './geometry';
import { addPointsToGraphics } from './pixi-utils';
import { Board, Tile } from './game/board';

export interface BoardRenderer {
    renderBoard: (board: Board) => Container;
}

export const createBoardRenderer = (projection: Projection = p => p): BoardRenderer => {
    const tileSide = 20;

    const renderBoard = (board: Board): Container => {
        const container = new Container();

        const tileWidth = 2 * Math.sqrt(Math.pow(tileSide, 2) - Math.pow(tileSide / 2, 2))
        const tileRoofHeight = Math.sqrt(Math.pow(tileSide, 2) - Math.pow(tileWidth/2, 2));

        const tileVerticalOffset = createPoint(
            -tileWidth / 2,
            2 * tileSide - tileRoofHeight
        ).map(projection);

        const tileHorizontalOffset = createPoint(
            tileWidth,
            0
        ).map(projection);

        let rowPosition = createPoint(0, 0);
        board.tiles.forEach((row, rowIndex) => {
            const verticalOffset = tileVerticalOffset.multiply(rowIndex);

            row.forEach((tile, colIndex) => {
                const horizontalOffset = tileHorizontalOffset.multiply(colIndex);

                const p = rowPosition.add(verticalOffset).add(horizontalOffset);

                const tileContainer = renderTile(tile);
                tileContainer.position.set(p.x, p.y);
                container.addChild(tileContainer);
            });
        });

        return container;
    };

    const calculateTileColor = (tile?: Tile): number => {
        if (tile === undefined) return 0x000000;

        switch (tile) {
            case Tile.Water:
                return 0x0000ff;
            case Tile.Mountains:
                return 0x00ff00;
            case Tile.Hills:
                return 0x00ffff;
            case Tile.Forest:
                return 0xff0000;
            case Tile.Plains:
                return 0xff00ff;
            case Tile.Desert:
                return 0xffff00;
        }
    }

    const renderTile = (tile?: Tile): Container => {
        const container = new Container();

        const color = calculateTileColor(tile);

        const center = createPoint(0, 0);

        const hexPoints = calculateRegularPolygonPoints(center, tileSide, 6, Math.PI / 6);

        container.addChild(
            addPointsToGraphics(
                new Graphics().beginFill(color),
                hexPoints.map(projection)
            )
        );

        return container;
    };

    return { renderBoard };
};


