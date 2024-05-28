import {EditFill} from "antd-mobile-icons";
import {useState} from "react";
import {CalendarPicker} from "antd-mobile";
import {ViewMode} from "../../../model/types.ts";
import {IInlineDatePickerProps} from "../model/type.ts";

export const InlineDatePicker = (props: IInlineDatePickerProps) => {
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

                <CalendarPicker
                    visible={true}
                    selectionMode='single'
                    min={new Date(1966)}
                    defaultValue={new Date()}
                    onClose={() => setMode(ViewMode.READ)}
                    onMaskClick={() =>  setMode(ViewMode.READ)}
                />
                // <Input
                //     autoFocus
                //     value={val}
                //     onChange={(val) => {setVal(val)}}
                //     onBlur={ handleSave }
                //     onKeyUp={(event) => {
                //         if (event.key === 'Enter') handleSave()
                //         if (event.key === 'Escape') setMode(ViewMode.READ)
                //     }}
                // />
            }
        </div>
    )
}
