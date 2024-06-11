import {IMeasureKidViewFormProps} from "@widgets/measure/MeasureKindViewForm/model/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IMeasure} from "@entities/Measure";

export const useMeasureKindViewForm = (props: IMeasureKidViewFormProps) => {
    const measureKind = useLiveQuery(() => db.measureKinds
        .get(props.measureKindId), [props])

    const measures = useLiveQuery(() => db.measures
        .where("kindId")
        .equals(props.measureKindId)
        .sortBy("description")
        , [measureKind]
    )

    const changeAttributeValue = <T> (attributeName: string, newValue: T) => {
        if (measureKind){
            measureKind[attributeName] = newValue
            db.measureKinds.update(measureKind.id, {...measureKind})
        }
    }

    const appendMeasure = (measure: IMeasure) => {
        const dataToSave = {...measure}
        db.measures.add(dataToSave)
    }

    return {
        measureKind,
        measures,
        appendMeasure,
        changeAttributeValue
    }
}
