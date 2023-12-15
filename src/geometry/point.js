export const createPoint = (x, y) => {
    const withX = (x) => createPoint(x, y);
    const withY = (y) => createPoint(x, y);

    const add = (other) => createPoint(x + other.x, y + other.y);

    const distanceTo = (other) => {
        const hDistance = other.x - x;
        const vDistance = other.y - y;
        return Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2));
    };

    const rotate = (pivot, angle) => {
        const hDistance = x - pivot.x;
        const vDistance = y - pivot.y;
        const radius = Math.sqrt(Math.pow(hDistance, 2) + Math.pow(vDistance, 2));
        // Angle between the horizontal line and the line connecting the pivot and the point
        const slant = Math.atan2(vDistance, hDistance);

        const newX = pivot.x + radius * Math.cos(slant + angle);
        const newY = pivot.y + radius * Math.sin(slant + angle);

        return createPoint(newX, newY);
    }

    const multiply = (factor) => createPoint(x * factor, y * factor);

    const map = (mapper) => mapper(createPoint(x, y));
    const mapX = (mapper) => withX(mapper(x));
    const mapY = (mapper) => withY(mapper(y));

    return {x, y, withX, withY, distanceTo, rotate, map, mapX, mapY, add, multiply};
};
