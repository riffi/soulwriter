import {IEnumerable} from "@shared/model/types.ts";

export interface IBook extends IEnumerable{
    id?: number
    title: string
    description?: string
    author?: string
    targetSymbolCount?: number
    dateStart?: string
}
