import { SettingsType } from "../utils/types";
import useData from "./useData";

const useRenderChartData = (settingsRef: React.MutableRefObject<SettingsType>) => {
    const { dataAsJSON, dataCopy } = useData();
    const selectedChart = settingsRef.current.charttype;
    const renderChartData = (selectedChart === "linechart" || selectedChart === "areachart") ? dataCopy : dataAsJSON;

    return renderChartData;
}

export default useRenderChartData