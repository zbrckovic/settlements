import { Container, Graphics, Sprite } from 'pixi.js';
import { calculateRegularPolygonPoints, createPoint } from './geometry';
import { addPointsToGraphics } from './pixi-utils';
import { Board, Tile } from './game/board';
import { BoardScreenBundle } from './assets';
import { Plane } from './geometry/plane';
import { tileRoofHeight, tileSide, tileWidth } from './rendering-const';

export interface BoardRenderer {
    renderBoard: (board: Board) => Container;
}

export const createBoardRenderer = (plane: Plane, assets: BoardScreenBundle): BoardRenderer => {
    const hexRotation = Math.PI / 6;

    /**
     * For debugging
     */
    const createAxes = (): Container => {
        const container = new Container();
        const thickness = 2;
        const axisLength = 1000;

        const xDestination = createPoint(axisLength, 0).map(plane.project);
        const yDestination = createPoint(0, axisLength).map(plane.project);

        container.addChild(
            new Graphics()
                .lineStyle(thickness, 0xff0000)
                .moveTo(0, 0)
                .lineTo(xDestination.x, xDestination.y),
            new Graphics()
                .lineStyle(thickness, 0x00ff00)
                .moveTo(0, 0)
                .lineTo(yDestination.x, yDestination.y)
        );
        return container;
    };

    const renderBoard = (board: Board): Container => {
        const boardContainer = new Container();

        // How much to move downwards to position the tile in the next row.
        const tileVerticalOffset = createPoint(-tileWidth / 2, 2 * tileSide - tileRoofHeight)
            .map(plane.project);

        // How much to move to the right to position the tile in the next column.
        const tileHorizontalOffset = createPoint(tileWidth, 0).map(plane.project);

        const topLeftTilePosition = createPoint(0, 0);
        board.tiles.forEach((row, rowIndex) => {
            const verticalOffset = tileVerticalOffset.multiply(rowIndex);

            row.forEach((tile, colIndex) => {
                if (tile === undefined) return;

                const horizontalOffset = tileHorizontalOffset.multiply(colIndex);
                const tilePosition = topLeftTilePosition.add(verticalOffset).add(horizontalOffset);
                const tileContainer = renderTile(tile);
                tileContainer.position.set(tilePosition.x, tilePosition.y);
                boardContainer.addChild(tileContainer);
            });
        });

        boardContainer.addChild(createAxes());


        return boardContainer;
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
    };

    const renderTile = (tile?: Tile): Container => {
        const container = new Container();

        const color = calculateTileColor(tile);

        const center = createPoint(0, 0);

        const hexPoints = calculateRegularPolygonPoints(center, tileSide, 6, Math.PI / 6);

        container.addChild(
            addPointsToGraphics(
                new Graphics().beginFill(color),
                hexPoints.map(plane.project)
            )
        );

        const sprite = new Sprite(assets.hex);
        sprite.rotation = hexRotation;
        sprite.scale.set(0.15, 0.15);
        sprite.anchor.set(0.5, 0.5);

        const spriteContainer = new Container();

        spriteContainer.addChild(sprite);
        spriteContainer.skew.set(Math.PI / 2 - plane.angleBetweenAxes, 0);
        spriteContainer.rotation = plane.tiltAngle;

        container.addChild(spriteContainer);

        return container;
    };

    return { renderBoard };
};


