import {useCharactersManager} from "../model/useCharacterManager.ts";
import styled from "../../../pages/Characters/ui/Characters.module.scss";
import {Tabs} from "antd-mobile";
import {CharactersByGroup} from "../../../features/CharactersByGroup";
import {ICharacterGroup} from "../../../entities/Character";

export const CharacterManager = () => {
    const {characterGroupList} = useCharactersManager()

    if (!characterGroupList) return

    return (
        <>
            <div className={styled.charactersPage}>
                <Tabs initialPage={0}>
                    {characterGroupList?.map((characterGroup: ICharacterGroup) =>  (
                    <Tabs.Tab
                        key={characterGroup.id}
                        title={characterGroup.title}
                    >
                        <CharactersByGroup characterGroupId={String(characterGroup.id)}/>
                    </Tabs.Tab>
                ))}
                </Tabs>

            </div>
        </>
    )
}
