import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {BookItemList, BookItemListMode} from "@features/bookItem/BookItemList";
import {useState} from "react";
import {Card, SearchBar} from "antd-mobile";

export const BookItemManager = () => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const [searchStr, setSearchStr] = useState<string>("")

    return (
        <>
            <Card>
            <SearchBar
                placeholder={"Поиск"}
                clearable={true}
                onChange={(val) => {
                    setSearchStr(val)
                }}
            />
            <BookItemList
                parentId={-1}
                bookId={currentBook?.id}
                header={"Описание мира"}
                mode={searchStr == "" ? BookItemListMode.CHILDREN : BookItemListMode.SEARCH}
                searchStr={searchStr}
            />
            </Card>

    </>
    )
}
