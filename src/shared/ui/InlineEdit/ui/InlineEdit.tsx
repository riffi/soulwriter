import {IInlineEditProps} from "../model/type.ts";
import {EditFill} from "antd-mobile-icons";
import {useState} from "react";
import {Input} from "antd-mobile";
import {ViewMode} from "../../../model/types.ts";

export const InlineEdit = (props: IInlineEditProps) => {
    const [mode, setMode] = useState<ViewMode>(props?.defaultMode ? props?.defaultMode : ViewMode.READ)
    const [val, setVal] = useState<string | undefined>(props?.value)

    const handleSave = () => {
        props?.onChange?.(val)
        setMode(ViewMode.READ)
    }
    return (
        <div>
            {mode === ViewMode.READ && <div onDoubleClick={() => {
                setVal(props.value)
                setMode(ViewMode.WRITE)
            }}>
                {props.prefix} {props.value}
                <EditFill style={{float: "right"}} onClick={() => {
                    setVal(props.value)
                    setMode(ViewMode.WRITE)
                 }
                }/>
                </div>
            }

            {mode === ViewMode.WRITE &&
                <Input
                    autoFocus
                    value={val}
                    placeholder={props.placeholder}
                    onChange={(val) => {setVal(val)}}
                    onBlur={ handleSave }
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') handleSave()
                        if (event.key === 'Escape') setMode(ViewMode.READ)
                    }}
                />
            }
        </div>
    )
}
