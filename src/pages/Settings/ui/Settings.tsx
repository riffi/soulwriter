import React, {useState} from "react";
import {TabBar, Tabs} from "antd-mobile";
import {CharacterAttributeManager} from "../../../widgets/CharacterAttributeManager";
import {CharacterGroupManager} from "../../../widgets/CharacterGroupManager/ui/CharacterGroupManager.tsx";

export const Settings = () => {
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
