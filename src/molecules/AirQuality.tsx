import { Card } from "primereact/card"
import { Image } from "primereact/image"
import { getAirQualityDescription } from "../shared/util/utils"

type Props = {
    airQualityData: any
}

const AirQuality: React.FC<Props> = ({ airQualityData }) => {
    const airQuality = airQualityData?.list && airQualityData.list[0]?.components?.pm2_5;
    const rangeData = getAirQualityDescription(airQuality)
    
    return (
        <Card title="Air Quality">
            <div style={{ fontSize: '2.1rem', marginTop: '1rem' }}>{airQuality}</div>
            <div className="weather-rating"><span>{rangeData?.description}</span><span><i className={`pi ${rangeData?.icon}`}></i></span></div>
        </Card>
    )
}

export default AirQuality