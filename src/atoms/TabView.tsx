import { TabView, TabPanel, TabViewTabChangeEvent } from 'primereact/tabview';
import { useCallback, useState } from 'react';

type Tab = {
    header: string | any,
    description: string,
    type: string,
    value: string
}

interface Props {
    tabData: Tab[],
    handleTabData: (tab: Tab) => void
}

const TabViewComponent: React.FC<Props> = ({ tabData, handleTabData }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleTabChange = useCallback((e: TabViewTabChangeEvent) => {
        const newIndex = e.index;
        setActiveIndex(newIndex)
        handleTabData(tabData[newIndex])
    }, [tabData, handleTabData])

    return (
        <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
            {tabData?.length > 0 && tabData.map((data, index) => {
                return (
                    <TabPanel key={index} header={data?.header}>
                        {data.description}
                    </TabPanel>
                )
            })}
        </TabView>
    )
}

export default TabViewComponent