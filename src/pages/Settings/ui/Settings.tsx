import React, {useState} from "react";
import {TabBar, Tabs} from "antd-mobile";
import {CharacterAttributeManager} from "../../../widgets/CharacterAttributeManager";

export const Settings = () => {
    return (
        <>
            <Tabs tabIndex={0}>
                <Tabs.Tab
                    tabIndex={0}
                    key={"characterAttributeDict"}
                    title={"Персонажи"}
                >
                    <CharacterAttributeManager/>
                </Tabs.Tab>
                <Tabs.Tab
                    tabIndex={1}
                    key={"Base"}
                    title={"Общее"}
                />
            </Tabs>
        </>
    )
}
