import {IMeasureProps} from "@features/measure/Measure/model/types.ts";
import {useMeasure} from "@features/measure/Measure/model/useMeasure.ts";
import {AutoCenter, Button, Card, Divider, Input, List, Popup, Tabs} from "antd-mobile";
import {InlineEdit} from "@shared/ui/InlineEdit";
import {AddCircleOutline,DeleteOutline} from "antd-mobile-icons";
import {useState} from "react";

export const Measure = (props: IMeasureProps) => {

    const [ratioPopupVisible, setRatioPopupVisible] = useState<boolean>(false)
    const [valueToCalc, setValueToCalc] = useState<number>(1)
    const {
        measure,
        measureRatios,
        notUsedMeasures,
        allMeasuresByKind,
        saveMeasureRatio,
        removerMeasureRatio,
        changeAttributeValue
    } = useMeasure(props)



    return (
        <>
            <List
                header={measure?.title}
            >
                <List.Item title={"Значение для вычисления"}>
                    <Input
                        type={"number"}
                        placeholder={"Введите значение"}
                        value={String(valueToCalc)}
                        onChange={(val) => setValueToCalc(Number(val))}
                    />
                </List.Item>
            </List>
            <Tabs>
                <Tabs.Tab title={"Вычисления"} key={"calc"}>
                    <List
                    >
                        {measureRatios?.map((measureRatio) =>
                            <List.Item
                                key={measureRatio?.id}
                                title={
                                    <>
                                        {measureRatio.targetMeasureData?.title}: {measureRatio?.targetMeasureData?.description}
                                    </>
                                }
                                extra={
                                    <Button
                                        fill={"none"}
                                        onClick={() => removerMeasureRatio(measureRatio)}
                                    >
                                        <DeleteOutline/>
                                    </Button>
                                }
                            >
                                <>
                                <div>
                                    {valueToCalc} {measure?.shortTitle} = {Math.round(valueToCalc * measureRatio.ratio * 100 ) / 100} {measureRatio.targetMeasureData?.shortTitle}
                                </div>

                                <div style={{
                                    fontSize: '12px',
                                    color: '#999999',
                                    width: '150px',
                                }}>
                                    <InlineEdit
                                        value={measureRatio?.ratio}
                                        onChange={
                                            (val) =>
                                                saveMeasureRatio({...measureRatio, ratio: val})
                                        }
                                        prefix={"Коэффициент: "}
                                    />
                                </div>
                                </>

                            </List.Item>
                        )}
                        <List.Item title={""}>
                            <AutoCenter>
                                <Button size='large' fill={'none'}  onClick={() => {
                                    setRatioPopupVisible(true)
                                }}>
                                    <AddCircleOutline />

                                </Button>
                            </AutoCenter>
                        </List.Item>
                    </List>
                </Tabs.Tab>
                <Tabs.Tab title={"Параметры"} key={"params"}>
                    <List>
                        <List.Item title={"Название"}>
                            <InlineEdit
                                value={measure?.title}
                                onChange={(val) => changeAttributeValue("title", val)}
                            />
                        </List.Item>
                        <List.Item title={"Описание"}>
                            <InlineEdit
                                value={measure?.description}
                                onChange={(val) => changeAttributeValue("description", val)}
                            />
                        </List.Item>
                        <List.Item title={"Короткое название"}>
                            <InlineEdit
                                value={measure?.shortTitle}
                                onChange={(val) => changeAttributeValue("shortTitle", val)}
                            />
                        </List.Item>
                    </List>
                </Tabs.Tab>
            </Tabs>


            {ratioPopupVisible &&
                <Popup
                    onClose={() => setRatioPopupVisible(false)}
                    showCloseButton={true}
                    visible={true}
                    onMaskClick={() => setRatioPopupVisible(false)}
                    style={{overflowY: "scroll"}}
                    bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
                >
                    <List header={"Сопоставление"}>
                        {notUsedMeasures?.map((m) =>
                            <List.Item
                                key={m.id}
                                onClick={() => {
                                    saveMeasureRatio({
                                        measureId: measure!.id!,
                                        targetMeasureId: m.id!,
                                        ratio: 1
                                    })
                                    setRatioPopupVisible(false)
                                }}
                                description={m.description}
                            >
                                {m.title}
                            </List.Item>
                        )}
                        <List.Item>
                            <Button
                                color={"primary"}
                                onClick={() => {
                                 //   addMeasureKind(newKindTitle)
                                    setRatioPopupVisible(false)
                                }}
                            >
                                Добавить
                            </Button>
                        </List.Item>
                    </List>
                </Popup>
            }
        </>
    )
}
