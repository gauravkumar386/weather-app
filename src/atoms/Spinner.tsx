import { ProgressSpinner } from 'primereact/progressspinner';
import '../styles/spinner.scss'

const Spinner = () => {
    return (
        <div className="spinner-card">
            <ProgressSpinner style={{width: '50px', height: '50px' }} strokeWidth="3" fill="var(--surface-ground)" animationDuration="0.8s" />
        </div>
    )
}

export default Spinner