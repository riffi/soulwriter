import {Badge, Button, Space} from "antd-mobile";
import { PlayOutline } from 'antd-mobile-icons'
import {useState} from "react";
import parts from "../model/parts.json"
import partsStructured from "../model/partsMikhail.json"
import {ICharacterNameGeneratorProps} from "../model/types.ts";

const generateSingleName = () => {
    const index1 = Math.floor(Math.random() * parts.nameParts.length)
    const index2 = Math.floor(Math.random() * parts.nameParts.length)
    const index3 = Math.floor(Math.random() * parts.nameParts.length)
    return `${parts.nameParts[index1]}${parts.nameParts[index2]}${parts.nameParts[index3]}`
}

const generateSingleNameStructured = () => {
    const useMiddle = Math.random() > 0.5
    const prefix = partsStructured.prefix[
        Math.floor(Math.random() * partsStructured.prefix.length)
        ]
    let middle = ''
    if (useMiddle){
        middle = partsStructured.middle[
            Math.floor(Math.random() * partsStructured.middle.length)
            ]
    }

    const suffix = partsStructured.suffix[
        Math.floor(Math.random() * partsStructured.suffix.length)
        ]
    return `${prefix}${middle}${suffix}`

}


export const CharacterNameGenerator = (props: ICharacterNameGeneratorProps) => {
    const [nameList, setNameList] = useState<string[]>([])


    const generateNameList = () => {
        const names: string[] = []
        for (let i = 1; i < 5; i++) {
            let name = generateSingleNameStructured()
            let surname = ''
            const useSurname = Math.random() > 0.75
            if (useSurname){
                surname = generateSingleNameStructured()
                name = name + ' ' + surname
            }
            names.push(name)
        }
        setNameList(names)
    }

    return (
        <Space style={{margin: "10px"}} direction={"horizontal"} wrap={true}>
            <Button onClick={() => generateNameList()} size={"mini"} color={"success"}>
                <PlayOutline/>Сгенерировать

            </Button>
            {nameList.map((title) =>
                <Button size={"mini"} onClick={() => props.onSelect(title)}>
                    {title}
                </Button>
            )}
        </Space>
    )
}