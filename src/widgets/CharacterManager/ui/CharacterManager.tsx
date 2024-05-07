import {useCharactersManager} from "../model/useCharacterManager.ts";
import styled from "../../../pages/Characters/ui/Characters.module.scss";
import {Tabs} from "antd-mobile";
import {CharactersByGroup} from "../../../features/CharactersByGroup";

export const CharacterManager = () => {
    const {useCharacterGroupList} = useCharactersManager()

    return (
        <>
            <div className={styled.charactersPage}>
                <Tabs tabIndex={0}>
                    {useCharacterGroupList?.data?.map((characterGroup) =>  (
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
