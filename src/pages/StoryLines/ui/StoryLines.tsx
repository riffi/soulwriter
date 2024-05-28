import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {StoryLineManager} from "@widgets/StoryLineManager/ui/StoryLineManager.tsx";


export const StoryLines = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <>
          <StoryLineManager bookId={currentBook.id}/>
        </>
    )
}
