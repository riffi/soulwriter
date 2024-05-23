import {IBook} from "../../../../entities/Book";

export interface SceneManagerProps{
    book: IBook
}

export enum SceneManagerMode{
    BASIC = 'BASIC',
    REORDER = 'REORDER'
}

export enum ISceneShiftDirection{
    UP = 'UP',
    DOWN = 'DOWN'
}
