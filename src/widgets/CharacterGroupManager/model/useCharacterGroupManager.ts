import {ICharacterGroup} from "@entities/Character";
import {db} from "@entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {Dialog} from "antd-mobile";
import {IBook} from "@entities/Book";

export const useCharacterGroupManager = (book?: IBook) => {

    const characterGroups = useLiveQuery(() => db.characterGroups
        .where("bookId")
        .equals(book?.id)
        .toArray())

    const onSaveNewGroup = (title: string) => {
        const characterDistAttribute: ICharacterGroup = {
            bookId: book?.id,
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
            .equals(groupId)
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
