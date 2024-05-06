import {Button, Divider, Grid, Input, Popup} from "antd-mobile";
import {useCharacterAttributeManager} from "../model/useCharacterAttributeManager.ts";
import {useState} from "react";
import {CharacterAttributeDictList} from "../../../features/CharacterAttributeDictList";

import styled from "./CharacterAttributeManager.module.scss";

export const CharacterAttributeManager = () => {

    const {useCharacterAttributeDict, onSaveNewAttribute} = useCharacterAttributeManager()
    const [popupAddAttributeVisible, setPopupAddAttributeVisible] = useState<boolean>(false)
    const [newAttributeTitle, setNewAttributeTitle] = useState<string>("")

    return (
        <>
        <CharacterAttributeDictList
            attributeList={useCharacterAttributeDict?.data}
            addButtonEnabled={true}
            addButtonCallback={() => {
                setPopupAddAttributeVisible(true)
                setNewAttributeTitle("")
            }} />

        <Popup
            visible={popupAddAttributeVisible}
            onMaskClick={() => setPopupAddAttributeVisible(false)}
        >
            <Grid columns={1} gap={1} style={{margin: '10px'}}>
                <h3>Добавить атрибут</h3>
                <Input
                    className={styled.margined}
                    placeholder='Название атрибута'
                    value={newAttributeTitle}
                    onChange={val => {
                        setNewAttributeTitle(val)
                    }}
                />
                <Button onClick={() => {
                    onSaveNewAttribute(newAttributeTitle)
                    setPopupAddAttributeVisible(false)
                }}>Сохранить</Button>
            </Grid>
        </Popup>
        </>
    )
}
