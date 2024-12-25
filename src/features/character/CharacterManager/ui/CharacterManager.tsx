import {useCharactersManager} from "../model/useCharacterManager.ts";
import {Tabs} from "antd-mobile";
import {ICharacterGroup} from "@entities/Character";
import {ICharacterManagerProps} from "../model/types.ts";
import {CharactersByGroup} from "./CharactersByGroup.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {setCurrentCharacterGroup} from "@features/character/CharacterContext/characterContextSlice.ts";
import {EditFill, FillinOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";

enum ESpecialActions{
    GO_TO_SETTINGS= 'GO_TO_SETTINGS'
}
export const CharacterManager = (props: ICharacterManagerProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {characterGroupList} = useCharactersManager(props.bookId)
    const currentGroup = useSelector((state: RootState) => state.characterContext.currentGroup)

    if (!characterGroupList) return

    return (
        <>
            <div>
                <Tabs
                    style={{"--title-font-size": "14px"}}
                    activeKey={String(currentGroup? currentGroup?.id : characterGroupList[0].id)}
                    defaultActiveKey={String(currentGroup? currentGroup?.id : characterGroupList[0].id)}
                    onChange={(key) => {
                        if (key === ESpecialActions.GO_TO_SETTINGS){
                            navigate("/character-groups")
                        }

                        const group = characterGroupList?.find(g => String(g.id) == key)
                        if (group) dispatch(setCurrentCharacterGroup(group))
                    }}
                >
                    {characterGroupList?.map((characterGroup: ICharacterGroup) =>  (
                    <Tabs.Tab
                        key={String(characterGroup.id)}
                        title={characterGroup.title}
                    >
                        <CharactersByGroup
                            characterGroupId={characterGroup.id!}
                            onClick={props.onClick}
                            excludeCharacterIds={props.excludeCharacterIds}
                        />
                    </Tabs.Tab>
                ))}
                    <Tabs.Tab
                        title={<FillinOutline />}
                        key = {ESpecialActions.GO_TO_SETTINGS}
                    />
                </Tabs>

            </div>
        </>
    )
}
