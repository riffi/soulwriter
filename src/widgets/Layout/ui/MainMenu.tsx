import {TabBar} from "antd-mobile";
import {AppstoreOutline, FileOutline, UserOutline, SetOutline, GlobalOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";
import {IMainMenuProps} from "../model/types.ts";

export const MainMenu = (props: IMainMenuProps) => {
    const navigate = useNavigate()

    //const [currentIndex, setCurrentIndex] = useState<number>(0)
    const navigateTo = (key: string) => {
        navigate(key)
    }

    return (
            <TabBar onChange={navigateTo}  activeKey={props?.route?.route} style={{backgroundColor: 'white'}}>
                <TabBar.Item key="/scenes" icon={<FileOutline/>} title={"Сцены"}/>
                <TabBar.Item key="/characters" icon={<UserOutline/>} title={"Персонажи"}/>
                <TabBar.Item key="/worlds" icon={<GlobalOutline/>} title={"Миры"}/>
                <TabBar.Item key="/settings" icon={<SetOutline/>} title={"Настройки"}/>
            </TabBar>
    );
}
