import { dataAsJSONEntryType } from "./types";

// Type guard function
export const isArrayOfDataAsJSONEntryType = (obj: any): obj is dataAsJSONEntryType[] => {
    if (!Array.isArray(obj)) return false;
    // Check if every element in the array is of type dataAsJSONEntryType
    return obj.every((item) => isDataAsJSONEntryType(item));
}

// Helper function to check if an object is of type dataAsJSONEntryType
export const isDataAsJSONEntryType = (obj: any): obj is dataAsJSONEntryType => {
    if (typeof obj !== "object" || obj === null) return false;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] !== "undefined") return true;
        }
    }
    return false;
}