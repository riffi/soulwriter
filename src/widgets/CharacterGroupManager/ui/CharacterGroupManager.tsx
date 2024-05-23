import {useState} from "react";
import {Button, Grid, Input, Popup} from "antd-mobile";
import {useCharacterGroupManager} from "../model/useCharacterGroupManager.ts";
import {CharacterGroupDictList} from "@features/CharacterGroupDictList";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {ICharacterGroupManagerProps} from "../model/types.ts";

export const CharacterGroupManager = (props: ICharacterGroupManagerProps) => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    const {characterGroups,
        onSaveNewGroup,
        onChangeGroup,
        onDeleteGroup
    } = useCharacterGroupManager(currentBook)
    const [popupAddGroupVisible, setPopupAddGroupVisible] = useState<boolean>(false)
    const [newGroupTitle, setNewGroupTitle] = useState<string>("")
    return (
        <>
            <CharacterGroupDictList
                bookId={props.bookId}
                groupList={characterGroups}
                addButtonEnabled={true}
                onChangeCallback={onChangeGroup}
                onDeleteGroupCallBack={onDeleteGroup}
                addButtonCallback={() => {
                    setPopupAddGroupVisible(true)
                    setNewGroupTitle("")
                }} />

            <Popup
                visible={popupAddGroupVisible}
                onMaskClick={() => setPopupAddGroupVisible(false)}
            >
                <Grid columns={1} gap={1} style={{margin: '10px'}}>
                    <h3>Добавить группу</h3>
                    <Input
                        placeholder='Название группы'
                        value={newGroupTitle}
                        onChange={val => {
                            setNewGroupTitle(val)
                        }}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                onSaveNewGroup(newGroupTitle)
                                setPopupAddGroupVisible(false)
                            }
                        }}
                    />
                    <Button onClick={() => {
                        onSaveNewGroup(newGroupTitle)
                        setPopupAddGroupVisible(false)
                    }}>Сохранить</Button>
                </Grid>
            </Popup>
        </>
    )
}
