import {AutoCenter, Button, Card, Grid, Input, List, Popup} from "antd-mobile";
import {AddCircleOutline, GlobalOutline} from 'antd-mobile-icons'
import {useWorldManager} from "../model/useWorldManager.ts";
import styled from "../../CharacterAttributeManager/ui/CharacterAttributeManager.module.scss";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const WorldManager = () => {

    const navigate = useNavigate();
    const {worldList, onSaveNewWorld} = useWorldManager()
    const [popupAddWorldVisible, setPopupAddWorldVisible] = useState<boolean>(false)
    const [newWorldTitle, setNewWorldTitle] = useState<string>("")


    return (
        <>
        <List header={<><GlobalOutline /> Миры </>}>
            {worldList?.map((world) =>
                <List.Item
                    prefix={<GlobalOutline />}
                    description={world.description}
                    onClick = {() => navigate(`/world/card?id=${world.id}`)}
                >
                    {world.title}
                </List.Item>
            )}
            <List.Item title={""}>
                <AutoCenter>
                    <Button size='large' fill={'none'}  onClick={() => {
                        setPopupAddWorldVisible(true)
                        setNewWorldTitle("")
                    }}>
                        <AddCircleOutline />

                    </Button>
                </AutoCenter>
            </List.Item>
        </List>
        <Popup
            visible={popupAddWorldVisible}
            onMaskClick={() => setPopupAddWorldVisible(false)}
        >
            <Grid columns={1} gap={1} style={{margin: '10px'}}>
                <h3>Добавить мир</h3>
                <Input
                    className={styled.margined}
                    placeholder='Название мира'
                    value={newWorldTitle}
                    onChange={val => {
                        setNewWorldTitle(val)
                    }}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            onSaveNewWorld(newWorldTitle)
                            setPopupAddWorldVisible(false)
                        }
                    }}
                />
                <Button onClick={() => {
                    onSaveNewWorld(newWorldTitle)
                    setPopupAddWorldVisible(false)
                }}>Сохранить</Button>
            </Grid>
        </Popup>
    </>
    )
}