import { Container, Graphics, PI_2, Sprite, Text } from 'pixi.js';
import { Projection } from './geometry/projection';
import { calculateRegularPolygonPoints, createPoint } from './geometry';
import { addPointsToGraphics } from './pixi-utils';
import { Board, Tile } from './game/board';
import { AssetsLibrary, BoardScreenBundle } from './assets';

export interface BoardRenderer {
    renderBoard: (board: Board) => Container;
}

export const createBoardRenderer = (bla = false, assets: BoardScreenBundle, projection: Projection = p => p): BoardRenderer => {
    const tileSide = 40;
    const hexRotation = Math.PI / 6;

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

                if (tile === undefined) return;

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

        if (tile === Tile.Desert) {
            const c = new Container();

            const sprite = new Sprite(assets.hex)
            sprite.scale.set(0.1, 0.1);
            sprite.anchor.set(0.5, 0.5);
            c.addChild(sprite);
            container.addChild(c);

            if (bla) {
                sprite.skew.set(0, Math.PI / 6);
                c.skew.set(0, 0);
                c.rotation = -Math.PI / 3;
            }
        }

        return container;
    };

    return { renderBoard };
};


