import * as d3 from "d3";

import { barchart } from "./barchart/BarchartLogic";
import { piechart } from "./piechart/PiechartLogic";
import { boxplot } from "./boxplot/BoxplotLogic";
import { histogram } from "./histogram/HistogramLogic";
import { scatterplot } from "./scatterplot/ScatterplotLogic";
import { linechart } from "./linechart/LinechartLogic";
import { areachart } from "./areachart/AreachartLogic";
import { calcKurtosis } from "./boxplot/calcKurtosis";
import { calcSkewness } from "./boxplot/calcSkewness";
import { placeholderString } from "../../constants";
import { BarchartDataEntryType, BoxplotDataEntryType, PathDataEntryType, SettingsType, dataAsJSONEntryType } from "../../utils/types";
import toSortedArrayOfObjByKey from "../../utils/toSortedArrayOfObjByKey";

const renderChart = (settingsRef: React.MutableRefObject<SettingsType>, dataAsJSON: dataAsJSONEntryType[]) => {
    const charttype = settingsRef.current.charttype;
    const { xColumn, zGrouping } = settingsRef.current.dataInput;
    const { svgWidth, svgHeight } = settingsRef.current.dimensions;
    const svg = d3.select(`#${charttype}SVG`);

    switch(charttype) {
        case "barchart":
            renderBarchart();
            break;
        case "piechart":
            renderPiechart();
            break;
        case "boxplot":
            renderBoxplot();
            break;
        case "histogram":
            renderHistogram();
            break;
        case "scatterplot":
            renderScatterplot();
            break;
        case "linechart":
            renderLinechart();
            break;
        case "areachart":
            renderAreachart();
            break;
        default:
            throw Error("unknown charttype in renderChart function");
    }

    function renderBarchart() {
        const abs = calcAbs();
        svg.call(barchart, {
            settingsRef,
            data: abs,
        });
    }

    function renderPiechart() {
        d3.selectAll('.slice').remove();
        d3.selectAll('polyline').remove();
        d3.selectAll('.sliceLabel').remove();

        const abs = calcAbs();
        svg.call(piechart, {settingsRef, data: abs});
    }

    function renderBoxplot() {
        const stats = calcBoxplotStats();
        if (stats[0].key === '[object Object]') stats[0].key = xColumn;
        svg.call(boxplot, {settingsRef, data: stats});
    }

    function renderHistogram() {
        svg.call(histogram, {
            settingsRef,
            data: dataAsJSON,
        });
    }

    function renderScatterplot() {
        svg.call(scatterplot, {
            settingsRef,
            data: dataAsJSON,
            placeholderString,
        });
    }

    function renderLinechart() {
        const SortedData: dataAsJSONEntryType[] = toSortedArrayOfObjByKey(dataAsJSON, xColumn);
        const pathdata: PathDataEntryType[] = [{ key: "pathdata", values: SortedData }];

        if (xColumn===undefined) {
            svg.append('text')
                .style('text-anchor', "middle")
                .attr('x', svgWidth/2)
                .attr('y', svgHeight/2)
                .text('Keine Daten für dieses Diagramm in Ihrem Datensatz enthalten');
        } else {
            svg.call(linechart, {
                settingsRef,
                data: SortedData,
                pathdata,
            });
        }
    }

    function renderAreachart() {
        const SortedData: dataAsJSONEntryType[] = toSortedArrayOfObjByKey(dataAsJSON, xColumn);
        const pathdata: PathDataEntryType[] = [{ key: "pathdata", values: SortedData }];

        if (xColumn===undefined) {
            svg.append('text')
                .style('text-anchor', "middle")
                .attr('x', svgWidth/2)
                .attr('y', svgHeight/2)
                .text('Keine Daten für dieses Diagramm in Ihrem Datensatz enthalten');
        } else {
            svg.call(areachart, {
                settingsRef,
                data: SortedData,
                pathdata,
            });
        }
    }

    function calcAbs() {
        const abs = d3.rollup(dataAsJSON, (d) => d.length, (d) => d[xColumn]);
        const absArray: BarchartDataEntryType[] = Array.from(abs, ([key, value]) => ({ key: String(key), value })).sort((a, b) => d3.ascending(b.value, a.value));
        return absArray
    }

    function calcBoxplotStats() {
        const calcStats = (d: dataAsJSONEntryType[]) => {
            const array = d.map((e) => e[xColumn]) as number[];
            const q1 = d3.quantile(array.sort(d3.ascending),.25);
            const median = d3.quantile(array.sort(d3.ascending),.5);
            const q3 = d3.quantile(array.sort(d3.ascending),.75);
            const iqr = q1 && q3 ? q3 - q1 : undefined;
            const lowerIqr = q1 && iqr ? q1 - 1.5 * iqr : undefined;
            const upperIqr = q3 && iqr ? q3 + 1.5 * iqr : undefined;
            const min = d3.min(array);
            const max = d3.max(array);
            const lowOutlier = lowerIqr ? array.filter(outlier => outlier < lowerIqr) : undefined;
            const highOutlier = upperIqr ? array.filter(outlier => outlier > upperIqr) : undefined;
            const skewness = calcSkewness(array);
            const kurtosis = calcKurtosis(array);
            return({
                q1: q1,
                median: median,
                q3: q3,
                iqr: iqr,
                lowerIqr: lowerIqr,
                upperIqr: upperIqr,
                min: min,
                max: max,
                lowOutlier: lowOutlier,
                highOutlier: highOutlier,
                skewness: skewness,
                kurtosis: kurtosis
            })
        };

        let stats;

        if (zGrouping !== placeholderString){
            stats = d3.rollup(dataAsJSON, calcStats, (d) => d[zGrouping]);
        } else {
            stats = d3.rollup(dataAsJSON, calcStats, (_d) => xColumn);
        }

        const result: BoxplotDataEntryType[] = Array.from(stats, ([key, value]) => ({ key, value }));

        return result
    }
};

export default renderChart