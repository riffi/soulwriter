import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {BookItemList} from "../../../features/BookItemList";

export const WorldManager = () => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)


    return (
        <>
            <BookItemList
                parentId={-1}
                bookId={currentBook?.id}
                header={"Описание мира"}
            />

    </>
    )
}