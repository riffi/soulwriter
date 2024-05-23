import {ICharacterDictAttribute} from "@entities/Character";
import {db} from "@entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {Dialog} from "antd-mobile";
import {IBook} from "@entities/Book";

export const useCharacterAttributeManager = (book?: IBook) => {

    const characterAttributeDict = useLiveQuery(() => db.characterAttributeDict
        .where("bookId")
        .equals(book?.id)
        .toArray())

    const onSaveNewAttribute = (title: string) => {
        const characterDistAttribute: ICharacterDictAttribute = {
            bookId: book?.id,
            title
        }
        db.characterAttributeDict.add(characterDistAttribute)
    }

    const onChangeAttribute = (newAttributeData: ICharacterDictAttribute) => {
        db.characterAttributeDict.update(newAttributeData.id, {...newAttributeData})
    }


    const onDeleteAttribute = async (id: number) => {
            Dialog.show({
                content: 'Удалить атрибут?',
                closeOnMaskClick: true,
                closeOnAction: true,
                actions:[
                    {
                        key: 'delete',
                        text:'Удалить',
                        onClick: () => db.characterAttributeDict.delete(id)
                    },
                    {
                        key: 'cancel',
                        text:'Отмена',
                        onClick: () => (undefined)
                    }

                ]
            })
    }

    return {
        characterAttributeDict,
        onSaveNewAttribute,
        onChangeAttribute,
        onDeleteAttribute
    }
}
