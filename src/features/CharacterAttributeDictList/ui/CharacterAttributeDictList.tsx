import {ICharacterAttributeDictListProps} from "../model/type.ts";
import {AutoCenter, Button, List} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import React from "react";

export const CharacterAttributeDictList = (props: ICharacterAttributeDictListProps) => {
    return (
    <List header='Атрибуты персонажей'  mode='card' >
        {props.attributeList?.map(characterAttribute =>(
            <List.Item
                key={characterAttribute.id}
                clickable
                onClick={() => props.onClickCallback?.(characterAttribute)}
            >
                {characterAttribute.title}
            </List.Item>
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
