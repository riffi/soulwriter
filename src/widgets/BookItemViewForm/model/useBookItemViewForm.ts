import {db} from "@entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {IBookItem} from "@entities/BookItem";
import {Dialog, Toast} from "antd-mobile";
import { setDefaultConfig } from 'antd-mobile'
import ruRU from "antd-mobile/es/locales/ru-RU";
import {useNavigate} from "react-router-dom";

setDefaultConfig({
    locale: ruRU,
})

export const useBookItemViewForm = (bookId: number, bookItemId: number) => {
    const bookItem = useLiveQuery(() => db.bookItems.get(bookItemId), [bookItemId])

    const navigate = useNavigate()


    const childCount = useLiveQuery(() => db.bookItems
        .where("parentId")
        .equals(bookItemId)
        .count()
        , [bookItemId]
    )

    const mentionCount = useLiveQuery(() => db.sceneLinks
        .where("bookItemId")
        .equals(bookItemId)
        .count()
        , [bookItemId]
    )


    const changeBaseAttributeValue = (attributeName: string, newValue: string, bookItem?: IBookItem) => {
        if (bookItem){
            bookItem[attributeName] = newValue
            db.bookItems.update(bookItemId, {...bookItem})
        }
    }

    const changeAttributeValue = <T> (attributeName: string, newValue: T, bookItem?: IBookItem) => {
        if (bookItem){
            bookItem[attributeName] = newValue
            db.bookItems.update(bookItemId, {...bookItem})
        }
    }

    const deleteBookItem = async (bookItem: IBookItem)=> {
        const children = await db.bookItems.where("parentId").equals(bookItem.id).toArray()
        if (children.length > 0){
            children.forEach((child) => deleteBookItem(child))
        }
        const bookItemId = bookItem.id
        if (bookItemId){
            await db.sceneLinks.where("bookItemId").equals(bookItemId).delete()
            await db.bookItems.delete(bookItem.id)
        }
    }

    const moveBookItem = async (bookItem: IBookItem, toBookItemId: number) => {
        const existingCount = await db.bookItems.where('parentId').equals(toBookItemId).count()
        db.bookItems.update(bookItem.id, {...bookItem, parentId: toBookItemId, sortOrderId: existingCount})
    }

    const onDeleteBookItemQuery = async (bookItem: IBookItem) => {
        Dialog.alert({
            title: `Удалить ${bookItem.title} ?`,
            content: 'Внимание, будут удалены все детали и их связи!',
            closeOnMaskClick: true,
            onConfirm: () => {
                db.transaction('rw', db.bookItems, db.sceneLinks, async () => {
                    await deleteBookItem(bookItem)
                }).then(() => {
                    Toast.show({
                        icon: 'success',
                        content: `Описание ${bookItem.title} удалено`,
                        position: 'bottom',
                    })
                    if (bookItem.parentId != -1){
                        navigate(`/book-item/card?id=${bookItem?.parentId}`)
                    }
                    else{
                        navigate(`/book-items`)
                    }

                }).catch((error) => {
                    Dialog.alert({
                        title: 'Ошибка',
                        content: error.message,
                        closeOnMaskClick: true,
                    })
                })

            }
        })
    }


    const onMoveBookItemQuery = async (bookItem: IBookItem, toBookItemId: number) => {
        Dialog.alert({
            title: `Переместить`,
            content: `${bookItem.type} ${bookItem.title} ?`,
            closeOnMaskClick: true,
            onConfirm: () => {
                db.transaction('rw', db.bookItems, async () => {
                    await moveBookItem(bookItem, toBookItemId)
                }).then(() => {
                    Toast.show({
                        content: `Описание ${bookItem.title} перенесено`,
                        position: 'bottom',
                    })
                    if (toBookItemId != -1){
                        navigate(`/book-item/card?id=${toBookItemId}`)
                    }
                    else{
                        navigate(`/book-items`)
                    }

                }).catch((error) => {
                    Dialog.alert({
                        title: 'Ошибка',
                        content: error.message,
                        closeOnMaskClick: true,
                    })
                })

            }
        })
    }

    return {
        bookItem,
        childCount,
        mentionCount,
        onDeleteBookItemQuery,
        changeBaseAttributeValue,
        changeAttributeValue,
        onMoveBookItemQuery

    }
}
