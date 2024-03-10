import ChartSettingsItem from "./ChartSettingsItem";
import { saveSvg } from "../charts/saveSvg";
import { barchartScript } from "../charts/barchart/BarchartLogic";
import { areachartScript } from "../charts/areachart/AreachartLogic";
import { linechartScript } from "../charts/linechart/LinechartLogic";
import { boxplotScript } from "../charts/boxplot/BoxplotLogic";
import { histogramScript } from "../charts/histogram/HistogramLogic";
import { piechartScript } from "../charts/piechart/PiechartLogic";
import { scatterplotScript } from "../charts/scatterplot/ScatterplotLogic";
import { SettingsType } from "../../utils/types";
import { isSVGElement } from "../../utils/typeguards";

type DownloadSettingsPropsType = {
    settingsRef: React.MutableRefObject<SettingsType>,
}

const DownloadSettings = ({ settingsRef }: DownloadSettingsPropsType) => {

    const copyChartHtml = () => {
        const chartToolTipWrapper = document.getElementById("chart-tt-wrapper");
        const chartWrapper = document.getElementById(settingsRef.current.charttype);
        if (!chartToolTipWrapper || !chartWrapper) return
        const outerHTML = chartToolTipWrapper.outerHTML + chartWrapper.outerHTML;

        const scripts = {
            "areachart": areachartScript,
            "barchart": barchartScript,
            "boxplot": boxplotScript,
            "histogram": histogramScript,
            "linechart": linechartScript,
            "piechart": piechartScript,
            "scatterplot": scatterplotScript,
        }

        navigator.clipboard.writeText(outerHTML + scripts[settingsRef.current.charttype]);
    };

    return (
        <>
            <ChartSettingsItem idx={0}>
                <label>Download Diagramm: </label>
                <button
                    type="button"
                    className="btn full"
                    title="Herunterladen des angezeigten Diagramms im SVG-Format"
                    onClick={() => {
                        const charttype = settingsRef.current.charttype
                        const svgEl = document.getElementById(`${charttype}SVG`);
                        if (svgEl && isSVGElement(svgEl)) {
                            saveSvg(svgEl, charttype);
                        } else {
                            alert("Kein svg zum Herunterladen erkannt. Falls Ihnen kein Diagramm angezeigt wird, versuchen Sie in der Diagrammkonfiguration unter Diagrammoptionen einen anderen Diagrammtypen zu wählen.")
                        }
                    }}
                >
                    Download svg
                </button>
            </ChartSettingsItem>

            <ChartSettingsItem idx={1}>
                <label>Diagramm HTML kopieren: </label>
                <button
                    type="button"
                    className="btn full"
                    title="Kopieren des HTML Elements in die Zwischenablage"
                    onClick={copyChartHtml}
                >
                    HTML Kopieren
                </button>
            </ChartSettingsItem>
        </>
    )
}

export default DownloadSettings