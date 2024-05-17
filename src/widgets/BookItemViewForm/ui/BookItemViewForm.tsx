import {IBookItemViewFormProps} from "../model/types.ts";
import {useBookItemViewForm} from "../model/useBookItemViewForm.ts";
import {AutoCenter, Button, Footer, List, Space, Tabs, Tag} from "antd-mobile";
import {InlineEdit} from "../../../shared/ui/InlineEdit";
import {InlineTextArea} from "../../../shared/ui/InlineTextArea/ui/InlineTextArea.tsx";
import {CloseCircleOutline, DownOutline, RightOutline, UpOutline} from 'antd-mobile-icons'
import {BookItemList} from "../../../features/BookItemList";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BookItemBreadcrumbs} from "../../../features/BookItemBreadcrumbs";

export const BookItemViewForm = (props: IBookItemViewFormProps) => {
    const {
        bookItem,
        changeBaseAttributeValue,
        onDeleteBookItemQuery,
        childCount,
        world
    } = useBookItemViewForm(props.bookId, props.bookItemId)

    const [showDetails, setShowDetails] = useState<boolean>()

    const navigate = useNavigate()

    useEffect(() => {
       setShowDetails(showDetails =>  childCount? childCount > 0 : false)
    }, [props.bookItemId, childCount])

    if (!bookItem) return

    return (
        <>
            <BookItemBreadcrumbs bookItem={bookItem} world={world}/>
            <List>
                <List.Item title={"Название"} key={"title"}>
                    <InlineEdit
                        value={bookItem?.title}
                        onChange={(val) => changeBaseAttributeValue("title", val, bookItem)}
                    />
                </List.Item>
                <List.Item title={"Тип"} key={"type"}>
                    <InlineEdit
                        value={bookItem?.type}
                        onChange={(val) => changeBaseAttributeValue("type", val, bookItem)}
                    />
                </List.Item>
                {!showDetails &&
                    <List.Item title={"Описание"} key={"description"}>
                        <InlineTextArea
                            value={bookItem?.description}
                            onChange={(val) => changeBaseAttributeValue("description", val, bookItem)}
                        />
                    </List.Item>
                }
            </List>



            <div
                style={{
                    borderTop: '1px solid #EEEEEE',
                    borderBottom: '1px solid #EEEEEE',
                    background: 'rgb(84 108 114 / 8%)',
                    cursor: 'pointer'
            }}
                onClick={() => setShowDetails((val) => !val)}
            >
                <AutoCenter>
                    {!showDetails &&
                        <Button
                            fill={"none"}
                            size={"small"}

                            style={{paddingTop: '3px', paddingBottom: '3px', color: "#AAAAAA"}}
                        >
                            <DownOutline/>
                        </Button>
                    }
                    {showDetails &&
                        <Button
                            fill={"none"}
                            size={"small"}
                            style={{paddingTop: '3px', paddingBottom: '3px', color: "#AAAAAA"}}
                        >
                            <UpOutline/>
                        </Button>}
                </AutoCenter>
            </div>
            {showDetails &&
                <>
                    <Tabs>
                        <Tabs.Tab
                            key={"children"}
                            title={"Детали"}
                        >
                            <BookItemList
                                parentId={bookItem?.id}
                                worldId={bookItem?.worldId}
                                bookId={props.bookId}
                                header={"Описание мира"}
                            />
                        </Tabs.Tab>
                        <Tabs.Tab title={"Описание"} key={"description"}>
                            <List>
                                <List.Item title={"Описание"} key={"description"}>
                                    <InlineTextArea
                                        value={bookItem?.description}
                                        onChange={(val) => changeBaseAttributeValue("description", val, bookItem)}
                                    />
                                </List.Item>
                            </List>
                        </Tabs.Tab>
                        <Tabs.Tab title={"Действия"} key={"actions"}>
                            <Space>
                                <Button
                                    color={"danger"}
                                    size={"mini"}
                                    onClick={() => onDeleteBookItemQuery(bookItem)}
                                >
                                    <CloseCircleOutline/> Удалить
                                </Button>
                            </Space>
                        </Tabs.Tab>
                    </Tabs>

                </>
            }


        </>
    )
}
