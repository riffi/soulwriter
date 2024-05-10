import {ICharacterAttributeDictListProps} from "../model/type"
import {AutoCenter, Button, List, SwipeAction} from "antd-mobile"
import {AddCircleOutline, TeamOutline, UserContactOutline} from "antd-mobile-icons"
import {InlineEdit} from "../../../shared/ui/InlineEdit";



export const CharacterAttributeDictList = (props: ICharacterAttributeDictListProps) => {
    return (
    <List header={
        <>
            <UserContactOutline/> Атрибуты персонажей
        </>
    }  mode='card' >
        {props.attributeList?.map(characterAttribute =>(
            <SwipeAction
                closeOnAction={true}
                key={characterAttribute.id}
                onAction = {action => {
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
                onClick={props.onClickCallback !== undefined ? () => props.onClickCallback?.(characterAttribute) : undefined}
            >
                {!props.onChangeCallback &&
                    <>
                        <UserContactOutline/> {characterAttribute.title}
                    </>
                }
                {props.onChangeCallback &&
                    <>

                        <InlineEdit
                            value={characterAttribute.title}
                            prefix={<TeamOutline />}
                            onChange={(val) => props.onChangeCallback?.({
                                id: characterAttribute.id,
                                title: val ? val : ''
                            })}
                        />
                    </>
                }
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
