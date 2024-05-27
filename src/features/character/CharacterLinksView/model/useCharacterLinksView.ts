import {db} from "@entities/Db/model/Db";
import {useLiveQuery} from "dexie-react-hooks";
import {ISceneLink} from "@entities/Scene";

export const useCharacterLinksView = (characterId: number) => {

    const sceneLinkIdList = useLiveQuery(async () => {
        const charLinks = await db.characterLinks
        .where("characterId")
        .equals(characterId)
        .toArray()
        return charLinks.map(link => link.sceneLinkId)
    }, [characterId])


    const sceneLinks = useLiveQuery(async () => {
        if (!sceneLinkIdList) return

        return db.sceneLinks
            .where("id")
            .anyOf(...sceneLinkIdList)
            .toArray();

    }, [sceneLinkIdList])

    const scenes = useLiveQuery(async () => {
        if (!sceneLinks) return

        return db.scenes
            .where("id")
            .anyOf(...sceneLinks.map((sceneLink) => sceneLink.sceneId))
            .toArray()

    }, [sceneLinks])

    const bookItems = useLiveQuery(async () => {
        if (!sceneLinks) return
        const bookItemIds = sceneLinks.reduce<number[]>((bookItemIds, sceneLink) => {
            if (sceneLink.bookItemId) bookItemIds.push(sceneLink?.bookItemId)
            return bookItemIds
        }, [])

        return db.bookItems
            .where("id")
            .anyOf(...bookItemIds)
            .sortBy("type")

    }, [sceneLinks])


    const getSceneDataByLink = (link: ISceneLink) => {
        return scenes?.find((scene) => scene.id === link.sceneId)
    }

    const getBookItemByLink = (link: ISceneLink) => {
        return bookItems?.find((bookItem) => bookItem.id === link.bookItemId)
    }


    return {
        sceneLinks,
        scenes,
        getBookItemByLink,
        getSceneDataByLink,
     //   sortedSceneLinks,
        bookItems
    }
}
