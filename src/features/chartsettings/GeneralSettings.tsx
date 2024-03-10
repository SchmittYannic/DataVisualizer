import { useState, useEffect } from "react";

import Dropdown from "../../components/ui/Dropdown";
import MyColorPicker from "../../components/ui/MyColorPicker";
import renderChart from "../charts/renderChart";
import useFontContext from "../../hooks/useFontContext";
import useRenderChartData from "../../hooks/useRenderChartData";
import ChartSettingsItem from "./ChartSettingsItem";
import { SettingsType } from "../../utils/types";

type GeneralSettingsPropsType = {
    settingsRef: React.MutableRefObject<SettingsType>,
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>,
}

const GeneralSettings = ({
    settingsRef,
    settings,
    setSettings
}: GeneralSettingsPropsType) => {
    const { availableFonts } = useFontContext();
    const renderChartData = useRenderChartData(settingsRef);

    const [svgBgColor, setSvgBgColor] = useState(settingsRef.current.general.svgBg);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.general.svgBg.r = svgBgColor.r;
        newRef.general.svgBg.g = svgBgColor.g;
        newRef.general.svgBg.b = svgBgColor.b;
        newRef.general.svgBg.a = svgBgColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [svgBgColor, settingsRef, renderChartData]);

    return (
        <>
            <ChartSettingsItem idx={0}>
                <Dropdown
                    OptionsList={availableFonts}
                    selectedOption={settings.general.fontFamily}
                    setSelectedOption={(input: string) => {
                        const newRef = { ...settingsRef.current };
                        newRef.general.fontFamily = input;

                        settingsRef.current = newRef;
                        setSettings(newRef);

                        renderChart(settingsRef, renderChartData);
                    }}
                    searchable={true}
                    label={"Schriftart:"}
                />
            </ChartSettingsItem>

            <ChartSettingsItem idx={1}>
                <MyColorPicker
                    color={svgBgColor}
                    setColor={setSvgBgColor}
                    label={"Hintergrundfarbe:"}
                />
            </ChartSettingsItem>
        </>
    )
}

export default GeneralSettings