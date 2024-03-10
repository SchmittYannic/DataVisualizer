import { useState, useEffect } from "react";

import useRenderChartData from "../../hooks/useRenderChartData";
import NumberInput from "../../components/ui/NumberInput";
import MyColorPicker from "../../components/ui/MyColorPicker";
import ChartSettingsItem from "./ChartSettingsItem";
import renderChart from "../charts/renderChart";
import { SettingsType } from "../../utils/types";

type TooltipSettingsPropsType = {
    settingsRef: React.MutableRefObject<SettingsType>,
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>,
}

const TooltipSettings = ({
    settingsRef,
    settings,
    setSettings
}: TooltipSettingsPropsType) => {
    const renderChartData = useRenderChartData(settingsRef);

    const [tooltipColor, setTooltipColor] = useState(settingsRef.current.tooltip.tooltipTextColor);
    const [tooltipBgColor, setTooltipBgColor] = useState(settingsRef.current.tooltip.tooltipBgColor);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.tooltip.tooltipTextColor.r = tooltipColor.r;
        newRef.tooltip.tooltipTextColor.g = tooltipColor.g;
        newRef.tooltip.tooltipTextColor.b = tooltipColor.b;
        newRef.tooltip.tooltipTextColor.a = tooltipColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [tooltipColor, settingsRef, renderChartData]);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.tooltip.tooltipBgColor.r = tooltipBgColor.r;
        newRef.tooltip.tooltipBgColor.g = tooltipBgColor.g;
        newRef.tooltip.tooltipBgColor.b = tooltipBgColor.b;
        newRef.tooltip.tooltipBgColor.a = tooltipBgColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [tooltipBgColor, settingsRef, renderChartData]);

    return (
        <>
            <ChartSettingsItem idx={0}>
                <NumberInput
                    title="Schriftgröße des Tooltips in Pixel"
                    min={0}
                    max={50}
                    pattern="[0-9]+"
                    defaultValue={settings.tooltip.tooltipFontSize}
                    onChange={(newValue) => {
                        const newRef = { ...settingsRef.current };
                        newRef.tooltip.tooltipFontSize = newValue;

                        settingsRef.current = newRef;
                        setSettings(newRef);

                        renderChart(settingsRef, renderChartData);
                    }}
                    label={"Schriftgröße:"}
                />
            </ChartSettingsItem>

            <ChartSettingsItem idx={1}>
                <MyColorPicker
                    color={tooltipColor}
                    setColor={setTooltipColor}
                    label={"Textfarbe:"}
                />
            </ChartSettingsItem>

            <ChartSettingsItem idx={2}>
                <MyColorPicker
                    color={tooltipBgColor}
                    setColor={setTooltipBgColor}
                    label={"Hintergrundfarbe:"}
                />
            </ChartSettingsItem>
        </>
    )
}

export default TooltipSettings