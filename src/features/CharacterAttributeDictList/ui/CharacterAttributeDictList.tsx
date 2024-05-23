import {ICharacterAttributeDictListProps} from "../model/type"
import {AutoCenter, Button, List, SwipeAction} from "antd-mobile"
import {AddCircleOutline, EditFill, UserContactOutline} from "antd-mobile-icons"



export const CharacterAttributeDictList = (props: ICharacterAttributeDictListProps) => {
    return (
    <List style={{"--padding-left": "0px"}}>
        {props.attributeList?.map(characterAttribute =>(
            <SwipeAction
                closeOnAction={true}
                key={characterAttribute.id}
                onAction = {() => {
                    props.onDeleteCallBack?.(characterAttribute.id)
                }}
                rightActions={[
                    {
                        key: 'delete',
                        text: 'X',
                        color: 'danger',
                    },
                ]}>
            <List.Item
                key={characterAttribute.id}
                clickable={props.onClickCallback !== undefined}
                extra={
                    (props.onEditCallback && <Button
                        fill={"none"}
                        onClick={(e) => {
                            e.stopPropagation()
                            props.onEditCallback?.(characterAttribute)
                        }}
                    >
                        <EditFill/>
                    </Button>)
                }
                onClick={props.onClickCallback !== undefined ? () => props.onClickCallback?.(characterAttribute) : undefined}
            >
                    <>
                        <UserContactOutline/> {characterAttribute.title}
                    </>

            </List.Item>
            </SwipeAction>
        ))}
        {props.addButtonEnabled && <List.Item title={""}>
            <AutoCenter>
                <Button size='large' fill={'none'}  onClick={() => {
                    props.addButtonCallback?.()
                }}>
                    <AddCircleOutline />

                </Button>
            </AutoCenter>
        </List.Item>}
    </List>
    )
}
