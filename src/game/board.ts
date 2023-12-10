export enum Tile {
    Empty,
    Water,
    Mountains,
    Hills,
    Forest,
    Plains,
    Desert,
}

type Row = ReadonlyArray<Tile | undefined>;
type Rows = ReadonlyArray<Row>;

export interface Board {
    readonly tiles: Rows;
}
