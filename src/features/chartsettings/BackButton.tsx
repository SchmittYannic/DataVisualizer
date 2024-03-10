import { MouseEventHandler } from "react";
import { FaArrowLeft } from "react-icons/fa";

type BackButtonPropsType = {
    onClick: MouseEventHandler<HTMLButtonElement>,
}

const BackButton = ({ onClick }: BackButtonPropsType) => (
    <button
        className="side-menu-back-btn"
        type="button"
        onClick={onClick}
        title="Zurück zur Navigation"
    >
        <FaArrowLeft 
            role="graphics-symbol"
            aria-label="Zurück Button" />
    </button>
);

export default BackButton