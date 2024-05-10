import {ICharacterViewFormProps} from "../model/type.ts";
import {AutoCenter, Button, Card, Grid, List, Popup, Space, SwipeAction} from "antd-mobile";
import {useCharacterViewForm} from "../model/useCharacterViewForm.ts";
import { LeftOutline, AddCircleOutline, EditFill } from 'antd-mobile-icons'
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {CharacterAttributeDictList} from "../../../features/CharacterAttributeDictList";
import {InlineEdit} from "../../../shared/ui/InlineEdit";
import {IInlineSelectorItem, InlineSelector} from "../../../shared/ui/InlineSelector";
import {ICharacterGroup} from "../../../entities/Character";
export const CharacterViewForm = (props: ICharacterViewFormProps) => {
    const {characterData,
        characterAttributeDict,
        appendDictAttribute,
        characterGroups,
        changeBaseAttributeValue,
        changeDictAttributeValue,
        deleteDictAttributeValue
    } = useCharacterViewForm(props.id)
    const navigate = useNavigate()
    const [popupPropDictVisible, setPopupPropDictVisible] = useState<boolean>(false)

    const notUsedDictAttributesList = characterAttributeDict?.filter(
        (dictAttr) => {
            const existingAttr = characterData?.dictAttributes?.find(
                (charAttr) => charAttr.id === dictAttr.id
            )
            return !existingAttr
        }
    )

    let selectorGroupsItems: IInlineSelectorItem[] = []

    if (characterGroups){
         selectorGroupsItems = characterGroups?.map((group)=> {return {value: String(group.id), label: group.title}})
    }


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
                        value={characterData?.name}
                        onChange={(val) => changeBaseAttributeValue("name", val, characterData)}
                    />
                </List.Item>
                <List.Item title={"Краткое описание"} key={"description"}>
                    <InlineEdit
                        value={characterData?.description}
                        onChange={(val) => changeBaseAttributeValue("description", val, characterData)}
                    />
                </List.Item>
                <List.Item title={"Группа"} key={"groupId"}>
                    <InlineSelector items={selectorGroupsItems}
                                    onChange={(val) => changeBaseAttributeValue("groupId", String(val), characterData)}
                                    selectedItemValue={characterData?.groupId}
                    />
                </List.Item>
                <List.Item title={"Пол"} key={"sex"}>
                    <InlineSelector items={[
                                {label: 'Мужской', value: 'male'},
                                {label: 'Женский', value: 'female'}
                        ]}
                        onChange={(val) => changeBaseAttributeValue("sex", val, characterData)}
                        selectedItemValue={characterData?.sex}
                    />
                </List.Item>

                {characterData?.dictAttributes?.map(dictAttribute => (
                    <SwipeAction
                        closeOnAction={true}
                        key={dictAttribute.id}
                        onAction = {action => {
                            deleteDictAttributeValue(dictAttribute.id, characterData)
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
                                onChange={(val) => changeDictAttributeValue(dictAttribute.id, val, characterData)}
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
            bodyStyle={{overflow: "auto", maxHeight: "100dvh"}}
            onMaskClick={() => setPopupPropDictVisible(false)}
        >
            <Grid columns={1} gap={1} style={{margin: '10px'}}>
                <h3>Добавить атрибут</h3>
                <CharacterAttributeDictList
                    attributeList={notUsedDictAttributesList}
                    addButtonEnabled={false}
                    onClickCallback={(dictAttribute) => {
                        appendDictAttribute(dictAttribute, characterData)
                        setPopupPropDictVisible(false)
                    }}
                />
            </Grid>
        </Popup>
        </>
    )

}
