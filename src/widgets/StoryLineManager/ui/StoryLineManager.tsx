import {IStoryLineManagerProps} from "@widgets/StoryLineManager/model/types.ts";
import {useStoryLineManager} from "@widgets/StoryLineManager/model/useStoryLineManager.ts";
import {AutoCenter, Button, Grid, Input, List, Popup} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import styled from "@features/bookItem/BookItemList/ui/BookItemList.module.scss";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const StoryLineManager = (props: IStoryLineManagerProps) => {
    const {
        storyLines,
        onSaveNewStoryLine
    } = useStoryLineManager(props.bookId)

    const [addPopupVisible, setAddPopupVisible] = useState<boolean>(false)
    const [newStoryLineTitle, setNewStoryLineTitle] = useState<string>("")

    const navigate = useNavigate()

    return (
        <>
        <List>
            {storyLines?.map((storyLine) =>
                <List.Item
                    clickable={true}
                    onClick={() => navigate(`/storyline/card?id=${storyLine.id}`)}
                >
                    {storyLine.title}
                </List.Item>
            )}
            <List.Item title={""} key={"add"}>
                <AutoCenter>
                    <Button
                        size='large'
                        fill={'none'}
                        onClick={() => {
                            setAddPopupVisible(true)
                            setNewStoryLineTitle("")
                        }}
                    >
                        <AddCircleOutline />

                    </Button>
                </AutoCenter>
            </List.Item>
        </List>
        {addPopupVisible && <Popup
            visible={true}
            onMaskClick={() => setAddPopupVisible(false)}
        >
            <Grid columns={1} gap={1} style={{margin: '10px'}}>
                <h3>Добавить линию сюжета</h3>
                <Input
                    className={styled.margined}
                    placeholder='Название'
                    value={newStoryLineTitle}
                    onChange={val => {
                        setNewStoryLineTitle(val)
                    }}
                />

                <Button
                    color={"primary"}
                    onClick={() => {
                        onSaveNewStoryLine(newStoryLineTitle)
                        setAddPopupVisible(false)
                    }}>Сохранить</Button>
            </Grid>
        </Popup>}
        </>
    )
}
