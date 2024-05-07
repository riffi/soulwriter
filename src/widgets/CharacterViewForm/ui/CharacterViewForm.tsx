import {ICharacterViewFormProps} from "../model/type.ts";
import {AutoCenter, Button, Card, Grid, List, Popup, Space, SwipeAction} from "antd-mobile";
import {useCharacterViewForm} from "../model/useCharacterViewForm.ts";
import { LeftOutline, AddCircleOutline, EditFill } from 'antd-mobile-icons'
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {CharacterAttributeDictList} from "../../../features/CharacterAttributeDictList";
import {InlineEdit} from "../../../shared/ui/InlineEdit";
export const CharacterViewForm = (props: ICharacterViewFormProps) => {
    const {useCharacterData,
        useCharacterAttributeDict,
        appendDictAttribute,
        changeBaseAttributeValue,
        changeDictAttributeValue,
        deleteDictAttributeValue
    } = useCharacterViewForm(props.id)
    const navigate = useNavigate()
    const [popupPropDictVisible, setPopupPropDictVisible] = useState<boolean>(false)

    const notUsedDictAttributesList = useCharacterAttributeDict?.data?.filter(
        (dictAttr) => {
            const existingAttr = useCharacterData?.data?.dictAttributes?.find(
                (charAttr) => charAttr.id === dictAttr.id
            )
            return !existingAttr
        }
    )

    return (
        <>
        <Card>
            <List>
                <List.Item title={"Назад"}
                           arrow={false}
                           prefix={<LeftOutline />}
                           clickable={true}
                           onClick={() => navigate("/characters")}
                           key={"back"}
                >
                </List.Item>
                <List.Item title={"Имя"} key={"name"}>
                    <InlineEdit
                        value={useCharacterData?.data?.name}
                        onChange={(val) => changeBaseAttributeValue("name", val, useCharacterData?.data)}
                    />
                </List.Item>
                <List.Item title={"Краткое описание"} key={"description"}>
                    <InlineEdit
                        value={useCharacterData?.data?.description}
                        onChange={(val) => changeBaseAttributeValue("description", val, useCharacterData?.data)}
                    />
                </List.Item>
                <List.Item title={"Пол"} key={"sex"}>
                    {useCharacterData?.data?.sex}
                    <EditFill style={{float: "right"}}/>
                </List.Item>

                {useCharacterData?.data?.dictAttributes?.map(dictAttribute => (
                    <SwipeAction
                        closeOnAction={true}
                        key={dictAttribute.id}
                        onAction = {action => {
                            console.log('closed')
                            deleteDictAttributeValue(dictAttribute.id, useCharacterData?.data)
                        }}
                        rightActions={[
                        {
                            key: 'delete',
                            text: 'X',
                            color: 'danger',
                        },
                    ]}>
                        <List.Item title={dictAttribute.title} key={dictAttribute.id}>
                            <InlineEdit
                                value={dictAttribute.value}
                                onChange={(val) => changeDictAttributeValue(dictAttribute.id, val, useCharacterData?.data)}
                            />
                        </List.Item>
                    </SwipeAction>
                    )
                )}

                {notUsedDictAttributesList && notUsedDictAttributesList.length > 0 && (
                    <List.Item title={""}  key={"add"}>
                        <AutoCenter>
                            <Button onClick={() => setPopupPropDictVisible(true)} size='middle' fill={'none'}>
                                <AddCircleOutline />
                            </Button>
                        </AutoCenter>
                    </List.Item>
                )
                }
            </List>
        </Card>
        <Popup
            visible={popupPropDictVisible}
            style={{overflowY: "scroll"}}
            onMaskClick={() => setPopupPropDictVisible(false)}
        >
            <Grid columns={1} gap={1} style={{margin: '10px'}}>
                <h3>Добавить атрибут</h3>
                <CharacterAttributeDictList
                    attributeList={notUsedDictAttributesList}
                    addButtonEnabled={false}
                    onClickCallback={(dictAttribute) => {
                        appendDictAttribute(dictAttribute, useCharacterData?.data)
                        setPopupPropDictVisible(false)
                    }}
                />
            </Grid>
        </Popup>
        </>
    )

}
