import {IBookItemViewFormProps} from "../model/types.ts";
import {useBookItemViewForm} from "../model/useBookItemViewForm.ts";
import {AutoCenter, Button, Footer, List, Popup, Space, Tabs, Tag} from "antd-mobile";
import {InlineEdit} from "../../../shared/ui/InlineEdit";
import {InlineTextArea} from "../../../shared/ui/InlineTextArea/ui/InlineTextArea.tsx";
import {CloseCircleOutline, DownOutline, SendOutline, UpOutline} from 'antd-mobile-icons'
import {BookItemList} from "../../../features/BookItemList";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BookItemBreadcrumbs} from "../../../features/BookItemBreadcrumbs";
import {BookItemSelector} from "../../../features/BookItemSelector";

export const BookItemViewForm = (props: IBookItemViewFormProps) => {
    const {
        bookItem,
        changeBaseAttributeValue,
        onDeleteBookItemQuery,
        onMoveBookItemQuery,
        childCount,
    } = useBookItemViewForm(props.bookId, props.bookItemId)

    const [showDetails, setShowDetails] = useState<boolean>()
    const [popupTransferVisible, setPopupTransferVisible] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
       setShowDetails(showDetails =>  childCount? childCount > 0 : false)
    }, [props.bookItemId, childCount])

    if (!bookItem) return

    return (
        <>
            <BookItemBreadcrumbs
                bookItemId={bookItem.parentId}
                onClickItem={(bookItem) => navigate(`/book-item/card?id=${bookItem.id}`)}
                onClickTop={() => navigate('/worlds')}
            />
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
                                    color={"primary"}
                                    size={"mini"}
                                    onClick={() => {
                                        setPopupTransferVisible(true)
                                    }}
                                >
                                    <SendOutline /> Переместить
                                </Button>

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
            <Popup
                visible={popupTransferVisible}
                onMaskClick={() => setPopupTransferVisible(false)}
                showCloseButton={true}
                onClose={() => setPopupTransferVisible(false)}
            >
                <BookItemSelector
                    bookId={props.bookId}
                    title={`Переместить ${bookItem?.type}: ${bookItem?.title} в`}
                    actionTitle={'Переместить'}
                    parentBookItemId={-1}
                    onSelect={(id) => {
                        setPopupTransferVisible(false)
                        onMoveBookItemQuery(bookItem, id)}
                }
                />
            </Popup>

        </>
    )
}
