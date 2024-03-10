import { useState, useEffect } from "react";

import NumberInput from "../../components/ui/NumberInput";
import MyColorPicker from "../../components/ui/MyColorPicker";
import TextArea from "../../components/ui/TextArea";
import ChartSettingsItem from "./ChartSettingsItem";
import useRenderChartData from "../../hooks/useRenderChartData";
import renderChart from "../charts/renderChart";
import { SettingsType } from "../../utils/types";

type YAxisSettingsPropsType = {
    settingsRef: React.MutableRefObject<SettingsType>,
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>,
}

const YAxisSettings = ({
    settingsRef,
    settings,
    setSettings
}: YAxisSettingsPropsType) => {
    const renderChartData = useRenderChartData(settingsRef);

    const selectedChart = settingsRef.current.charttype;

    const [yaxisColor, setYaxisColor] = useState(settingsRef.current.label.yaxisColor);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.label.yaxisColor.r = yaxisColor.r;
        newRef.label.yaxisColor.g = yaxisColor.g;
        newRef.label.yaxisColor.b = yaxisColor.b;
        newRef.label.yaxisColor.a = yaxisColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [yaxisColor, settingsRef, renderChartData]);

    return (
        <>
            <ChartSettingsItem idx={0}>
                <TextArea 
                    value={settings.label.yaxisText}
                    label={selectedChart !== "piechart" ? "Text:" : "Tooltip 2:"}
                    onChange={(newValue) => {
                        const newRef = { ...settingsRef.current };
                        newRef.label.yaxisText = newValue;

                        settingsRef.current = newRef;
                        setSettings(newRef);

                        renderChart(settingsRef, renderChartData);
                    }}
                />
            </ChartSettingsItem>

            {
                selectedChart !== "piechart" &&
                <>
                    <ChartSettingsItem idx={1}>
                        <NumberInput
                            title="Abstand des Y-Achsentitels in Pixel"
                            min={0}
                            max={350}
                            pattern="[0-9]+"
                            defaultValue={settings.label.yaxisDistance}
                            onChange={(newValue) => {
                                const newRef = { ...settingsRef.current };
                                newRef.label.yaxisDistance = newValue;

                                settingsRef.current = newRef;
                                setSettings(newRef);

                                renderChart(settingsRef, renderChartData);
                            }}
                            label={"Abstand:"}
                        />
                    </ChartSettingsItem>

                    <ChartSettingsItem idx={2}>
                        <NumberInput
                            title="Schriftgröße des Y-Achsentitels in Pixel"
                            min={0}
                            max={50}
                            pattern="[0-9]+"
                            defaultValue={settings.label.yaxisFontSize}
                            onChange={(newValue) => {
                                const newRef = { ...settingsRef.current };
                                newRef.label.yaxisFontSize = newValue;

                                settingsRef.current = newRef;
                                setSettings(newRef);

                                renderChart(settingsRef, renderChartData);
                            }}
                            label={"Schriftgröße:"}
                        />
                    </ChartSettingsItem>

                    <ChartSettingsItem idx={3}>
                        <MyColorPicker
                            color={yaxisColor}
                            setColor={setYaxisColor}
                            label={"Farbe:"}
                        />
                    </ChartSettingsItem>
                </>
            }
        </>
    )
}

export default YAxisSettings