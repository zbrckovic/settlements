import { Container, Graphics, Sprite } from 'pixi.js';
import { calculateRegularPolygonPoints, createPoint } from './geometry';
import { addPointsToGraphics } from './pixi-utils';
import { Board, Tile } from './game/board';
import { BoardScreenBundle } from './assets';
import { Plane } from './geometry/plane';

export interface BoardRenderer {
    renderBoard: (board: Board) => Container;
}

export const createBoardRenderer = (bla = false, plane: Plane, assets: BoardScreenBundle): BoardRenderer => {
    const tileSide = 40;
    const hexRotation = Math.PI / 6;

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
        const container = new Container();

        const tileWidth = 2 * Math.sqrt(Math.pow(tileSide, 2) - Math.pow(tileSide / 2, 2));
        const tileRoofHeight = Math.sqrt(Math.pow(tileSide, 2) - Math.pow(tileWidth / 2, 2));

        const tileVerticalOffset = createPoint(
            -tileWidth / 2,
            2 * tileSide - tileRoofHeight
        ).map(plane.project);

        const tileHorizontalOffset = createPoint(
            tileWidth,
            0
        ).map(plane.project);

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

        container.addChild(createAxes());


        const sprite = new Sprite(assets.colors);
        sprite.scale.set(0.3, 0.3);
        sprite.anchor.set(0.5, 0.5);
        sprite.rotation = Math.PI / 2;
        const position = createPoint(0, 0).map(plane.project);

        sprite.position.set(position.x, position.y);

        const c = new Container();
        c.addChild(sprite);
        c.skew.set(Math.PI / 2 - plane.angleBetweenAxes, 0);

        container.addChild(c);


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

        if (tile === Tile.Desert) {
            const sprite = new Sprite(assets.hex);
            sprite.rotation = hexRotation + plane.tiltAngle;
            sprite.scale.set(0.1, 0.1);
            sprite.anchor.set(0.5, 0.5);

            const c = new Container();

            c.addChild(sprite);

            if (bla) {
                c.skew.set(Math.PI / 2 - plane.angleBetweenAxes, 0);
            }

            container.addChild(c);
        }

        return container;
    };

    return { renderBoard };
};


