import {AutoCenter, Button, Image, List, Space} from "antd-mobile";
import {AddCircleOutline, AddOutline} from "antd-mobile-icons";
import { useCharacterManager} from '../model/useCharacterManager.ts'
import {NavLink, useNavigate} from "react-router-dom";
import React from "react";

export const CharacterManager = () => {
    const navigate = useNavigate()
    const {useCharacterList} = useCharacterManager()

    return (
        <>
        <List header='Персонажи'  mode='card' >
            {useCharacterList?.data?.map(character =>(
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
                    <NavLink to={"/character/new"}>
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
