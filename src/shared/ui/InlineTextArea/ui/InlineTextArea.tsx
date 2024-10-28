import {EditFill} from "antd-mobile-icons";
import {useState} from "react";
import {TextArea} from "antd-mobile";
import {ViewMode} from "../../../model/types.ts";
import {IInlineTextAreaProps} from "../model/type.ts";

export const InlineTextArea = (props: IInlineTextAreaProps) => {
    const [mode, setMode] = useState<ViewMode>(props?.defaultMode ? props?.defaultMode : ViewMode.READ)
    const [val, setVal] = useState<string | undefined>(props?.value)

    const handleSave = () => {
        props?.onChange?.(val)
        setMode(ViewMode.READ)
    }
    return (
        <div>
            {mode === ViewMode.READ && <div
                onDoubleClick={() => {
                    setVal(props.value)
                    setMode(ViewMode.WRITE)
                }}
            >
                <EditFill style={{position: "absolute", right: "10px", ...props.iconStyle}} onClick={() => {
                    setVal(props.value)
                    setMode(ViewMode.WRITE)
                }
                }/>
                <div  style={{"whiteSpace": "pre-line", minHeight: "30px"}}>
                    {props.prefix} {props.value}
                </div>
                </div>
            }

            {mode === ViewMode.WRITE &&
                <TextArea
                    autoFocus
                    value={val}
                    onChange={(val) => {setVal(val)}}
                    onBlur={ handleSave }
                    autoSize={true}
                    onKeyDown={(event) => {
                        //if (event.key === 'Enter') handleSave()
                        if (event.key === 'Escape') setMode(ViewMode.READ)
                    }}
                />
            }
        </div>
    )
}
