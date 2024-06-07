import {IEnumerable} from "@shared/model/types.ts";

export interface IMeasureKind extends IEnumerable{
    id?: number
    title: string
    bookId: number
}

export interface IMeasure extends IEnumerable{
    id?: number
    title: string
    shortTitle: string
    description: string
    kindId: number
}

export interface IMeasureRadio{
    id?: number
    measureId: number
    targetMeasureId: number
    targetMeasureData?: IMeasure
    ratio: number
}
