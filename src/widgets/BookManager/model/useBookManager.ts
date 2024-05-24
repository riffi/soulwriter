import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IBook} from "@entities/Book";
import {CharacterAttributeDataType, CharacterAttributeSection} from "@entities/Character";

export const useBookManager = () => {
    const bookList = useLiveQuery(() => db.books.toArray())

    const onSaveNewBook = (bookData: IBook) => {
        db.books.add(bookData).then((id)=>{
            db.characterAttributeDict.bulkAdd([
                {title: 'Рост', bookId: id, dataType: CharacterAttributeDataType.STRING, section: CharacterAttributeSection.APPEARANCE},
                {title: 'Отличительная особенность', bookId: id,dataType: CharacterAttributeDataType.STRING, section: CharacterAttributeSection.APPEARANCE},
                {title: 'Стиль одежды', bookId: id, dataType: CharacterAttributeDataType.STRING, section: CharacterAttributeSection.APPEARANCE},
                {title: 'Телосложение', bookId: id, dataType: CharacterAttributeDataType.STRING, section: CharacterAttributeSection.APPEARANCE},
                {title: 'Прическа', bookId: id, dataType: CharacterAttributeDataType.STRING, section: CharacterAttributeSection.APPEARANCE},
                {title: 'Черты лица', bookId: id, dataType: CharacterAttributeDataType.STRING, section: CharacterAttributeSection.APPEARANCE},
                {title: 'Цвет глаз', bookId: id, dataType: CharacterAttributeDataType.STRING, section: CharacterAttributeSection.APPEARANCE},
                {title: 'Этническая принадлежность', bookId: id, dataType: CharacterAttributeDataType.STRING, section: CharacterAttributeSection.APPEARANCE},
                {title: 'Возраст', bookId: id, dataType: CharacterAttributeDataType.STRING, section: CharacterAttributeSection.APPEARANCE},
            ])
            db.characterGroups.add({title: 'Основные', bookId: id})
        })



    }

    return {
        bookList,
        onSaveNewBook
    }
}
