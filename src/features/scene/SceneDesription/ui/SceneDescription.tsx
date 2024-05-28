import {Space} from "antd-mobile";
import {CalendarOutline, HistogramOutline, TagOutline} from "antd-mobile-icons";
import {ISceneDescription} from "../model/types.ts";
import {getAbsoluteDate, humanizeDayValue} from "@shared/lib/DateUtils.ts";


export const SceneDescription = (props: ISceneDescription) => {

    const dayStartStr = humanizeDayValue(props.scene.dayStart)
    const dayEndStr = humanizeDayValue(props.scene.dayEnd)
    return (
        <>
                <Space wrap={true}>
                    <div><HistogramOutline /> {props.scene.symbolCount}</div>
                    {(props.scene.dayStart || props.scene.dayEnd) &&  <div>
                        <CalendarOutline /> {(props.scene.dayStart === props.scene.dayEnd) && <>
                            {dayStartStr}
                        </>}
                        {(props.scene.dayStart !== props.scene.dayEnd) && <>
                            {dayStartStr} - {dayEndStr}
                        </>}
                    </div>}
                    {props.book.dateStart && props.scene.dayStart && <div
                        style={{marginLeft: '0px'}}
                    >
                        <TagOutline />{getAbsoluteDate(props.book.dateStart, props.scene.dayStart)}
                    </div>}
                </Space>
        </>
    )
}
