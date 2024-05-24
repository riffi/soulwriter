import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";

export const useBookItemLinks = (bookItemId: number) => {


    const bookItemLinkList = useLiveQuery(async () => {
        const bookItemLinks = await db.sceneLinks
            .where('bookItemId')
            .equals(bookItemId)
            .toArray()

            await Promise.all (bookItemLinks?.map (async link => {
                if (link.bookItemId){
                    [link.sceneData] = await Promise.all([
                        db.scenes.get(link.sceneId)
                    ]);
                }
            }))

            // Заполняем линки связями с персонажами и их данными
            await Promise.all (bookItemLinks?.map (async link => {
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

            return bookItemLinks.sort(
                (a,b) => {
                    return a.sceneData?.sortOrderId - b.sceneData?.sortOrderId
                }
            )

        }, [bookItemId]
    )

    return {
        bookItemLinkList
    }
}
