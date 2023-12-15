/**
 * Used to identify the position of a tile on the board.
 */
export const coordinates = (
    /**
     * Column index which in non-isometric view grows in the right direction.
     */
    x,
    /**
     * row index which in non-isometric view grows in the down-left direction.
     */
    y
) => {
    const withX = (x) => coordinates(x, y);
    const withY = (y) => coordinates(x, y);

    return ({x, y, withX, withY});
};
