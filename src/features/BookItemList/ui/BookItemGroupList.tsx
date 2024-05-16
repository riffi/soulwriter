import {IBookItemListProps} from "../model/types.ts";
import {useBookItemList} from "../model/useBookItemList.ts";
import {AutoCenter, Button, Grid, Input, List, Popup, Selector, Tabs} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import styled from "../../../widgets/CharacterAttributeManager/ui/CharacterAttributeManager.module.scss";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {BookItemList} from "./BookItemList.tsx";

export const BookItemGroupList = (props: IBookItemListProps) => {

    const {bookItemList,
        onSaveNewItem
    } = useBookItemList(props.parentId, props.worldId, props.bookId)

    const [popupAddItemVisible, setPopupAddItemVisible] = useState<boolean>(false)
    const [newItemTitle, setNewItemTitle] = useState<string>("")
    const [newItemName, setNewItemName] = useState<string>("")
    const [newChildrenHeader, setNewChildrenHeader] = useState<string>("")
    const [newIsGroup, setNewIsGroup] = useState<boolean>(true)


    const groupList = bookItemList?.filter((bookItem) => bookItem.isGroup)

    return (
        <>
            <Tabs tabIndex={0}>
                {groupList?.map((group) =>
                    <Tabs.Tab title={group.title} key={group.id}>
                        <BookItemList
                            parentId={group.id}
                            worldId={props.worldId}
                            bookId={props.bookId}
                            header={group.title}
                        />
                    </Tabs.Tab>
                )}
                <Tabs.Tab title={"+"} key={"add"}>
                    <Button
                        onClick={() => {
                            setPopupAddItemVisible(true)
                            setNewItemTitle("")
                            setNewItemName("")
                            setNewChildrenHeader("")
                        }}
                    >+</Button>
                </Tabs.Tab>
            </Tabs>
            <Popup
                visible={popupAddItemVisible}
                onMaskClick={() => setPopupAddItemVisible(false)}
            >
                <Grid columns={1} gap={1} style={{margin: '10px'}}>
                    <h3>Добавить элемент</h3>
                    <Selector
                        options={[
                            {label: 'Группа', value: "t"},
                            {label: 'Элемент', value: "f"}
                        ]}
                        defaultValue={["t"]}
                        onChange={(val) => setNewIsGroup(val[0] === 't')}
                    />
                    <Input
                        className={styled.margined}
                        placeholder='Тип'
                        value={newItemName}
                        onChange={val => {
                            setNewItemName(val)
                        }}
                    />
                    <Input
                        className={styled.margined}
                        placeholder='Название'
                        value={newItemTitle}
                        onChange={val => {
                            setNewItemTitle(val)
                        }}
                    />
                    <Input
                        className={styled.margined}
                        placeholder='Название внутренних частей'
                        value={newChildrenHeader}
                        onChange={val => {
                            setNewChildrenHeader(val)
                        }}
                    />

                    <Button onClick={() => {
                        onSaveNewItem(newItemTitle, newItemName, newChildrenHeader, newIsGroup)
                        setPopupAddItemVisible(false)
                    }}>Сохранить</Button>
                </Grid>
            </Popup>

        </>
    )
}
