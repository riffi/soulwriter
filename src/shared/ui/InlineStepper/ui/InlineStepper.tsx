import {IInlineStepperProps} from "../model/type.ts";
import {EditFill} from "antd-mobile-icons";
import {useState} from "react";
import {Button, Space, Stepper} from "antd-mobile";
import {ViewMode} from "../../../model/types.ts";
import { CheckOutline } from 'antd-mobile-icons'

export const InlineStepper = (props: IInlineStepperProps) => {
    const [mode, setMode] = useState<ViewMode>(ViewMode.READ)
    const [val, setVal] = useState<number>(props?.value ? props?.value : 0)

    const handleSave = () => {
        props?.onChange?.(val)
        setMode(ViewMode.READ)
    }
    return (
        <div>
            {mode === ViewMode.READ && <div onDoubleClick={() => {
                setVal(props?.value ? props?.value : 0)
                setMode(ViewMode.WRITE)
            }}>
                {props.prefix} {props.value}
                <EditFill style={{float: "right"}} onClick={() => {
                    setVal(props?.value ? props?.value : 0)
                    setMode(ViewMode.WRITE)
                 }
                }/>
                </div>
            }

            {mode === ViewMode.WRITE &&
                <Space direction={"horizontal"}>
                    <Stepper
                        defaultValue={val}
                        onChange={(val) => setVal(val)}
                    />
                    <Button
                        onClick={() => handleSave()}
                        size={"small"}
                        fill={"solid"}
                        color={"primary"}
                    >
                        <CheckOutline />

                    </Button>
                </Space>
            }
        </div>
    )
}
