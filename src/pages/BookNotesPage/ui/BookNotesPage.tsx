import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {BookNotesManager} from "@widgets/BookNotesManager";

export const BookNotesPage = () => {
  const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

  if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>
  return (
      <>
        <BookNotesManager bookId={currentBook.id}/>
      </>
  )
}
