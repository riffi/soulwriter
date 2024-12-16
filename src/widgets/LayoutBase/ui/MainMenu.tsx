import {TabBar} from "antd-mobile";
import {
    CollectMoneyOutline,
    FileOutline,
    GlobalOutline,
    MoreOutline,
    UserOutline
} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";
import {CustomMenuItemCode, IMainMenuProps} from "../model/types.ts";


export const MainMenu = (props: IMainMenuProps) => {
    const navigate = useNavigate()

    const navigateTo = (key: string) => {
        if (key === CustomMenuItemCode.MORE) {
            props.onSelectCustomMenuItem(CustomMenuItemCode.MORE)
            return
        }
        navigate(key)
    }

    return (
        <>

        <TabBar
                onChange={navigateTo}
                activeKey={props?.route?.route}
                style={{backgroundColor: 'white'}}
            >
                <TabBar.Item key="/scenes" icon={<FileOutline/>} title={"Сцены"}/>
                <TabBar.Item key="/characters" icon={<UserOutline/>} title={"Персонажи"}/>
                <TabBar.Item key="/book-items" icon={<GlobalOutline/>} title={"База"}/>
                <TabBar.Item key="/storylines" icon={<CollectMoneyOutline/>} title={"Cюжет"}/>
                <TabBar.Item key={CustomMenuItemCode.MORE} icon={<MoreOutline />} title={"Еще"}/>
        </TabBar>

        </>
    );
}
