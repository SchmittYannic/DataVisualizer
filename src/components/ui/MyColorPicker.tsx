import { useState } from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import { ColorType } from "../../utils/types";

type MyColorPickerPropsType = {
    color: ColorType,
    setColor: React.Dispatch<ColorType>,
    label: string,
}

//source: https://casesandberg.github.io/react-color/
const MyColorPicker = ({ color, setColor, label }: MyColorPickerPropsType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [colorState, setColorState] = useState<ColorType>(color)

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
        setColor(colorState);
    };

    const handleChange = (color: any) => {
        setColorState(color.rgb);
    };

    const styles = reactCSS({
        'default': {
            color: {
                width: "100%",
                height: '20px',
                borderRadius: '2px',
                background: `rgba(${colorState.r}, ${colorState.g}, ${colorState.b}, ${colorState.a})`,
            },
            swatch: {
                display: 'inline-block',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    return (
        <>
            <label>{label}</label>
            <div>
                <button
                    className="btn full"
                    type="button" 
                    style={ styles.swatch } 
                    onClick={ handleClick }
                >
                    <div style={ styles.color } />
                </button>
                { 
                    isOpen ? 
                        <div style={{ position: "absolute", zIndex: "2" }}>
                            <div
                                style={{ 
                                    position: "fixed",
                                    top: "0px",
                                    right: "0px",
                                    left: "0px",
                                    bottom: "0px",
                                }} 
                                onClick={ handleClose }
                            />
                            <SketchPicker color={ colorState } onChange={ handleChange } />
                        </div> 
                        : null 
                }

            </div>
        </>
    )
};

export default MyColorPicker