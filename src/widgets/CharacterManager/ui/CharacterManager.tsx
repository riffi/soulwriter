import {Button, Image, List, Space} from "antd-mobile";
import { AddOutline} from "antd-mobile-icons";
import { useCharacterManager} from '../model/useCharacterManager.ts'
import {NavLink, useNavigate} from "react-router-dom";

export const CharacterManager = () => {
    const navigate = useNavigate()
    const {useCharacterList} = useCharacterManager()

    return (
        <>
            <Space wrap align='center'>
                <NavLink to={"/character/new"}>
                    <Button size='mini' color='primary' >
                        <AddOutline />
                        Новый
                    </Button>
                </NavLink>
            </Space>
        <List header='Персонажи2'  mode='card' >
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
        </List>
        </>

    )

}
