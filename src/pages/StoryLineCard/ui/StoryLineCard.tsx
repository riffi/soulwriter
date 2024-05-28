import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {StoryLineViewForm} from "@widgets/StoryLineViewForm";
import {RootState} from "../../../store.ts";
export const StoryLineCard = () => {
    const [searchParams] = useSearchParams();
    const storyLineId = Number(searchParams.get('id'))
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>
    return (
        <>
            <StoryLineViewForm storyLineId={storyLineId} book={currentBook}/>
        </>
    )
}
