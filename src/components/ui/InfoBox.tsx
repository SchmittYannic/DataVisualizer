import { PropsWithChildren } from "react";
import info from "../../assets/info.svg";
import "./InfoBox.css";

const InfoBox = ({ children }: PropsWithChildren) => {
    return (
        <div className="infobox">
            <img src={info} alt="info-symbol" />
            <div className="infobox-content">
                {children}
            </div>
        </div>
    )
}

export default InfoBox