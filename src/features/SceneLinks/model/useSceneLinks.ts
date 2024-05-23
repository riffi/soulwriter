import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {ISceneLink} from "@entities/Scene";
import {Dialog, Toast} from "antd-mobile";

export const useSceneLinks = (bookId: number, sceneId: number, newBookItemId?: number) => {

    const sceneLinkList = useLiveQuery(async () => {
        const sceneLinks = await db.sceneLinks
            .where('sceneId')
            .equals(sceneId)
            .toArray()

            await Promise.all (sceneLinks?.map (async link => {
                if (link.bookItemId){
                    [link.bookItemData] = await Promise.all([
                        db.bookItems.get(link.bookItemId)
                    ]);
                }
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



    const onSubmitLink = (link: ISceneLink) => {
        if (!link.id){
            db.sceneLinks.add(link)
        }
        else{
            db.sceneLinks.update(link.id, {...link})
        }
    }

    const onDeleteLink = (link: ISceneLink) => {
        if (link.id){
            const linkTitle = `${link.type} : ${link.title}`
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
        onSubmitLink,
        onDeleteLink,
        newBookItemData
    }

}
