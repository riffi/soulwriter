import {IMeasureKindsProps} from "@features/measure/MeasureKinds/model/types.ts";
import {AutoCenter, Button, Input, List, Popup} from "antd-mobile";
import {useMeasureKinds} from "@features/measure/MeasureKinds/model/useMeasureKinds.ts";
import {AddCircleOutline} from "antd-mobile-icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const MeasureKinds = (props: IMeasureKindsProps) => {

    const [appendPopupVisible, setAppendPopupVisible] = useState<boolean>(false)
    const [newKindTitle, setNewKindTitle] = useState<string>("")

    const navigate = useNavigate()

    const {
        measureKinds,
        addMeasureKind
    } = useMeasureKinds(props.bookId)

    return (
        <>
            <List header={"Виды единиц измерения"}>
                {measureKinds?.map((measureKind) =>
                    <List.Item
                        key={measureKind.id}
                        onClick={() => navigate(`/measure-kind/card?id=${measureKind.id}`)}
                    >
                        {measureKind.title}
                    </List.Item>
                )}
                <List.Item title={""}>
                    <AutoCenter>
                        <Button size='large' fill={'none'}  onClick={() => {
                            setNewKindTitle("")
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
                    <List header={"Новый вид единиц измерения"}>
                        <List.Item title={"Название вида"}>
                            <Input
                                value={newKindTitle}
                                onChange={(val) => setNewKindTitle(val)}
                                placeholder={"Введите название"}
                            />
                        </List.Item>
                        <List.Item>
                            <Button
                                color={"primary"}
                                onClick={() => {
                                    addMeasureKind(newKindTitle)
                                    setAppendPopupVisible(false)
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
