import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {SceneViewForm} from "@widgets/scene/SceneViewForm";

export const SceneCard = () => {
    const [searchParams] = useSearchParams();
    const sceneId = Number(searchParams.get('id'))
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <>
            <SceneViewForm sceneId={sceneId} bookId={currentBook?.id}/>
        </>
    )
}
