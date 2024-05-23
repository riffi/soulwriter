import {ICharacterViewFormProps} from "../model/type.ts";
import {
    AutoCenter,
    Button,
    Grid,
    ImageUploader,
    ImageUploadItem,
    List,
    Popup,
    Space,
    SwipeAction
} from "antd-mobile";
import {useCharacterViewForm} from "../model/useCharacterViewForm.ts";
import { AddCircleOutline} from 'antd-mobile-icons'
import {useState} from "react";
import {InlineEdit} from "@shared/ui/InlineEdit";
import {IInlineSelectorItem, InlineSelector} from "@shared/ui/InlineSelector";
import {CharacterAttributeDictList} from "@features/CharacterAttributeDictList";
export const CharacterViewForm = (props: ICharacterViewFormProps) => {
    const {characterData,
        characterAttributeDict,
        appendDictAttribute,
        characterGroups,
        changeBaseAttributeValue,
        changeDictAttributeValue,
        deleteDictAttributeValue,
        onUploadCharacterAvatar,
        onDeleteAvatar
    } = useCharacterViewForm(props.id, props.bookId)

    const [popupPropDictVisible, setPopupPropDictVisible] = useState<boolean>(false)

    const [avatarList, setAvatarList] = useState<ImageUploadItem[]>([])



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
            <Space>
                <ImageUploader
                    style={{
                        "--cell-size": '150px',
                        marginTop: '10px',
                        marginLeft: '10px'
                    }}
                    maxCount={1}
                    camera={true}
                    value={(characterData?.avatar !== undefined && characterData?.avatar != '') ? [{url: characterData?.avatar, thumbnailUrl: characterData?.avatar}]: avatarList}
                    onChange={setAvatarList}
                    upload={onUploadCharacterAvatar}
                    onDelete={onDeleteAvatar}
                />
                <List style={{margin: "0px", "--font-size": "12px", "--header-font-size": "10px", "--border-top": "none", "--border-bottom": "none"}}>
                    <List.Item title={"Имя"} key={"name"}>
                        {characterData?.name}
                    </List.Item>
                    <List.Item title={"Краткое описание"} key={"description"}>
                        {characterData?.description}
                    </List.Item>
                </List>
            </Space>
            <List>
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
                                    onChange={(val) => changeBaseAttributeValue("groupId", Number(val), characterData)}
                                    selectedItemValue={String(characterData?.groupId)}
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
        <Popup
            visible={popupPropDictVisible}
            style={{overflowY: "scroll"}}
            showCloseButton={true}
            onClose={() => setPopupPropDictVisible(false)}
            bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
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
                 bookId={props.bookId}/>
            </Grid>
        </Popup>
        </>
    )

}
