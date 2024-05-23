import {Tabs} from "antd-mobile";
import {GeneralSettings} from "@features/GeneralSettings/ui/GeneralSettings.tsx";

export const Settings = () => {


    return (
        <>
            <Tabs tabIndex={0}  style={{"--title-font-size": "14px"}}>
                <Tabs.Tab
                    tabIndex={1}
                    key={"generalSettings"}
                    title={"Основное"}>
                    <GeneralSettings/>
                </Tabs.Tab>
            </Tabs>
        </>
    )
}
