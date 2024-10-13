import { Card } from "primereact/card"
import { Image } from "primereact/image"
import windStatus from "../assets/images/wind.png"

type Props = {
    weatherData: any
}

const WindStatus: React.FC<Props> = ({ weatherData }) => {
    const windSpeed = weatherData?.wind?.speed;
    return (
        <Card title="Wind Status">
            <Image src={windStatus} height="100" width="100" loading="lazy" alt="Image" />
            <div className="wind-status"><span>{windSpeed}</span><span>km/h</span></div>
        </Card>
    )
}

export default WindStatus;
