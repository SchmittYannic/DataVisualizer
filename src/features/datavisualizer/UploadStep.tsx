import { MouseEvent } from "react";
import { Link } from "react-router-dom";

import DropZone from "../../components/ui/DropZone";
import InfoBox from "../../components/ui/InfoBox";
import SpeechBubble from "../../components/ui/SpeechBubble";
import useData from "../../hooks/useData";
import { isHTMLButtonElement } from "../../utils/typeguards";

const UploadStep = () => {
    const { fileIsUploaded, setDemodata, isLoading } = useData();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (!isHTMLButtonElement(e.target)) return
        const { name } = e.target;
        setDemodata(name);
    }

    return (
        <>
            <main className="main-upload">

                <DropZone />

                <div style={{ marginTop: "10px", marginBottom: "10px"}}>
                    <InfoBox>
                        <p>Sie haben gerade keinen geeigneten Datensatz zur Verfügung? Kein Problem. Sie können DataVisualizer mit einem unserer Datensätze testen. Diese müssen nicht vorher heruntergeladen werden. Ein Klick genügt!</p>
                        <div style={{display: "flex", justifyContent: "flex-end", gap: "1em"}}>
                            <button
                                className="btn"
                                name="useAutoData"
                                title="Auto Datensatz als Demo verwenden"
                                onClick={handleClick}
                            >
                                Auto Datensatz
                            </button>
                            <button
                                className="btn"
                                name="useWetterData"
                                title="Wetter Datensatz als Demo verwenden"
                                onClick={handleClick}
                            >
                                Wetter Datensatz
                            </button>
                        </div>
                    </InfoBox>
                </div>
            </main>

            <div className="navigation-wrapper">
                <Link
                    className="btn"
                    title="Zurück zur Startseite"
                    to={`/`}
                >
                    Zurück
                </Link>
                {
                    (fileIsUploaded === false || isLoading === true)
                    ?
                        <span 
                            className="btn next-btn disabled-btn"
                            title="Benötigt hochgeladenen Datensatz"
                        >
                            Weiter
                        </span>
                    :
                        <Link 
                            className="btn next-btn"
                            title="Weiter zur Datenansicht"
                            to={`/DataVisualizer/DataStep`}
                        >
                            Weiter
                            <SpeechBubble delay={1000} timer={5500}>
                                Großartig! Ihre Datei wurde hochgeladen. Klicken Sie "Weiter", um fortzufahren.
                            </SpeechBubble>
                        </Link>
                }
            </div>
        </>
    )
}

export default UploadStep