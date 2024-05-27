import {ICharacterLinksViewProps} from "@features/character/CharacterLinksView/model/types.ts";
import {Button, Card, Ellipsis, List, Popup, Space} from "antd-mobile";
import {useCharacterLinksView} from "@features/character/CharacterLinksView/model/useCharacterLinksView.ts";
import {IconBlock} from "@shared/ui/IconBlock";
import {IBookItem} from "@entities/BookItem";
import {ISceneLink} from "@entities/Scene";
import {ReactNode, useState} from "react";
import {CloseOutline, FilterOutline} from "antd-mobile-icons";


export const CharacterLinksView = (props: ICharacterLinksViewProps) => {
    const {
        sceneLinks,
        getBookItemByLink,
        getSceneDataByLink,
        bookItems,
    } = useCharacterLinksView(props.characterId)

    const [selectedBookItem, setSelectedBookItem] = useState<IBookItem>()
    const [popupSelectBookItemVisible, setPopupSelectBookItemVisible ] = useState<boolean>(false)

    const sortedSceneLinks =  sceneLinks?.sort((a,b) => {
        const aSort = getSceneDataByLink(a)?.sortOrderId
        const bSort = getSceneDataByLink(b)?.sortOrderId
        return (aSort ? aSort : 1) - (bSort ? bSort : 0)
    })

    const filteredSceneLinks = sortedSceneLinks?.filter(
        (link) => (!selectedBookItem) || link.bookItemId === selectedBookItem?.id
    )

    return (
        <>
        <Space>
            <Button
                onClick={() => setPopupSelectBookItemVisible(true)}
                size={"small"}
                style={{color: '#999999'}}
            >
                <FilterOutline /> Фильтр
            </Button>
            {selectedBookItem && <Button
                onClick={() => setSelectedBookItem(undefined)}
                size={"small"}
                fill={"none"}
                style={{color: '#999999'}}
            >
                <CloseOutline />
            </Button>
            }
        </Space>
        <List>
            {filteredSceneLinks?.map((link) =>
                <List.Item
                    key={link.id}
                    title={`${getBookItemByLink(link)?.type}: ${getBookItemByLink(link)?.title}`}
                    description={`Сцена ${getSceneDataByLink(link)?.sortOrderId}: ${getSceneDataByLink(link)?.title}`}
                    prefix={
                        <IconBlock
                            iconName={getBookItemByLink(link)?.iconName}
                            style={{fontSize: '28px'}}
                        />
                    }
                >
                    <div>{link.title}</div>
                </List.Item>
            )}
        </List>
            {popupSelectBookItemVisible &&
                <Popup
                    visible={true}
                    bodyStyle={{paddingBottom: '10px', height: '100dvh', overflow: 'auto'}}
                    closeOnMaskClick={true}
                    showCloseButton={true}
                    onClose={() => setPopupSelectBookItemVisible(false)}
                >
                    <Card >
                        <List header={"Выберите элемент"}>
                            {bookItems?.map((bookItem) =>
                                <List.Item
                                    key={bookItem.id}
                                    title={bookItem.type}
                                    onClick={() => {
                                        setSelectedBookItem(bookItem)
                                        setPopupSelectBookItemVisible(false)
                                    }}
                                    prefix={
                                        <IconBlock
                                            iconName={bookItem.iconName}
                                            style={{fontSize: '28px'}}
                                        />
                                    }
                                >
                                    {bookItem.title}
                                </List.Item>
                            )}
                        </List>
                    </Card>
                </Popup>
            }
        </>
    )
}
