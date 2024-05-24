import {ICharacterDictAttributeEditFormProps} from "@features/characterAttributeDict/CharacterDictAttributeEditForm/model/types.ts";
import {useState} from "react";
import {CharacterAttributeDataType, ICharacterDictAttribute} from "@entities/Character";
import {Button, Card, Input, List, Selector, Space} from "antd-mobile";

export const CharacterDictAttributeEditForm = (props: ICharacterDictAttributeEditFormProps) => {
    const [attr, setAttr] = useState<ICharacterDictAttribute>(props.attribute)
    return (
        <>
            <Card
                title={props.attribute?.id ? 'Редактирование атрибута' : 'Добавление атрибута'}
            >
                <List>
                    <List.Item title={"Название"}>
                        <Input
                            placeholder={"Название атрибута"}
                            value={attr.title}
                            onChange={(val) => {
                                setAttr({...attr, title: val})
                            }}
                        />
                    </List.Item>
                    <List.Item title={"Тип"}>
                        <Selector
                            options={[
                                {label: 'Строка', value: CharacterAttributeDataType.STRING},
                                {label: 'Текст', value: CharacterAttributeDataType.MULTILINE},
                            ]}
                            value={[String(attr.dataType ? attr.dataType : CharacterAttributeDataType.STRING)]}
                            onChange={(vals) => setAttr({...attr, dataType: vals[0]})}
                        />
                    </List.Item>
                    <List.Item>
                        <Space>
                            <Button
                                color={"success"}
                                onClick={() => {
                                    props.onSubmit(attr)
                                }}
                            >
                                {!props.attribute.id && "Добавить"}
                                {props.attribute.id && "Сохранить"}
                            </Button>
                            {/*{props.sceneLink.id && <Button*/}
                            {/*    color={"danger"}*/}
                            {/*    onClick={() => {*/}
                            {/*        props.onDelete(sceneLink)*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    {props.sceneLink.id && "Удалить"}*/}
                            {/*</Button>*/}
                            {/*}*/}
                        </Space>
                    </List.Item>
                </List>
            </Card>
        </>
    )
}
