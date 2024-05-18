import {ISynonymSearchProps} from "../model/types.ts";
import {useSynonymSearch} from "../model/useSynonymSearch.ts";
import {List} from "antd-mobile";
import {ISynonymDictItem} from "../../../entities/Synonym";

export const SynonymSearch = (props: ISynonymSearchProps) => {
    const {dictItems} = useSynonymSearch(props.text)
    const getSingleItem = (dictItem: ISynonymDictItem) => {
        return <>
        {dictItem?.synonyms?.map((synonym) =>
            <List.Item key = {synonym} title={synonym} >
            </List.Item>

        )}
        <List.Item>
            {dictItem?.definition && <List.Item title={dictItem?.definition}></List.Item>}
        </List.Item>
        </>
    }

    return (
        <List>
            {dictItems?.map((dictItem) =>
                getSingleItem(dictItem)
            )
            }
        </List>
    )
}
