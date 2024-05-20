import {IIconBlockProps} from "../model/types.ts";
import * as Icons from 'react-icons/gi';
interface IIndexable {
    [key: string]: any;
}
export const IconBlock = (props: IIconBlockProps) => {
    if (!props.iconName) return
    const IconToRender = (Icons as IIndexable)[props.iconName];
    if (!IconToRender) return
    return <IconToRender
        style={{color: '#666666', ...props.style}}
        onClick={props.onClick}
    />;
}
