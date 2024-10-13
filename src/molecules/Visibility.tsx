import { Card } from "primereact/card"
import { Image } from "primereact/image"
import { getVisibilityDescription } from "../shared/util/utils"

type Props = {
    weatherData: any
}

const Visibility: React.FC<Props> = ({ weatherData }) => {
    const rangeData = getVisibilityDescription(weatherData?.visibility/1000)
    return (
        <Card title="Visibility">
            <div className="wind-status"><span>{weatherData?.visibility / 1000}</span>&nbsp;<span>km</span></div>
            <div className="weather-rating"><span>{rangeData?.description}</span><span><i className={`pi ${rangeData?.icon}`}></i></span></div>
        </Card>
    )
}

export default Visibility