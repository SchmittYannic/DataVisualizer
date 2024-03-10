export type dataAsJSONEntryType = {
    [key: string]: any,
};

export type useScrollPositionType = {
    scrollY: undefined | number,
    scrollX: undefined | number,
}

export type TabType = "upload" | "data" | "visualisierung";

export type ColorType = {
    r: number,
    g: number,
    b: number,
    a: number,
}

export type SettingsDimensionsType = {
    svgWidth: number,
    svgHeight: number,
    svgMarginLeft: number,
    svgMarginTop: number,
    svgMarginRight: number,
    svgMarginBottom: number,
}

export type ChartType = "barchart" | "piechart" | "boxplot" | "histogram" | "scatterplot" | "areachart" | "linechart"

type SettingsDataInputType = {
    xColumn: string,
    yColumn: string,
    zGrouping: string,
}

type SettingsGeneralType = {
    fontFamily: string,
    svgBg: ColorType
}

type SettingsChartElementsType = {
    colorscheme: string, // check
    circleOpacity: number,
    circleRadius: number,
    binNumber: number,
    binColor: ColorType,
    pointColor: ColorType,
    lineColor: ColorType,
    lineWidth: number,
    areaColor: ColorType,
}

type SettingsLabelType = {
    titleText: string,
    titleDistance: number,
    titleFontSize: number,
    titleColor: ColorType,
    xaxisText: string,
    xaxisDistance: number,
    xaxisFontSize: number,
    xaxisColor: ColorType,
    yaxisText: string,
    yaxisDistance: number,
    yaxisFontSize: number,
    yaxisColor: ColorType,
}

type SettingsTickType = {
    tickFontSize: number,
    tickTextColor: ColorType,
    tickLineWidth: number,
    tickLineColor: ColorType,
}

type SettingsTooltipType = {
    tooltipFontSize: number,
    tooltipTextColor: ColorType,
    tooltipBgColor: ColorType,
}

export type SettingsType = {
    charttype: ChartType,
    dimensions: SettingsDimensionsType,
    dataInput: SettingsDataInputType,
    general: SettingsGeneralType,
    chartelements: SettingsChartElementsType,
    label: SettingsLabelType,
    tick: SettingsTickType,
    tooltip: SettingsTooltipType,
}

export type ChartPropsType = {
    settingsRef: React.MutableRefObject<SettingsType>,
    dimensions: SettingsDimensionsType,
}