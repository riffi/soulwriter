import {ICharacterGroup} from "../../../entities/Character";
import {db} from "../../../entities/Db/model/Db";
import {useLiveQuery} from "dexie-react-hooks";
import {Dialog} from "antd-mobile";

export const useCharacterGroupManager = () => {

    const characterGroups = useLiveQuery(() => db.characterGroups.toArray())

    const onSaveNewGroup = (title: string) => {
        const characterDistAttribute: ICharacterGroup = {
            title
        }
        db.characterGroups.add(characterDistAttribute)
    }

    const onChangeGroup = (newGroupData: ICharacterGroup) => {
        db.characterGroups.update(newGroupData.id, {...newGroupData})
    }

    const isGroupDeletionAllowed = async (groupId: number): Promise<boolean> => {
         const count = await db.characters
            .where('groupId')
            .equals(groupId.toString())
            .count()
        return count === 0
    };

    const onDeleteGroup = async (groupId: number) => {

        if (await isGroupDeletionAllowed(groupId)){
            db.characterGroups.delete(groupId)
        }
        else{
            Dialog.show({
                content: 'В группе уже есть персонажи',
                closeOnMaskClick: true,
            })
        }
    }

    return {
        characterGroups,
        onSaveNewGroup,
        onChangeGroup,
        onDeleteGroup
    }
}
