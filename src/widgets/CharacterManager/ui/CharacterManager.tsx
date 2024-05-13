import {useCharactersManager} from "../model/useCharacterManager.ts";
import {Tabs} from "antd-mobile";
import {CharactersByGroup} from "../../../features/CharactersByGroup";
import {ICharacterGroup} from "../../../entities/Character";
import {ICharacterManagerProps} from "../model/types.ts";

export const CharacterManager = (props: ICharacterManagerProps) => {

    const {characterGroupList} = useCharactersManager(props.bookId)


    if (!characterGroupList) return

    return (
        <>
            <div>
                <Tabs style={{"--title-font-size": "14px"}}>
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
