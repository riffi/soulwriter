import {ICharacterViewFormProps} from "../model/type.ts";
import {ImageUploader, ImageUploadItem, List, Space, Tabs} from "antd-mobile";
import {useCharacterViewForm} from "../model/useCharacterViewForm.ts";
import {useState} from "react";
import {InlineEdit} from "@shared/ui/InlineEdit";
import {IInlineSelectorItem, InlineSelector} from "@shared/ui/InlineSelector";
import {CharacterAttributeList} from "@features/character/CharacterAttributeList";
import {CharacterAttributeSection} from "@entities/Character";
import {CharacterLinksView} from "@features/character/CharacterLinksView";
import {CharacterStoryLines} from "@features/character/CharacterStoryLines";

export const CharacterViewForm = (props: ICharacterViewFormProps) => {
    const {characterData,
        characterAttributeDict,
        characterGroups,
        changeBaseAttributeValue,
        onUploadCharacterAvatar,
        onDeleteAvatar,
        appendDictAttribute,
        deleteDictAttribute,
        changeAttributeValue
    } = useCharacterViewForm(props.id, props.bookId)


    const [avatarList, setAvatarList] = useState<ImageUploadItem[]>([])




    let selectorGroupsItems: IInlineSelectorItem[] = []

    if (characterGroups){
         selectorGroupsItems = characterGroups?.map((group)=> {return {value: String(group.id), label: group.title}})
    }

    if (!characterData) return
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
            <Tabs tabIndex={0} defaultActiveKey={"main"}>
                <Tabs.Tab title={"Основное"} key={"main"}>
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
                    </List>
                </Tabs.Tab>
                <Tabs.Tab title={"Внешность"} key={"appearance"}>
                    <CharacterAttributeList
                        character={characterData}
                        section={CharacterAttributeSection.APPEARANCE}
                        bookId={props.bookId}
                        deleteCallback={deleteDictAttribute}
                        appendCallBack={appendDictAttribute}
                        changeAttributeValueCallback={changeAttributeValue}
                    />
                </Tabs.Tab>
                <Tabs.Tab title={"Личность"} key={"temper"}>
                    <CharacterAttributeList
                        character={characterData}
                        section={CharacterAttributeSection.TEMPER}
                        bookId={props.bookId}
                        deleteCallback={deleteDictAttribute}
                        appendCallBack={appendDictAttribute}
                        changeAttributeValueCallback={changeAttributeValue}
                    />
                </Tabs.Tab>
                <Tabs.Tab title={"Упоминания"} key={"mentions"}>
                    <CharacterLinksView characterId={characterData?.id}/>
                </Tabs.Tab>
                <Tabs.Tab title={"Сюжетные линии"} key={"storyLines"}>
                    <CharacterStoryLines characterId={characterData?.id}/>
                </Tabs.Tab>

            </Tabs>


        </>
    )

}
