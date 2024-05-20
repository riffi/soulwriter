import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "../../../../features/NeedSelectBook";
import {SceneManager} from "../../../../widgets/scene/SceneManager";

export const Scenes = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return <SceneManager bookId={currentBook.id}/>
}