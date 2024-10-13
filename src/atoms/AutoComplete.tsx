
import React from "react";
import { AutoComplete } from "primereact/autocomplete";
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import '../styles/autoComplete.scss'

type Props = {
    value: string,
    suggestions: any[],
    placeholder: string,
    searchMethod?: any,
    setOnChange?: any,
    setLocationData?: any
}

const AutoCompleteInput = (props: Props) => {
    const { value, suggestions, placeholder, searchMethod, setOnChange, setLocationData } = props;
    return (
        <div className="input-element card flex justify-content-center">
            <SearchIcon />
            <AutoComplete
                value={value}
                suggestions={suggestions}
                placeholder={placeholder}
                completeMethod={searchMethod}
                onChange={(e) => setOnChange(e.value)}
            />
            {value && <CancelIcon onClick={() =>{ 
                setOnChange("")
                setLocationData([])
            }} />}
        </div>
    )
}

export default AutoCompleteInput;
