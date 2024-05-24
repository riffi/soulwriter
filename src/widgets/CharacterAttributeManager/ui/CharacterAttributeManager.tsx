import {Popup, TabBar} from "antd-mobile";
import {useCharacterAttributeManager} from "../model/useCharacterAttributeManager.ts";
import {useState} from "react";
import {CharacterAttributeDictList} from "@features/characterAttributeDict/CharacterAttributeDictList";
import {EyeOutline, UserContactOutline} from "antd-mobile-icons";
import {CharacterAttributeDataType, CharacterAttributeSection, ICharacterDictAttribute} from "@entities/Character";
import {ICharacterAttributeManagerProps} from "@widgets/CharacterAttributeManager/model/types.ts";
import {CharacterDictAttributeEditForm} from "@features/characterAttributeDict/CharacterDictAttributeEditForm";

export const CharacterAttributeManager = (props: ICharacterAttributeManagerProps) => {

    const {characterAttributeDict,
        onSaveAttribute,
        onDeleteAttribute
    } = useCharacterAttributeManager(props.bookId)

    const [popupAddAttributeVisible, setPopupAddAttributeVisible] = useState<boolean>(false)
    const [currentTab, setCurrentTab] = useState<CharacterAttributeSection>(CharacterAttributeSection.APPEARANCE)


    const newAttrInitialVars = {
        bookId: props.bookId,
        title: '',
        section: currentTab,
        dataType: CharacterAttributeDataType.STRING
    }
   const [currentAttr, setCurrentAttr] = useState<ICharacterDictAttribute>(newAttrInitialVars)



    const characterAttributeDictSection = characterAttributeDict?.filter((attr) => {
        return (attr.section === currentTab) || (!attr.section && currentTab === CharacterAttributeSection.APPEARANCE)
    })
    return (
        <>
        <TabBar
            defaultActiveKey={currentTab}
            onChange={(key) => {
                setCurrentTab(key)
            }}
        >
            <TabBar.Item
                key={CharacterAttributeSection.APPEARANCE}
                icon={<UserContactOutline/>}
                title={`Внешность`}
            />
            <TabBar.Item
                key={CharacterAttributeSection.TEMPER}
                icon={<EyeOutline/>}
                title={`Личность`}
            />
        </TabBar>
        <CharacterAttributeDictList
            bookId={props.bookId}
            attributeList={characterAttributeDictSection}
            onEditCallback={(attr) => {

                setCurrentAttr(
                    {
                        section: currentTab,
                        dataType: CharacterAttributeDataType.STRING,
                        ...attr
                    }
                )
                setPopupAddAttributeVisible(true)
            }}
            addButtonEnabled={true}
            onDeleteCallBack={onDeleteAttribute}
            addButtonCallback={() => {
                setPopupAddAttributeVisible(true)
                setCurrentAttr(newAttrInitialVars)
            }} />

        {popupAddAttributeVisible && <Popup
            visible={popupAddAttributeVisible}
            onMaskClick={() => setPopupAddAttributeVisible(false)}
            showCloseButton={true}
            onClose={() => setPopupAddAttributeVisible(false)}
        >
            <CharacterDictAttributeEditForm
                attribute={currentAttr}
                onSubmit={(attr) =>{
                    onSaveAttribute(attr)
                    setPopupAddAttributeVisible(false)
                }}
            />
        </Popup>}
        </>
    )
}
