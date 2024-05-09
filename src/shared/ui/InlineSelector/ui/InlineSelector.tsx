import {IInlineSelectorProps, ViewMode} from "../model/type.ts";
import React, {useState} from "react";
import {EditFill} from "antd-mobile-icons";
import {Input, Selector} from "antd-mobile";

export const InlineSelector = (props: IInlineSelectorProps) => {
    const [mode, setMode] = useState<ViewMode>(ViewMode.READ)
    const [selectedItemValue, setSelectedItemValue] = useState<string | undefined>(props?.selectedItemValue)

    const handleSave = (value: string) => {
        props?.onChange?.(value)
        setMode(ViewMode.READ)
    }

    const getItemByValue = (value?: string) => {
        if (!value) return undefined
        return props?.items.find(item => item.value === value)
    }


    return (
        <>
            {mode === ViewMode.READ && <>
                {getItemByValue(props.selectedItemValue)?.label}
                <EditFill style={{float: "right"}} onClick={() => {
                    setSelectedItemValue(props?.selectedItemValue)
                    setMode(ViewMode.WRITE)
                }
                }/>
            </>
            }

            {mode === ViewMode.WRITE &&
                <Selector options={props.items}  multiple={false} defaultValue={[selectedItemValue]}
                    onChange={(value) => handleSave(value[0])}
                />
            }
        </>
    )
}
