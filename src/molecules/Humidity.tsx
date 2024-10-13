import { Card } from "primereact/card"
import { Image } from "primereact/image"
import humidity from "../assets/images/humidity.png"

type Props = {
    weatherData: any
}

const Humidity: React.FC<Props> = ({ weatherData }) => {
    const humidityData = weatherData?.main?.humidity;
    return (
        <Card title="Humidity">
            <Image src={humidity} height="70" width="70" loading="lazy" alt="Image" />
            <div style={{fontSize:'2.1rem', marginTop:'1rem'}}>{humidityData}</div>
        </Card>
    )
}

export default Humidity