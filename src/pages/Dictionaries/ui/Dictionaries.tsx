import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {Tabs} from "antd-mobile";
import {CharacterAttributeManager} from "@widgets/CharacterAttributeManager";
import {CharacterGroupManager} from "@widgets/CharacterGroupManager";

export const Dictionaries = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <>
            <Tabs tabIndex={0}  style={{"--title-font-size": "14px"}}>
                <Tabs.Tab
                    key={"characterAttributeDict"}
                    title={"Атрибуты персонажей"}
                >
                    <CharacterAttributeManager bookId={currentBook.id}/>
                </Tabs.Tab>
                <Tabs.Tab
                    tabIndex={1}
                    key={"characterGroupDict"}
                    title={"Группы персонажей"}>
                    <CharacterGroupManager bookId={currentBook.id}/>
                </Tabs.Tab>

            </Tabs>
        </>
    )
}
