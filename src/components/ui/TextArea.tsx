import { useEffect, useRef, useState, useId, ChangeEvent } from "react";
import { browserName } from "react-device-detect";
import "./TextArea.css";

type TextAreaPropsType = {
    value: string,
    label: string,
    onChange: (input: string) => void,
    cols?: number,
    rows?: number,
}

const TextArea = ({ value, label, onChange, cols=30, rows=10 }: TextAreaPropsType) => {
    const textareaId = useId();
    const [textareaValue, setTextareaValue] = useState<string>(value);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setTextareaValue(value);
    };

    const handleChangeComplete = () => {
        onChange(textareaValue);
        if (wrapperRef.current) wrapperRef.current.style.outline = "none";
    };

    const handleFocus = () => {
        if (wrapperRef.current) {
            if (browserName === "Firefox") {
                wrapperRef.current.style.outline = "2px solid #0061e0";
            } else {
                wrapperRef.current.style.outline = "2px solid";
            } 
        }
    };

    useEffect(() => {
        setTextareaValue(value);
    }, [value]);

    return (
        <>
            <label htmlFor={textareaId}>{label}</label>
            <div ref={wrapperRef} className="custom-textarea-wrapper">
                <textarea
                    className="custom-textarea"
                    name={textareaId}
                    id={textareaId}
                    cols={cols}
                    rows={rows}
                    value={textareaValue}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleChangeComplete}
                >
                </textarea>
            </div>
        </>
    )
}

export default TextArea