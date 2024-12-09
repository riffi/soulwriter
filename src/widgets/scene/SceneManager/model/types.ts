import {IBook} from "@entities/Book";

export interface SceneManagerProps{
    book: IBook
}

export enum SceneManagerMode{
    BASIC = 'BASIC',
    REORDER = 'REORDER'
}

export enum SceneManagerViewPoint{
    SCENES = 'SCENES',
    CHAPTERS = 'CHAPTERS'
}

export enum ISceneShiftDirection{
    UP = 'UP',
    DOWN = 'DOWN'
}
