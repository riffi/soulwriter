import {Tabs} from "antd-mobile";
import {GeneralSettings} from "@features/GeneralSettings/ui/GeneralSettings.tsx";
import {CharacterAttributeManager} from "@widgets/CharacterAttributeManager";
import {CharacterGroupManager} from "@widgets/CharacterGroupManager";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {MeasureKinds} from "@features/measure/MeasureKinds";
import {SceneStateDict} from "@features/scene/SceneStateDict/ui/SceneStateDict.tsx";

export const Settings = () => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)


    return (
        <>
            <Tabs tabIndex={0}  style={{"--title-font-size": "14px"}} defaultActiveKey={"generalSettings"}>
                {(currentBook && currentBook?.id) &&
                <>
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
                    <Tabs.Tab
                        tabIndex={1}
                        key={"measureKinds"}
                        title={"Единицы измерения"}>
                        <MeasureKinds bookId={currentBook.id}/>
                    </Tabs.Tab>
                    <Tabs.Tab
                        tabIndex={1}
                        key={"sceneStates"}
                        title={"Статусы сцен"}>
                      <SceneStateDict bookId={currentBook.id}/>
                    </Tabs.Tab>
                </>
                }
                <Tabs.Tab
                    tabIndex={1}
                    key={"generalSettings"}
                    title={"Общее"}>
                    <GeneralSettings/>
                </Tabs.Tab>
            </Tabs>
        </>
    )
}
