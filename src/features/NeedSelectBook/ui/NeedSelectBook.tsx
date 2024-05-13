import {AutoCenter, Button} from "antd-mobile";
import {ContentOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";

export const NeedSelectBook = () => {
    const navigate = useNavigate()
    return (
        <>
            <AutoCenter style={{fontSize: 30, marginTop: '20px'}}>
                <ContentOutline /> Выберите книгу
            </AutoCenter>

            <AutoCenter style={{fontSize: 30, marginTop: '40px'}}>
                    <Button onClick={() => navigate('/books')}>К книгам</Button>
            </AutoCenter>
        </>
    )
}
