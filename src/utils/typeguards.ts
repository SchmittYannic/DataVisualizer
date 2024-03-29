import { dataAsJSONEntryType } from "./types";

export const isArrayOfDataAsJSONEntryType = (obj: any): obj is dataAsJSONEntryType[] => {
    if (!Array.isArray(obj)) return false;
    return obj.every((item) => isDataAsJSONEntryType(item));
}

export const isDataAsJSONEntryType = (obj: any): obj is dataAsJSONEntryType => {
    if (typeof obj !== "object" || obj === null) return false;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] !== "undefined") return true;
        }
    }
    return false;
}

export const isHTMLButtonElement = (obj: any): obj is HTMLButtonElement => {
    return obj instanceof HTMLButtonElement;
}

export const isSVGElement = (obj: any): obj is SVGElement => {
    return obj instanceof SVGElement;
}

export const isNumberArray = (value: any): value is number[] => {
    return Array.isArray(value) && value.every((num) => typeof num === 'number');
}