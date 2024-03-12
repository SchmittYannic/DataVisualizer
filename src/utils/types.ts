export type dataAsJSONEntryType = {
    [key: string]: string | number,
};

export type BarchartDataEntryType = {
    key: string;
    value: number;
}

export type PathDataEntryType = {
    key: "pathdata",
    values: dataAsJSONEntryType[]
}

export type BoxplotStatsType = {
    q1: number | undefined,
    median: number | undefined,
    q3: number | undefined,
    iqr: number | undefined,
    lowerIqr: number | undefined,
    upperIqr: number | undefined,
    min: number | undefined,
    max: number | undefined,
    lowOutlier: number[] | undefined,
    highOutlier: number[] | undefined,
    skewness: number | undefined,
    kurtosis: number | undefined,
}

export type BoxplotDataEntryType = {
    key: keyof dataAsJSONEntryType,
    value: BoxplotStatsType,
}

export type OutlierDataEntryType = {
    key: string | number,
    value: number
}

export type useScrollPositionType = {
    scrollY: undefined | number,
    scrollX: undefined | number,
}

export type PositionsType = {
    y:number,
    x:number,
}

export type TabType = "upload" | "data" | "visualisierung";

export type SettingsTabType = "Diagrammkonfiguration" | "Chartoptionen" | "Dimensionen" | "Daten" | "Allgemein" | "Elemente" | "Titel" | "X-Achsenbeschriftung" | "Y-Achsenbeschriftung" | "Teilstriche und Gitternetz" | "Tooltip" | "Download"

export type ColorschemeType = "accent" | "category10" | "dark2" | "paired" | "pastel1" | "pastel2" | "set1" | "set2" | "set3" | "tableau10"

export type DefaultAccordionStateType = {
    id: number,
    name: SettingsTabType,
    isExpanded: boolean,
}

export type ChartOptionsType = {
    name: string,
    action: ChartType,
    icon: JSX.Element,
}

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
    colorscheme: ColorschemeType,
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