import {ICharacterAttributeDictListProps} from "../model/type"
import {AutoCenter, Button, List, SwipeAction} from "antd-mobile"
import {AddCircleOutline, TeamOutline, UserContactOutline} from "antd-mobile-icons"
import {InlineEdit} from "../../../shared/ui/InlineEdit";



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
                                title: val ? val : '',
                                bookId: props.bookId
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
