import { Card } from "primereact/card"
import { Image } from "primereact/image"
import sunrise from "../assets/images/sunrise.png"
import sunset from "../assets/images/sunset.png"
import { getTimeFormat } from "../shared/util/utils"

type Props = {
    weatherData: any
}

const SunriseSunset: React.FC<Props> = ({ weatherData }) => {
    const sunriseTime = getTimeFormat(weatherData?.sys?.sunrise)?.split(",")[1];
    const sunsetTime = getTimeFormat(weatherData?.sys?.sunset)?.split(",")[1];
    return (
        <Card className="sunrise-sunset" title="Sunrise & Sunset">
            <span>
                <Image src={sunrise} height="70" width="70" loading="lazy" alt="Image" />
                <p style={{ fontSize: "1.3rem", margin: '0' }}>{sunriseTime}</p>
            </span>
            <span>
                <Image src={sunset} height="70" width="70" loading="lazy" alt="Image" />
                <p style={{ fontSize: "1.3rem", margin: '0' }}>{sunsetTime}</p>
            </span>
        </Card>
    )
}

export default SunriseSunset