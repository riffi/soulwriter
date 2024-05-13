import {AutoCenter, Button, Image, List} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import { useCharactersByGroup} from '../model/useCharactersByGroup.ts'
import {NavLink, useNavigate} from "react-router-dom";
import {ICharactersByGroupProps} from "../type/type.ts";


export const CharactersByGroup = (props: ICharactersByGroupProps) => {
    const navigate = useNavigate()
    const {characterList} = useCharactersByGroup(props.characterGroupId)
    if (!characterList) return
    return (
        <>
        <List style={{"--border-top": "none", "--border-bottom": "none", "--padding-left": "0px", "--font-size": "14px"}}>
            {characterList?.map(character =>(
                        <List.Item
                            key={character.name}
                            prefix={
                                <Image
                                    src={character.avatar ? character.avatar: '/default-avatar.jpeg'}
                                    style={{ borderRadius: 20 }}
                                    fit='cover'
                                    width={40}
                                    height={40}
                                />
                            }
                            description={character.description}
                            clickable
                            onClick = {() => navigate(`/character/card?id=${character.id}`)}
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
