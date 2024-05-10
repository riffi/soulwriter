import {ICharacterDictAttribute, ICharacterGroup} from "../../../entities/Character";
import {db} from "../../../entities/Db/model/Db";
import {useLiveQuery} from "dexie-react-hooks";
import {Dialog} from "antd-mobile";

export const useCharacterAttributeManager = () => {

    const characterAttributeDict = useLiveQuery(() => db.characterAttributeDict.toArray())

    const onSaveNewAttribute = (title: string) => {
        const characterDistAttribute: ICharacterDictAttribute = {
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
