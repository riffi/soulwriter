import {ICharacterViewFormProps} from "../model/type.ts";
import {Card, List} from "antd-mobile";
import {useCharacterViewForm} from "../model/useCharacterViewForm.ts";
import { LeftOutline } from 'antd-mobile-icons'
import {useNavigate} from "react-router-dom";
export const CharacterViewForm = (props: ICharacterViewFormProps) => {
    const {useCharacterData} = useCharacterViewForm(props.id)
    const navigate = useNavigate()

    return (
        <Card>
            <List>
                <List.Item title={"Назад"}  prefix={<LeftOutline />} clickable={false} onClick={() => navigate("/characters")}>
                </List.Item>
                <List.Item title={"Имя"}>
                    {useCharacterData?.data?.name}
                </List.Item>
                <List.Item title={"Краткое описание"}>
                    {useCharacterData?.data?.description}
                </List.Item>
                <List.Item title={"Пол"}>
                    {useCharacterData?.data?.sex}
                </List.Item>
            </List>
        </Card>
    )
}
