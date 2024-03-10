import { SettingsType } from "../utils/types";
import useData from "./useData";

const useRenderChartProps = (settingsRef: React.MutableRefObject<SettingsType>) => {
    const { dataAsJSON, dataCopy } = useData();
    const selectedChart = settingsRef.current.charttype;
    const renderChartProps = (selectedChart === "linechart" || selectedChart === "areachart") ? [settingsRef, dataCopy] : [settingsRef, dataAsJSON];

    return renderChartProps;
}

export default useRenderChartProps