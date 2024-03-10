import { useEffect, useRef } from "react";
import * as d3 from "d3";

import useData from "../../../hooks/useData";
import renderChart from "../renderChart";
import InfoBox from "../../../components/ui/InfoBox";
import { ChartPropsType } from "../../../utils/types";

const Areachart = ({ settingsRef, dimensions }: ChartPropsType) => {
    const { dataCopy, dataAsJSONLength, numColumnsLength, dateColumnsLength } = useData();
    const svgWrapperRef = useRef(null);
    const id = "areachart";

    useEffect(() => {
        if (dataAsJSONLength > 0 && numColumnsLength > 0 && dateColumnsLength > 0) {
            //sichergehen, dass wrapper div keinen Inhalt hat.
            const wrapper = document.getElementById(id);
            if (!wrapper) return
            wrapper.textContent = "";

            //svg erstellen
            d3.select(svgWrapperRef.current)
                .append('svg')
                    .attr('aria-label', 'areachart')
                    .attr('id', `${id}SVG`)
                    .attr('width', dimensions.svgWidth)
                    .attr('height', dimensions.svgHeight);

            renderChart(settingsRef, dataCopy);
        }
    }, [dataAsJSONLength, numColumnsLength, dateColumnsLength, dataCopy, settingsRef, dimensions]);

    if (dataAsJSONLength > 0 && numColumnsLength > 0 && dateColumnsLength > 0) {
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
                <p>Das <span style={{fontWeight:"600"}}>Flächendiagramm</span> zeigt eine quantitative Progression im Zeitablauf an und benötigt deshalb mindestens eine Datumsspalte und eine Zahlenspalte als Input.</p>
                <p>Gehen Sie sicher, dass Sie ein gängiges Datumsformat verwenden und vorab leere Zellen aus dem Datensatz entfernen.</p>
            </InfoBox>
        )
    }
};

export default Areachart;