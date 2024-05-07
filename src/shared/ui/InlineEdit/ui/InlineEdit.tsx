import {IInlineEditProps, ViewMode} from "../model/type.ts";
import {EditFill} from "antd-mobile-icons";
import React, {useState} from "react";
import {Input} from "antd-mobile";

export const InlineEdit = (props: IInlineEditProps) => {
    const [mode, setMode] = useState<ViewMode>(ViewMode.READ)
    const [val, setVal] = useState<string | undefined>(props?.value)
    const handleSave = () => {
        props?.onChange?.(val)
        setMode(ViewMode.READ)
    }
    return (
        <>
            {mode === ViewMode.READ && <>
                {props.value}
                <EditFill style={{float: "right"}} onClick={() => {
                    setVal(props.value)
                    setMode(ViewMode.WRITE)
                }
                }/>
                </>
            }

            {mode === ViewMode.WRITE &&
                <Input
                    value={val}
                    onChange={(val) => {setVal(val)}}
                    onBlur={ handleSave }
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') handleSave()
                    }}
                />
            }
        </>
    )
}