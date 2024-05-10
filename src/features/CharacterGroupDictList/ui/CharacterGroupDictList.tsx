import {ICharacterGroupDictListProps} from "../model/type.ts";
import {AutoCenter, Button, List, SwipeAction} from "antd-mobile";
import {AddCircleOutline, TeamOutline} from "antd-mobile-icons";
import {InlineEdit} from "../../../shared/ui/InlineEdit";

export const CharacterGroupDictList = (props: ICharacterGroupDictListProps) => {
    return (
        <List header={
            <>
                <TeamOutline /> Группы персонажей
            </>
        }  mode='card' >
            {props.groupList?.map(group =>(
                <SwipeAction
                    closeOnAction={true}
                    key={group.id}
                    onAction = {action => {
                        props.onDeleteGroupCallBack?.(group.id)
                    }}
                    rightActions={[
                        {
                            key: 'delete',
                            text: 'X',
                            color: 'danger',
                        },
                    ]}>
                    <List.Item
                        key={group.id}
                        clickable={props.onClickCallback !== undefined}
                        onClick={props.onClickCallback !== undefined ? () => props.onClickCallback?.(group) : undefined}
                    >
                        {!props.onChangeCallback &&
                            <>
                                <TeamOutline /> {group.title}
                            </>
                        }
                        {props.onChangeCallback &&
                            <>

                                <InlineEdit
                                    value={group.title}
                                    prefix={<TeamOutline />}
                                    onChange={(val) => props.onChangeCallback?.({
                                        id: group.id,
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