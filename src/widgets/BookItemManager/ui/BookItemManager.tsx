import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {BookItemList, BookItemListMode} from "@features/bookItem/BookItemList";
import {useState} from "react";
import {Card, Checkbox, List, SearchBar} from "antd-mobile";

export const BookItemManager = () => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const [searchStr, setSearchStr] = useState<string>("")
    const [needMention, setNeedMention] = useState<boolean>(false)


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

            <Checkbox
                style={{marginTop: '10px', marginBottom: '10px'}}
                checked={needMention}
                onChange={(val) => setNeedMention(val)}
            >Нужно упомянуть</Checkbox>
            <BookItemList
                parentId={-1}
                bookId={currentBook?.id}
                header={"Описание мира"}
                mode={(searchStr !== "" || needMention) ? BookItemListMode.SEARCH : BookItemListMode.CHILDREN}
                searchStr={searchStr}
                needMention={needMention}
            />
            </Card>

    </>
    )
}
