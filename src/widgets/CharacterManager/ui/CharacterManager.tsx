import {useCharactersManager} from "../model/useCharacterManager.ts";
import {Tabs} from "antd-mobile";
import {CharactersByGroup} from "../../../features/CharactersByGroup";
import {ICharacterGroup} from "../../../entities/Character";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";

export const CharacterManager = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    const {characterGroupList} = useCharactersManager(currentBook?.id)


    if (!characterGroupList) return

    return (
        <>
            <div>
                <Tabs initialPage={0}>
                    {characterGroupList?.map((characterGroup: ICharacterGroup) =>  (
                    <Tabs.Tab
                        key={characterGroup.id}
                        title={characterGroup.title}
                    >
                        <CharactersByGroup characterGroupId={characterGroup.id}/>
                    </Tabs.Tab>
                ))}
                </Tabs>

            </div>
        </>
    )
}
