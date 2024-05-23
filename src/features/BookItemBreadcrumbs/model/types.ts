import {IBookItem} from "@entities/BookItem";

export interface IBookItemBreadcrumbsProps{
    bookItemId: number,
    onClickItem: (bookItem: IBookItem) => void
    onClickTop?: () => void
}
