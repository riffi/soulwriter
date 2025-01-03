import {ICharacterAttributeListProps} from "@features/character/CharacterAttributeList/model/types.ts";
import {AutoCenter, Button, Grid, List, Popup, SwipeAction} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import {InlineEdit} from "@shared/ui/InlineEdit";
import {CharacterAttributeDictList} from "@features/characterAttributeDict/CharacterAttributeDictList";
import {useState} from "react";
import {useCharacterAttributeList} from "../model/useCharacterAttributeList.ts";
import {CharacterAttributeDataType, ICharacterDictAttributeWithValue} from "@entities/Character";
import {InlineTextArea} from "@shared/ui/InlineTextArea";

export const CharacterAttributeList = (props: ICharacterAttributeListProps) => {
    const [popupPropDictVisible, setPopupPropDictVisible] = useState<boolean>(false)
    const {characterAttributeDict} = useCharacterAttributeList(props.bookId, props.character, props.section)

    const notUsedDictAttributesList = characterAttributeDict?.filter(
        (dictAttr) => {
            const existingAttr = props.character.dictAttributes?.find(
                (charAttr) => charAttr.id === dictAttr.id
            )
            return !existingAttr
        }
    )


    // Обогащаем данные атрибутов справочными данными
    const fullAttributes: ICharacterDictAttributeWithValue[] = props.character.dictAttributes?.reduce<ICharacterDictAttributeWithValue[]>(
        (result, charAttr) => {
            const dictAttr = characterAttributeDict?.find(
                (a) => charAttr.id === a.id
            )
            if (dictAttr){
                result.push({...dictAttr, value: charAttr.value})
            }
            return result
        }, [])


    return (
        <>
       <List>
           {fullAttributes.map(attribute => (
                   <SwipeAction
                       closeOnAction={true}
                       key={attribute?.id}
                       onAction = {() => {
                           props.deleteCallback(attribute)
                       }}
                       rightActions={[
                           {
                               key: 'delete',
                               text: 'X',
                               color: 'danger',
                           },
                       ]}>
                       <List.Item title={attribute?.title} key={attribute?.id}>
                           {attribute?.dataType == CharacterAttributeDataType.STRING && <InlineEdit
                               value={attribute.value}
                               onChange={(val) => props.changeAttributeValueCallback(attribute, val)}
                           />}
                           {attribute?.dataType == CharacterAttributeDataType.MULTILINE && <InlineTextArea
                               value={attribute.value}
                               onChange={(val) => props.changeAttributeValueCallback(attribute, val)}
                           />}

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
                    props.appendCallBack(dictAttribute)
                    setPopupPropDictVisible(false)
                }}
                bookId={props.bookId}/>
        </Grid>
    </Popup>
    </>
    )
}
