import { useState, useEffect } from "react";

import NumberInput from "../../components/ui/NumberInput";
import TextArea from "../../components/ui/TextArea";
import MyColorPicker from "../../components/ui/MyColorPicker";
import ChartSettingsItem from "./ChartSettingsItem";
import renderChart from "../charts/renderChart";
import useRenderChartData from "../../hooks/useRenderChartData";
import { SettingsType } from "../../utils/types";

type TitelSettingsPropsType = {
    settingsRef: React.MutableRefObject<SettingsType>,
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>,
}

const TitelSettings = ({
    settingsRef,
    settings,
    setSettings
}: TitelSettingsPropsType) => {
    const renderChartData = useRenderChartData(settingsRef);
    const [titleColor, setTitleColor] = useState(settingsRef.current.label.titleColor);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.label.titleColor.r = titleColor.r;
        newRef.label.titleColor.g = titleColor.g;
        newRef.label.titleColor.b = titleColor.b;
        newRef.label.titleColor.a = titleColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [titleColor, settingsRef, renderChartData]);

    return (
        <>
             <ChartSettingsItem idx={0}>
                <TextArea 
                    value={settings.label.titleText}
                    label={"Text:"}
                    onChange={(newValue) => {
                        const newRef = { ...settingsRef.current };
                        newRef.label.titleText = newValue;

                        settingsRef.current = newRef;
                        setSettings(newRef);

                        renderChart(settingsRef, renderChartData);
                    }}
                />
            </ChartSettingsItem>

            <ChartSettingsItem idx={1}>
                <NumberInput
                    title="Abstand des Titels in Pixel"
                    min={0}
                    max={350}
                    pattern="[0-9]+"
                    defaultValue={settings.label.titleDistance}
                    onChange={(newValue) => {
                        const newRef = { ...settingsRef.current };
                        newRef.label.titleDistance = newValue;

                        settingsRef.current = newRef;
                        setSettings(newRef);

                        renderChart(settingsRef, renderChartData);
                    }}
                    label={"Abstand:"}
                />
            </ChartSettingsItem>

            <ChartSettingsItem idx={2}>
                <NumberInput
                    title="Schriftgröße des Titels in Pixel"
                    min={0}
                    max={50}
                    pattern="[0-9]+"
                    defaultValue={settings.label.titleFontSize}
                    onChange={(newValue) => {
                        const newRef = { ...settingsRef.current };
                        newRef.label.titleFontSize = newValue;

                        settingsRef.current = newRef;
                        setSettings(newRef);

                        renderChart(settingsRef, renderChartData);
                    }}
                    label={"Schriftgröße:"}
                />
            </ChartSettingsItem>

            <ChartSettingsItem idx={3}>
                <MyColorPicker
                    color={titleColor}
                    setColor={setTitleColor}
                    label={"Farbe:"}
                />
            </ChartSettingsItem>
        </>
    )
}

export default TitelSettings