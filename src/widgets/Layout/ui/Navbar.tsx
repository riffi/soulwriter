import {TabBar} from "antd-mobile";
import {AppstoreOutline, FileOutline, UserOutline, SetOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()

    //const [currentIndex, setCurrentIndex] = useState<number>(0)
    const navigateTo = (key: string) => {
        navigate(key)
    }

    return (
        <div style={{position: "fixed", width: "100%", bottom: 0}}>
            <TabBar onChange={navigateTo}>
                <TabBar.Item key="general" icon={<AppstoreOutline/>} title={"Основное"}/>
                <TabBar.Item key="scenes" icon={<FileOutline/>} title={"Сцены"}/>
                <TabBar.Item key="characters" icon={<UserOutline/>} title={"Персонажи"}/>
                <TabBar.Item key="settings" icon={<SetOutline/>} title={"Настройки"}/>
            </TabBar>
        </div>
    );
}
