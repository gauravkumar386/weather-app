import { Card } from "primereact/card"
import { Image } from "primereact/image"
import UVProtection from "../assets/images/uvProtection.png"

type Props = {
    airQualityData: any
}

const UVCard: React.FC<Props> = ({ airQualityData }) => {
    const UVData = airQualityData?.list && airQualityData?.list[0]?.components.o3;

    return (
        <Card title="UV Index">
            <Image src={UVProtection} height="100" width="100" loading="lazy" alt="Image" />
            <div style={{fontSize:'2.1rem', marginTop:'1rem'}}>{Math.round(UVData)}</div>
        </Card>
    )
}

export default UVCard;
