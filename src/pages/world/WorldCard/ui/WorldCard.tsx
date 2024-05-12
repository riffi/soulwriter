import {useSearchParams} from "react-router-dom";
import {WorldViewForm} from "../../../../widgets/WorldViewForm"
export const WorldCard = () => {
    const [searchParams] = useSearchParams();
    const worldId = Number(searchParams.get('id'))

    return (
        <>
            <WorldViewForm worldId={worldId}/>
        </>
    )
}