import { useState, useEffect } from "react";

import ChartSettingsItem from "./ChartSettingsItem";
import useRenderChartData from "../../hooks/useRenderChartData";
import NumberInput from "../../components/ui/NumberInput";
import RangeInput from "../../components/ui/RangeInput";
import MyColorPicker from "../../components/ui/MyColorPicker";
import Dropdown from "../../components/ui/Dropdown";
import renderChart from "../charts/renderChart";
import { colorSchemeOptions } from "../../constants";
import { ColorschemeType, SettingsType } from "../../utils/types";

type ElementSettingsPropsType = {
    settingsRef: React.MutableRefObject<SettingsType>,
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>,
}

const ElementSettings = ({
    settingsRef,
    settings,
    setSettings
}: ElementSettingsPropsType) => {
    const renderChartData = useRenderChartData(settingsRef);
    const selectedChart = settingsRef.current.charttype;

    const [binColor, setBinColor] = useState(settingsRef.current.chartelements.binColor);
    const [lineColor, setLineColor] = useState(settingsRef.current.chartelements.lineColor);
    const [pointColor, setPointColor] = useState(settingsRef.current.chartelements.pointColor);
    const [areaColor, setAreaColor] = useState(settingsRef.current.chartelements.areaColor);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.chartelements.binColor.r = binColor.r;
        newRef.chartelements.binColor.g = binColor.g;
        newRef.chartelements.binColor.b = binColor.b;
        newRef.chartelements.binColor.a = binColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [binColor, settingsRef, renderChartData]);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.chartelements.lineColor.r = lineColor.r;
        newRef.chartelements.lineColor.g = lineColor.g;
        newRef.chartelements.lineColor.b = lineColor.b;
        newRef.chartelements.lineColor.a = lineColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [lineColor, settingsRef, renderChartData]);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.chartelements.pointColor.r = pointColor.r;
        newRef.chartelements.pointColor.g = pointColor.g;
        newRef.chartelements.pointColor.b = pointColor.b;
        newRef.chartelements.pointColor.a = pointColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [pointColor, settingsRef, renderChartData]);

    useEffect(() => {
        const newRef = { ...settingsRef.current };
        newRef.chartelements.areaColor.r = areaColor.r;
        newRef.chartelements.areaColor.g = areaColor.g;
        newRef.chartelements.areaColor.b = areaColor.b;
        newRef.chartelements.areaColor.a = areaColor.a;

        settingsRef.current = newRef;
        renderChart(settingsRef, renderChartData);
    }, [areaColor, settingsRef, renderChartData]);

    return (
        <>
            {
                (selectedChart === "barchart" 
                || selectedChart === "piechart" 
                || selectedChart === "boxplot" 
                || selectedChart === "scatterplot") &&
                    <ChartSettingsItem idx={0}>
                        <Dropdown
                            OptionsList={colorSchemeOptions}
                            selectedOption={settings.chartelements.colorscheme}
                            setSelectedOption={(input: ColorschemeType) => {
                                const newRef = { ...settingsRef.current };
                                newRef.chartelements.colorscheme = input;
        
                                settingsRef.current = newRef;
                                setSettings(newRef);
        
                                renderChart(settingsRef, renderChartData);
                            }}
                            label={"Farbschema:"}
                        />
                    </ChartSettingsItem>
            }
            {
                selectedChart === "histogram" && (
                    <>
                        <ChartSettingsItem idx={0}>
                            <NumberInput
                                title="Einstellen einer ungefähren Klassenanzahl des Histogramms"
                                min={0}
                                max={40}
                                pattern="[0-9]+"
                                defaultValue={settings.chartelements.binNumber}
                                onChange={(newValue) => {
                                    const newRef = { ...settingsRef.current };
                                    newRef.chartelements.binNumber = newValue;

                                    settingsRef.current = newRef;
                                    setSettings(newRef);

                                    renderChart(settingsRef, renderChartData);
                                }}
                                label={"Klassenanzahl:"}
                            />
                        </ChartSettingsItem>

                        <ChartSettingsItem idx={1}>
                            <MyColorPicker
                                color={binColor}
                                setColor={setBinColor}
                                label={"Säulenfarbe:"}
                            />
                        </ChartSettingsItem>
                    </>
                )
            }
            {
                (selectedChart === "linechart" || selectedChart === "areachart") && (
                    <>
                        <ChartSettingsItem idx={0}>
                            <NumberInput
                                title="Einstellen der Linienbreite im Diagramm"
                                min={0}
                                max={20}
                                pattern="[0-9]+"
                                defaultValue={settings.chartelements.lineWidth}
                                onChange={(newValue) => {
                                    const newRef = { ...settingsRef.current };
                                    newRef.chartelements.lineWidth = newValue;

                                    settingsRef.current = newRef;
                                    setSettings(newRef);

                                    renderChart(settingsRef, renderChartData);
                                }}
                                label={"Linienbreite:"}
                            />
                        </ChartSettingsItem>
                        
                        <ChartSettingsItem idx={1}>
                            <MyColorPicker
                                color={lineColor}
                                setColor={setLineColor}
                                label={"Linienfarbe:"}
                            />
                        </ChartSettingsItem>

                        {
                            selectedChart === "areachart" &&
                            <ChartSettingsItem idx={2}>
                                <MyColorPicker
                                    color={areaColor}
                                    setColor={setAreaColor}
                                    label={"Flächenfarbe:"}
                                />
                            </ChartSettingsItem>
                        }

                        <ChartSettingsItem idx={selectedChart === "areachart" ? 3 : 2}>
                            <MyColorPicker
                                color={pointColor}
                                setColor={setPointColor}
                                label={"Punktfarbe:"}
                            />
                        </ChartSettingsItem>
                    </>
                )
            }
            {
                (selectedChart === "scatterplot" || selectedChart === "linechart" || selectedChart === "areachart") && (
                    <ChartSettingsItem idx={selectedChart === "scatterplot" ? 1 : selectedChart === "linechart" ? 3 : 4}>
                        <NumberInput
                            title="Einstellen der Radien der Punkte im Diagramm"
                            min={0}
                            max={20}
                            pattern="[0-9]+"
                            defaultValue={settings.chartelements.circleRadius}
                            onChange={(newValue) => {
                                const newRef = { ...settingsRef.current };
                                newRef.chartelements.circleRadius = newValue;

                                settingsRef.current = newRef;
                                setSettings(newRef);

                                renderChart(settingsRef, renderChartData);
                            }}
                            label={"Punktegröße:"}
                        />
                    </ChartSettingsItem>
                )
            }

            {
                (selectedChart === "scatterplot" || selectedChart === "linechart" || selectedChart ==="areachart") && (
                    <ChartSettingsItem idx={selectedChart === "scatterplot" ? 2 : selectedChart === "linechart" ? 4 : 5}>
                        <RangeInput
                            title="Einstellen der Transparenz der Punkte im Diagramm"
                            min={0}
                            max={100}
                            defaultValue={settings.chartelements.circleOpacity * 100}
                            onChange={(newValue) => {
                                const newValueDecimal = newValue / 100;
                                //if(opacityLabel) opacityLabel.current.textContent = newValueDecimal;

                                const newRef = { ...settingsRef.current };
                                newRef.chartelements.circleOpacity = newValueDecimal;

                                settingsRef.current = newRef;
                                setSettings(newRef);

                                renderChart(settingsRef, renderChartData);
                            }}
                            label={"Punktetransparenz: "}
                        />
                    </ChartSettingsItem>
                )
            }
        </>
    )
}

export default ElementSettings