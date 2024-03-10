import { useState, useEffect } from "react";

import NumberInput from "../../components/ui/NumberInput";
import MyColorPicker from "../../components/ui/MyColorPicker";
import TextArea from "../../components/ui/TextArea";
import ChartSettingsItem from "./ChartSettingsItem";
import useRenderChartData from "../../hooks/useRenderChartData";
import renderChart from "../charts/renderChart";
import { SettingsType } from "../../utils/types";

type XAxisSettingsPropsType = {
    settingsRef: React.MutableRefObject<SettingsType>,
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>,
}

const XAxisSettings = ({
    settingsRef,
    settings,
    setSettings
}: XAxisSettingsPropsType) => {
    const renderChartData = useRenderChartData(settingsRef);

    const selectedChart = settingsRef.current.charttype;

    const [xaxisColor, setXaxisColor] = useState(settingsRef.current.label.xaxisColor);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.label.xaxisColor.r = xaxisColor.r;
        newRef.label.xaxisColor.g = xaxisColor.g;
        newRef.label.xaxisColor.b = xaxisColor.b;
        newRef.label.xaxisColor.a = xaxisColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [xaxisColor, settingsRef, renderChartData]);

    return (
        <>
            <ChartSettingsItem idx={0}>
                <TextArea 
                    value={settings.label.xaxisText}
                    label={selectedChart !== "piechart" ? "Text:" : "Tooltip 1:"}
                    onChange={(newValue) => {
                        const newRef = { ...settingsRef.current };
                        newRef.label.xaxisText = newValue;

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
                            title="Abstand des X-Achsentitels in Pixel"
                            min={0}
                            max={350}
                            pattern="[0-9]+"
                            defaultValue={settings.label.xaxisDistance}
                            onChange={(newValue) => {
                                const newRef = { ...settingsRef.current };
                                newRef.label.xaxisDistance = newValue;

                                settingsRef.current = newRef;
                                setSettings(newRef);

                                renderChart(settingsRef, renderChartData);
                            }}
                            label={"Abstand:"}
                        />
                    </ChartSettingsItem>

                    <ChartSettingsItem idx={2}>
                        <NumberInput
                            title="Schriftgröße des X-Achsentitels in Pixel"
                            min={0}
                            max={50}
                            pattern="[0-9]+"
                            defaultValue={settings.label.xaxisFontSize}
                            onChange={(newValue) => {
                                const newRef = { ...settingsRef.current };
                                newRef.label.xaxisFontSize = newValue;

                                settingsRef.current = newRef;
                                setSettings(newRef);

                                renderChart(settingsRef, renderChartData);
                            }}
                            label={"Schriftgröße:"}
                        />
                    </ChartSettingsItem>

                    <ChartSettingsItem idx={3}>
                        <MyColorPicker
                            color={xaxisColor}
                            setColor={setXaxisColor}
                            label={"Farbe:"}
                        />
                    </ChartSettingsItem>
                </>
            }
        </>
    )
}

export default XAxisSettings