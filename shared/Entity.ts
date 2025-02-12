import { Direction } from './mobile';
import { Point3D } from './Geometry';
import { BaseMap } from './world';


export interface IEntity {
    ID: number;
    Name: String;
    Deleted: boolean;
    Visible: boolean;
    Location: Point3D;
    Direction: Direction;
    // Map: Map;
    Delete(): void;
    ProcessDelta(): void;
}

export class MapID { }

export abstract class Entity implements IEntity {
    private id: number;
    private name: string;
    private deleted: boolean = false;
    private visible: boolean = false;
    private location: Point3D = new Point3D(0, 0, 0);
    private direction: Direction = Direction.North;
    private map: BaseMap = null;

    public get ID(): number {
        // if (this.id > Number.MAX_SAFE_INTEGER) {
        //     console.error('ID Exceeds safe int.');
        // }

        return this.id;
    }
    public set ID(id: number) {
        // if (this.id > Number.MAX_SAFE_INTEGER) {
        //     console.error('ID Exceeds safe int.');
        // }

        this.id = id;
    }

    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }

    public get Deleted(): boolean {
        return this.deleted;
    }

    public get Visible(): boolean {
        return this.visible;
    }
    public set Visible(visible: boolean) {
        this.visible = visible;
    }

    public get Location(): Point3D {
        return this.location;
    }
    public set Location(point: Point3D) {
        this.location.X = point.X;
        this.location.Y = point.Y;
        this.location.Z = point.Z;
    }

    public get Direction(): Direction {
        return this.direction;
    }
    public set Direction(direction: Direction) {
        this.direction = direction;
    }

    public get Map(): BaseMap {
        return this.map;
    }

    public get X(): number {
        return this.location.X;
    }

    public get Y(): number {
        return this.location.Y;
    }

    public get Z(): number {
        return this.location.Z;
    }

    constructor() {

    }

    public Clone(): any {
        let cloneObj = new (<any>this.constructor)();
        for (let attribut in this) {
            if (typeof this[attribut] === "object") {
                cloneObj[attribut] = this.Clone();
            } else {
                cloneObj[attribut] = this[attribut];
            }
        }
        return cloneObj;
    }

    public DistanceTo(point: Point3D): number {
        return this.Location.Distance(point);
    }

    public InRange(point: Point3D, range: number): boolean {
        return range <= this.DistanceTo(point);
    }

    public Delete(): void {
        this.deleted = true;
    }

    public ProcessDelta(): void {

    }
}
