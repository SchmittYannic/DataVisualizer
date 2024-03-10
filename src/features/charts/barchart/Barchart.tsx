import { useRef, useEffect } from "react";
import * as d3 from "d3";

import useData from "../../../hooks/useData";
import renderChart from "../renderChart";
import InfoBox from "../../../components/ui/InfoBox";
import { ChartPropsType } from "../../../utils/types";

const Barchart = ({ dimensions, settingsRef }: ChartPropsType) => {
    const { dataAsJSON, dataAsJSONLength, catColumnsLength } = useData();
    const svgWrapperRef = useRef(null);
    const id = "barchart";

    useEffect(() => {
        if (dataAsJSONLength > 0 && catColumnsLength > 0) {
            //sichergehen, dass wrapper div keinen Inhalt hat.
            const wrapper = document.getElementById(id);
            if (!wrapper) return
            wrapper.textContent = "";

            //svg erstellen
            d3.select(svgWrapperRef.current)
                .append('svg')
                    .attr('aria-label', 'barchart')
                    .attr('id', `${id}SVG`)
                    .attr('width', dimensions.svgWidth)
                    .attr('height', dimensions.svgHeight);

            renderChart(settingsRef, dataAsJSON);
        }
    }, [dataAsJSONLength, catColumnsLength, dataAsJSON, settingsRef, dimensions]);

    if (dataAsJSONLength > 0 && catColumnsLength > 0) {
        return (
            <div id="chart-wrapper">
                <div id="chart-tt-wrapper"></div>
                <div ref={svgWrapperRef} id={id} />
            </div>
        )
    } else {
        return (
            <InfoBox>
                <p>Für den ausgewählten Diagrammtypen konnten keine passenden Daten im Datensatz gefunden werden.</p>
                <p>Das <span style={{fontWeight:"600"}}>Säulendiagramm</span> zeigt die absoluten Häufigkeiten von Ausprägungen beliebig skalierter Merkmale. Es setzt mindestens eine Spalte mit 10 oder weniger einzigartigen Ausprägungen voraus.</p>
                <p>Gehen Sie sicher, dass Sie vorab leere Zellen aus dem Datensatz entfernen.</p>
            </InfoBox>
        )
    }
};

export default Barchart;