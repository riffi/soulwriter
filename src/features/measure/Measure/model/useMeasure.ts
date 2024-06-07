import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IMeasureProps} from "@features/measure/Measure";
import {IMeasureRadio} from "@entities/Measure";

export const useMeasure = (props: IMeasureProps) => {

    const measure = useLiveQuery(() => db.measures.get(props.measureId), [props])

    const allMeasuresByKind = useLiveQuery(async () => {
        if (!measure) return

        return db.measures
            .where('kindId')
            .equals(measure?.kindId)
            .toArray()

    }, [props.measureId, measure])



    const measureRatios = useLiveQuery(async () => {
        const ratios = await db.measureRatios
            .where('measureId')
            .equals(props.measureId)
            .toArray()
        await Promise.all (ratios?.map (async measureRatio => {
            measureRatio.targetMeasureData = allMeasuresByKind?.find(m => m.id === measureRatio.targetMeasureId)
        }))

        return ratios

    }, [props.measureId, measure, allMeasuresByKind])

    const notUsedMeasures = allMeasuresByKind?.filter((m1) =>
        {
            return measureRatios?.find(m => m1.id === m.targetMeasureId) === undefined
                && m1.id !== measure?.id
        }
    )

    const changeAttributeValue = <T> (attributeName: string, newValue: T) => {
        if (props.measureId){
            const dataToSave = {...measure}
            dataToSave[attributeName] = newValue
            db.measures.update(dataToSave.id, {...dataToSave})
        }
    }

    const saveMeasureRatio = (measureRatio: IMeasureRadio) => {
        if (!measureRatio) return

        const dataToSave = {...measureRatio}
        dataToSave.targetMeasureData = undefined

        if (dataToSave.id){
            db.measureRatios.update(dataToSave.id, {...dataToSave})
        }
        else{
            db.measureRatios.add(dataToSave)
        }
    }

    const removerMeasureRatio = (measureRatio: IMeasureRadio) => {
        db.measureRatios.delete(measureRatio.id)
    }

    return {
        measure,
        measureRatios,
        changeAttributeValue,
        saveMeasureRatio,
        removerMeasureRatio,
        notUsedMeasures,
        allMeasuresByKind
    }
}
