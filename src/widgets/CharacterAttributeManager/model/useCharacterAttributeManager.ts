import {ICharacterDictAttribute} from "@entities/Character";
import {db} from "@entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {Dialog} from "antd-mobile";

export const useCharacterAttributeManager = (bookId: number) => {

    const characterAttributeDict = useLiveQuery(() => db.characterAttributeDict
        .where("bookId")
        .equals(bookId)
        .toArray())

    const onSaveNewAttribute = (title: string) => {
        const characterDistAttribute: ICharacterDictAttribute = {
            bookId: bookId,
            title
        }
        db.characterAttributeDict.add(characterDistAttribute)
    }

    const onSaveAttribute = async (attrData: ICharacterDictAttribute) => {
        if (!attrData.id){
            db.characterAttributeDict.add(attrData)
        }
        else{
            db.characterAttributeDict.update(attrData.id, {...attrData})
        }
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
        onDeleteAttribute,
        onSaveAttribute
    }
}
