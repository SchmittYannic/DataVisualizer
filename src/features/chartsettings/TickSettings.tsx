import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import NumberInput from "../../components/ui/NumberInput";
import MyColorPicker from "../../components/ui/MyColorPicker";
import ChartSettingsItem from "./ChartSettingsItem";
import renderChart from "../charts/renderChart";
import useRenderChartData from "../../hooks/useRenderChartData";
import { SettingsType } from "../../utils/types";

type TickSettingsPropsType = {
    settingsRef: React.MutableRefObject<SettingsType>,
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>,
}

const TickSettings = ({
    settingsRef,
    settings,
    setSettings
}: TickSettingsPropsType) => {
    const renderChartData = useRenderChartData(settingsRef);
    const [tickTextColor, setTickTextColor] = useState(settingsRef.current.tick.tickTextColor);
    const [tickLineColor, setTickLineColor] = useState(settingsRef.current.tick.tickLineColor);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.tick.tickTextColor.r = tickTextColor.r;
        newRef.tick.tickTextColor.g = tickTextColor.g;
        newRef.tick.tickTextColor.b = tickTextColor.b;
        newRef.tick.tickTextColor.a = tickTextColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [tickTextColor, settingsRef, renderChartData]);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.tick.tickLineColor.r = tickLineColor.r;
        newRef.tick.tickLineColor.g = tickLineColor.g;
        newRef.tick.tickLineColor.b = tickLineColor.b;
        newRef.tick.tickLineColor.a = tickLineColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [tickLineColor, settingsRef, renderChartData]);

    return (
        <>
            <motion.div 
                className="charts-settings-divider"
                initial={{ x: 500 }}
                animate={{ x: 0 }}
                transition={{ 
                    delay: 0.1 * 0, 
                    stiffness: 100 
                }}
                exit={{ x: -500 }}
            >
                Teilstriche
                <div className="charts-settings-divider-line" aria-hidden="true" />
            </motion.div>

            <ChartSettingsItem idx={1}>
                <NumberInput
                    title="Schriftgröße der Teilstrichbeschriftung in Pixel"
                    min={0}
                    max={50}
                    pattern="[0-9]+"
                    defaultValue={settings.tick.tickFontSize}
                    onChange={(newValue) => {
                        const newRef = { ...settingsRef.current };
                        newRef.tick.tickFontSize = newValue;

                        settingsRef.current = newRef;
                        setSettings(newRef);

                        renderChart(settingsRef, renderChartData);
                    }}
                    label={"Schriftgröße:"}
                />
            </ChartSettingsItem>

            <ChartSettingsItem idx={2}>
                <MyColorPicker
                    color={tickTextColor}
                    setColor={setTickTextColor}
                    label={"Farbe:"}
                />
            </ChartSettingsItem>

            <motion.div 
                className="charts-settings-divider"
                initial={{ x: 500 }}
                animate={{ x: 0 }}
                transition={{ 
                    delay: 0.1 * 3, 
                    stiffness: 100 
                }}
                exit={{ x: -500 }}
            >
                Gitternetz
                <div className="charts-settings-divider-line" aria-hidden="true" />
            </motion.div>

            <ChartSettingsItem idx={4}>
                <NumberInput
                    title="Linienbreite des Gitternetzes in Pixel"
                    min={0}
                    max={20}
                    pattern="[0-9]+"
                    defaultValue={settings.tick.tickLineWidth}
                    onChange={(newValue) => {
                        const newRef = { ...settingsRef.current };
                        newRef.tick.tickLineWidth = newValue;

                        settingsRef.current = newRef;
                        setSettings(newRef);

                        renderChart(settingsRef, renderChartData);
                    }}
                    label={"Linienbreite:"}
                />
            </ChartSettingsItem>

            <ChartSettingsItem idx={5}>
                <MyColorPicker
                    color={tickLineColor}
                    setColor={setTickLineColor}
                    label={"Farbe:"}
                />
            </ChartSettingsItem>
        </>
    )
}

export default TickSettings