import { ChangeEvent, useId, useState } from "react";

type RangeInputPropsType = {
    title: string,
    min: number,
    max: number,
    defaultValue: number,
    onChange: Function,
    label: string,
}

const RangeInput = (props: RangeInputPropsType) => {
    const { title, min, max, defaultValue, onChange, label } = props;
    const inputId = useId();
    const [inputValue, setInputValue] = useState(defaultValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputEl = e.target;

        setInputValue(inputEl.valueAsNumber);
        onChange(inputEl.valueAsNumber);
    }

    return (
        <>
            <label htmlFor={inputId}>
                {label}
                <br/>
                <span>{inputValue / 100}</span>
            </label>
            <input 
                id={inputId}
                type="range"
                title={title}
                min={min}
                max={max}
                value={inputValue}
                onChange={handleChange}
            />
        </>
    )
};

export default RangeInput;