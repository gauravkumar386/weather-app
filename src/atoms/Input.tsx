import React from "react";
import { InputText } from 'primereact/inputtext';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import '../styles/input.scss'

type Props = {
    value: string,
    variant: "filled" | "outlined"
    label?: string,
    placeholder: string,
    className?: string,
    disabled?: boolean,
    onChange?: any,
    setFieldValue?: any,
}

const Input = (props: Props) => {
    const { value, variant, label, placeholder, className, disabled, onChange, setFieldValue } = props
    return (
        <div className="input-element">
            <label>{label}</label>
            <SearchIcon />
            <InputText
                value={value}
                variant={variant}
                className={className}
                disabled={disabled}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)} />
            {value && <CancelIcon onClick={() => setFieldValue("")} />}
        </div>

    )
}

export default Input;
