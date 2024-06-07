import {IMeasureKidViewFormProps} from "@widgets/measure/MeasureKindViewForm/model/types.ts";
import {useMeasureKindViewForm} from "@widgets/measure/MeasureKindViewForm/model/useMeasureKindViewForm.ts";
import {AutoCenter, Button, Divider, Input, List, Popup} from "antd-mobile";
import {InlineEdit} from "@shared/ui/InlineEdit";
import {AddCircleOutline} from "antd-mobile-icons";
import {useState} from "react";
import {IMeasure} from "@entities/Measure";
import {Measure} from "@features/measure/Measure";

export const MeasureKindViewForm = (props: IMeasureKidViewFormProps) => {

    const [appendPopupVisible, setAppendPopupVisible] = useState<boolean>(false)
    const [measurePopupVisible, setMeasurePopupVisible] = useState<boolean>(false)
    const [currentMeasure, setCurrentMeasure] = useState<IMeasure>()

    const getNewMeasureData = (): IMeasure => {
        return {
            title: "",
            kindId: props.measureKindId,
            description: ""
        }
    }

    const {
        measures,
        measureKind,
        appendMeasure,
        changeAttributeValue
    } = useMeasureKindViewForm(props)

    return (
        <>
            <List header={measureKind?.title}>
                <List.Item title={"Название"}>
                    <InlineEdit
                        value={measureKind?.title}
                        onChange={(val) => changeAttributeValue("title", val)}
                    />
                </List.Item>
            </List>
            <Divider></Divider>
            <List header={"Единицы измерения"}>
                {measures?.map((measure) =>
                    <List.Item
                        key={measure.id}
                        description={measure.description}
                        onClick={() =>{
                            setCurrentMeasure(measure)
                            setMeasurePopupVisible(true)
                        }
                        }
                    >
                        {measure.title}
                    </List.Item>
                )}
                <List.Item title={""}>
                    <AutoCenter>
                        <Button size='large' fill={'none'}  onClick={() => {
                            setCurrentMeasure(getNewMeasureData())
                            setAppendPopupVisible(true)
                        }}>
                            <AddCircleOutline />

                        </Button>
                    </AutoCenter>
                </List.Item>
            </List>
            {appendPopupVisible &&
                <Popup
                    onClose={() => setAppendPopupVisible(false)}
                    showCloseButton={true}
                    visible={true}
                    onMaskClick={() => setAppendPopupVisible(false)}
                    style={{overflowY: "scroll"}}
                    bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
                >
                    <List header={"Новая единица измерения"}>
                        <List.Item title={"Название"}>
                            <Input
                                value={currentMeasure?.title}
                                onChange={(val) =>{
                                  if (currentMeasure){
                                      setCurrentMeasure({...currentMeasure, title: val})}
                                  }
                                }
                                placeholder={"Введите название"}
                            />
                        </List.Item>
                        <List.Item>
                            <Button
                                color={"primary"}
                                onClick={() => {
                                    if (currentMeasure){
                                        appendMeasure(currentMeasure)
                                    }
                                    setAppendPopupVisible(false)
                                }}
                            >
                                Добавить
                            </Button>
                        </List.Item>
                    </List>
                </Popup>
            }

            {measurePopupVisible &&
                <Popup
                    onClose={() => setMeasurePopupVisible(false)}
                    showCloseButton={true}
                    visible={true}
                    onMaskClick={() => setMeasurePopupVisible(false)}
                    style={{overflowY: "scroll"}}
                    bodyStyle={{overflow: "auto", height: "100dvh"}}
                >
                    <Measure measureId={currentMeasure?.id} />
                </Popup>
            }
        </>
    )
}
