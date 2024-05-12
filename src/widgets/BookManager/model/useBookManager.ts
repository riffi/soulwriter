import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db.ts";
import {IBook} from "../../../entities/Book";

export const useBookManager = () => {
    const bookList = useLiveQuery(() => db.books.toArray())

    const onSaveNewBook = (bookData: IBook) => {
        db.books.add(bookData).then((id)=>{
            db.characterAttributeDict.bulkAdd([
                {title: 'Рост', bookId: id},
                {title: 'Отличительная особенность', bookId: id},
                {title: 'Стиль одежды', bookId: id},
                {title: 'Телосложение', bookId: id},
                {title: 'Прическа', bookId: id},
                {title: 'Черты лица', bookId: id},
                {title: 'Цвет глаз', bookId: id},
                {title: 'Этническая принадлежность', bookId: id},
                {title: 'Возраст', bookId: id},
            ])
            db.characterGroups.add({title: 'Основные', bookId: id})
            db.worlds.add({title: 'Наша вселенная', description: 'Наша вселенная', bookId: id})
        })



    }

    return {
        bookList,
        onSaveNewBook
    }
}