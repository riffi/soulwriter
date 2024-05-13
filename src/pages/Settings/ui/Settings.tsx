import {Tabs} from "antd-mobile";
import {CharacterAttributeManager} from "../../../widgets/CharacterAttributeManager";
import {CharacterGroupManager} from "../../../widgets/CharacterGroupManager/ui/CharacterGroupManager.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {NeedSelectBook} from "../../../features/NeedSelectBook";
import React from "react";

export const Settings = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <>
            <Tabs tabIndex={0}>
                <Tabs.Tab
                    key={"characterAttributeDict"}
                    title={"Атрибуты"}
                >
                    <CharacterAttributeManager/>
                </Tabs.Tab>
                <Tabs.Tab
                    tabIndex={1}
                    key={"characterGroupDict"}
                    title={"Группы"}>
                    <CharacterGroupManager/>
                </Tabs.Tab>
            </Tabs>
        </>
    )
}
