import {AutoCenter, Button, Image, List} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import { useCharactersByGroup} from '../model/useCharactersByGroup.ts'
import {NavLink} from "react-router-dom";
import {ICharactersByGroupProps} from "../model/types.ts";
import {ImageViewer} from "@shared/ui/ImageViewer";


export const CharactersByGroup = (props: ICharactersByGroupProps) => {
    const {characterList} = useCharactersByGroup(props.characterGroupId)
    if (!characterList) return

    let filteredCharacterList = [...characterList]
    if (props.excludeCharacterIds){
        filteredCharacterList = characterList.filter((char) => props.excludeCharacterIds?.indexOf(char.id) === -1)
    }

    return (
        <>
        <List style={{"--padding-left": "0px"}}>
            {filteredCharacterList?.map(character =>(
                        <List.Item
                            key={character.name}
                            prefix={
                                <ImageViewer guid={character.avatar} />
                            }
                            description={character.description}
                            clickable
                            onClick = {() => props.onClick(character)}
                        >

                            {character.name}
                        </List.Item>
            ))}
            <List.Item title={""}>
                <AutoCenter>
                    <NavLink to={`/character/new?characterGroupId=${props.characterGroupId}`}>
                        <Button size='large' fill={'none'}  onClick={() => {

                        }}>
                            <AddCircleOutline />

                        </Button>
                    </NavLink>
                </AutoCenter>
            </List.Item>
        </List>
        </>

    )

}
