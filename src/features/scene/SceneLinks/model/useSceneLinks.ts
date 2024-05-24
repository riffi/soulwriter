import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {ISceneLink} from "@entities/Scene";
import {Dialog, Toast} from "antd-mobile";
import {ICharacterLink} from "@entities/Character";

export const useSceneLinks = (bookId: number, sceneId: number, newBookItemId?: number) => {

    const sceneLinkList = useLiveQuery(async () => {
        const sceneLinks = await db.sceneLinks
            .where('sceneId')
            .equals(sceneId)
            .toArray()

            // Заполняем линки связями данными из Базы знаний
            await Promise.all (sceneLinks?.map (async link => {
                if (link.bookItemId){
                    [link.bookItemData] = await Promise.all([
                        db.bookItems.get(link.bookItemId)
                    ]);
                }
            }))

            // Заполняем линки связями с персонажами и их данными
            await Promise.all (sceneLinks?.map (async link => {
                if (!link) return
                const characterLinks = await db.characterLinks
                    .where("sceneLinkId")
                    .equals(link.id)
                    .toArray()
                link.characterLinks = characterLinks

                await Promise.all (characterLinks.map(async (charLink) => {
                    charLink.character = await db.characters.get(charLink.characterId)
                }))
            }))

            return sceneLinks

        }, [sceneId]
    )

    const newBookItemData = useLiveQuery(() => {
        if (newBookItemId){
            return db.bookItems.get(newBookItemId)
        }
        else{
            return undefined
        }

    }, [newBookItemId])



    const saveLink = async (link: ISceneLink) => {
        const saveData = {...link}

        // Удаляем лишние данные, полученные по связи, @TODO переделать на мапперы
        saveData.sceneData = undefined
        saveData.bookItemData = undefined
        saveData.characterLinks = undefined


        if (!saveData.id){
            return db.sceneLinks.add(saveData)
        }
        else{
            return db.sceneLinks.update(saveData.id, {...saveData})
        }
    }

    const appendCharacterLink = async (link: ICharacterLink) => {
        const saveData = {...link}
        saveData.character = undefined
        return db.characterLinks.add(saveData);
    }

    const removeCharacterLink = async (link: ICharacterLink)=> {
        db.characterLinks.delete(link.id)
    }

    const onDeleteLink = (link: ISceneLink) => {
        if (link.id){
            const linkTitle = `${link.title}`
            Dialog.alert({
                content: `Удалить связь ${linkTitle} ?`,
                title: `Подтверждение`,
                closeOnMaskClick: true,
                onConfirm: () => {
                    db.transaction('rw', db.sceneLinks, async () => {
                        await db.sceneLinks.delete(link.id)
                    }).then(() => {
                        Toast.show({
                            icon: 'success',
                            content: `Связь ${linkTitle} удалена`,
                            position: 'bottom',
                        })

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
    }

    return {
        sceneLinkList,
        saveLink,
        onDeleteLink,
        appendCharacterLink,
        removeCharacterLink,
        newBookItemData
    }

}
