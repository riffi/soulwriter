import * as Icons from 'react-icons/gi';
import {IconBlock} from "../../IconBlock";
import {IIconSelectorProps} from "../model/types.ts";
import {CapsuleTabs, Card, Grid, SearchBar} from "antd-mobile";
import {useState} from "react";
import gameIconsRU from "../data/gameIconsRU.json"


interface ITabData{
    id: number
    count: number
    firstElement: number,
    lastElement: number
}
export const IconSelector = (props: IIconSelectorProps) => {
    const [searchStr, setSearchStr] = useState<string>("")
    const [activeTabKey, setActiveTabKey] = useState<string>("0")

    const isEngSearchStr =  (/^[a-zA-Z]+$/.test(searchStr))
    let filteredIcons: string[] = []
    if (isEngSearchStr || searchStr === ''){
        filteredIcons = Object.keys(Icons).filter((iconName) => {
                return iconName.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
        })
    }
    else {
        filteredIcons = Object.entries(gameIconsRU)
            .filter(([key]) => key.indexOf(searchStr.toLowerCase()) !== -1)
            .map(([key, value]) => value)
    }

    const getTabs = (): ITabData[] => {
        const tabsArray: ITabData[] = []
        const pageSize = 100
        const pageCount = Math.ceil(filteredIcons.length / pageSize)
        for (let i = 0; i < pageCount; i++){
            tabsArray.push({
                id: i,
                count: pageSize,
                firstElement: i * pageSize,
                lastElement:  Math.min((i + 1) * pageSize, filteredIcons.length)
            })
        }
        return tabsArray
    }

    const tabs = getTabs()
    const iconGrid =  (tab: ITabData) => (
        <Grid columns={3} gap={0} style={{width: '100%'}} key={"grid"}>
            {filteredIcons.slice(tab.firstElement, tab.lastElement).map((iconName, index) => {
                return (
                    <div key={iconName}>
                        <Grid.Item style={{textAlign: 'center'}}>

                            <div>
                                <IconBlock
                                    key={iconName}
                                    iconName={iconName}
                                    style={{fontSize: '25px', margin: '10px'}}
                                    onClick={() => props.onSelect(iconName)}
                                />
                            </div>
                            <div style={{
                                wordBreak: "break-all",
                                fontSize: "12px",
                                padding: "0px 5px"
                            }}>
                                {iconName.replace(/^Gi/, "")}
                            </div>
                        </Grid.Item>
                    </div>
                )
            })}
        </Grid>
    )


    return (
        <>
        <Card>
            <SearchBar
                placeholder={"Поиск"}
                clearable={true}
                onChange={(val) => {
                    setSearchStr(val)
                    setActiveTabKey("0")
                }}
            />
            <CapsuleTabs activeKey={activeTabKey} onChange={(key) => setActiveTabKey(key)}>
                {tabs.map((tab) =>
                    <CapsuleTabs.Tab title={tab.id + 1} key={tab.id}>
                        {iconGrid(tab)}
                    </CapsuleTabs.Tab>
                )}
            </CapsuleTabs>

        </Card>
        </>
    )
}
