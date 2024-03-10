import { useState, createContext, useEffect, PropsWithChildren, ReactElement } from "react";
import { placeholderString } from "../constants";
import { dataAsJSONEntryType } from "../utils/types";

type DataTypeCounts = { [key: string]: number };

export type DataContextType = {
    fileIsUploaded: boolean,
    setFileIsUploaded: React.Dispatch<React.SetStateAction<boolean>>,
    demodata: string,
    setDemodata: React.Dispatch<React.SetStateAction<string>>,
    dataAsJSON: dataAsJSONEntryType[],
    setDataAsJSON: React.Dispatch<React.SetStateAction<dataAsJSONEntryType[]>>,
    dataAsJSONLength: number,
    //setDataAsJSONLength: React.Dispatch<React.SetStateAction<number>>,
    catColumns: string[],
    //setCatColumns: React.Dispatch<React.SetStateAction<string[]>>,
    catColumnsLength: number,
    //setCatColumnsLength: React.Dispatch<React.SetStateAction<number>>,
    numColumns: string[],
    //setNumColumns: React.Dispatch<React.SetStateAction<string[]>>,
    numColumnsLength: number,
    //setNumColumnsLength: React.Dispatch<React.SetStateAction<number>>,
    dateColumns: string[],
    //setDateColumns: React.Dispatch<React.SetStateAction<string[]>>,
    dateColumnsLength: number,
    //setDateColumnsLength: React.Dispatch<React.SetStateAction<number>>,
    catOptions: string[],
    //setCatOptions: React.Dispatch<React.SetStateAction<string[]>>,
    dateOptions: string[],
    //setDateOptions: React.Dispatch<React.SetStateAction<string[]>>,
    dataCopy: dataAsJSONEntryType[],
    //setDataCopy: React.Dispatch<React.SetStateAction<dataAsJSONEntryType[]>>,
    //operations: {},
    //setOperations: React.Dispatch<React.SetStateAction<{}>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

const initContextState = {
    fileIsUploaded: false,
    setFileIsUploaded: () => {},
    demodata: "",
    setDemodata: () => {},
    dataAsJSON: [],
    setDataAsJSON: () => {},
    dataAsJSONLength: 0,
    setDataAsJSONLength: () => {},
    catColumns: [],
    setCatColumns: () => {},
    catColumnsLength: 0,
    setCatColumnsLength: () => {},
    numColumns: [],
    setNumColumns: () => {},
    numColumnsLength: 0,
    setNumColumnsLength: () => {},
    dateColumns: [],
    setDateColumns: () => {},
    dateColumnsLength: 0,
    setDateColumnsLength: () => {},
    catOptions: [],
    setCatOptions: () => {},
    dateOptions: [],
    setDateOptions: () => {},
    dataCopy: [],
    setDataCopy: () => {},
    operations: {},
    setOperations: () => {},
    isLoading: false,
    setIsLoading: () => {},
};

export const DataContext = createContext<DataContextType>(initContextState);

export const DataProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [fileIsUploaded, setFileIsUploaded] = useState<boolean>(false);
    const [demodata, setDemodata] = useState<string>("");
    const [dataAsJSON, setDataAsJSON] = useState<dataAsJSONEntryType[]>([]);
    const [dataAsJSONLength, setDataAsJSONLength] = useState<number>(0);

    const [catColumns, setCatColumns] = useState<string[]>([]);
    const [catColumnsLength, setCatColumnsLength] = useState<number>(0);
    const [numColumns, setNumColumns] = useState<string[]>([]);
    const [numColumnsLength, setNumColumnsLength] = useState<number>(0);
    const [dateColumns, setDateColumns] = useState<string[]>([]);
    const [dateColumnsLength, setDateColumnsLength] = useState<number>(0);

    const [catOptions, setCatOptions] = useState<string[]>([]);
    const [dateOptions, setDateOptions] = useState<string[]>([]);
    const [dataCopy, setDataCopy] = useState<dataAsJSONEntryType[]>([]);

    const [operations, setOperations] = useState({
        setDataframe: false,
        setJSONLength: false,
        setCatOptions: false,
        setDateOptions: false,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);

        const fetchTestData = async (datasetName: string, callback: Function) => {
            if (datasetName === "useAutoData") {
                try {
                    const response = await fetch(`/data/AutoData.json`);
                    const AutoData = await response.json();
                    callback(AutoData);
                } catch (err) {
                    console.log("Error occured loading AutoData");
                }
            } else if (datasetName === "useWetterData") {     
                try {
                    const response = await fetch(`/data/WetterData.json`);
                    const WetterData = await response.json();
                    callback(WetterData);
                } catch (err) {
                    console.log("Error occured loading AutoData");
                }        
            }
        }

        fetchTestData(demodata, setDataAsJSON);
    }, [demodata]);

    useEffect(() => {
        if (dataAsJSON.length === 0) {
            setFileIsUploaded(false);
            setIsLoading(false);
            return
        }

        setFileIsUploaded(true);

        const columnNames = Object.keys(dataAsJSON[0]);

        // Function to count unique values, their data types, and the count of occurrences of each data type for each key
        const countUniqueValuesAndTypes = (arrayOfObjects: dataAsJSONEntryType[]) => {
            type uniqueValuesInfoType = { [key: string]: { uniqueValues: Set<any>, typeCounts: DataTypeCounts } }
            const uniqueValuesInfo: uniqueValuesInfoType = {};
            
            // Iterate over each object
            arrayOfObjects.forEach(obj => {
                // Iterate over each key in the object
                const objKeys = Object.keys(obj) as (keyof dataAsJSONEntryType)[];
                objKeys.forEach(key => {
                    // If the key doesn't exist in the uniqueValuesInfo object, initialize it
                    if (!uniqueValuesInfo[key]) {
                        uniqueValuesInfo[key] = {
                            uniqueValues: new Set(),
                            typeCounts: {}
                        };
                    }
                    
                    // Add the value of the key to the set to count unique values
                    uniqueValuesInfo[key].uniqueValues.add(obj[key]);
                    
                    const dataType = typeof obj[key];
                    // If field is not empty
                    if(!(dataType === "object" && obj[key] === null)) {
                        // Count occurrences of each data type
                        if (!uniqueValuesInfo[key].typeCounts[dataType]) {
                            uniqueValuesInfo[key].typeCounts[dataType] = 1;
                        } else {
                            uniqueValuesInfo[key].typeCounts[dataType]++;
                        }
                    } else {
                        // else field is empty
                        if (!uniqueValuesInfo[key].typeCounts["emptyField"]) {
                            uniqueValuesInfo[key].typeCounts["emptyField"] = 1;
                        } else {
                            uniqueValuesInfo[key].typeCounts["emptyField"]++;
                        }
                    }
                });
            });

            console.log(uniqueValuesInfo)
            
            // Convert sets to array of unique values and object to array of type counts
            const result: { [key: keyof uniqueValuesInfoType]: { uniqueValues: any[], typeCounts: [string, number][] } }  = {};
            const objKeys = Object.keys(uniqueValuesInfo) as (keyof uniqueValuesInfoType)[];
            objKeys.forEach(key => {
                Object.assign(result, { [key]: {
                    "uniqueValues": Array.from(uniqueValuesInfo[key].uniqueValues),
                    "typeCounts": Object.entries(uniqueValuesInfo[key].typeCounts).sort((a, b) => b[1] - a[1])
                }})
            });
            
            return result;
        }

        const uniqueValuesInfo = countUniqueValuesAndTypes(dataAsJSON);

        const catColumnsArray: string[] = [];
        const numColumnsArray: string[] = [];
        const dateColumnsArray: string[] = [];

        for (let column in columnNames) {
            const uniqueValueCount = uniqueValuesInfo[columnNames[column]].uniqueValues.length;

            if (uniqueValueCount <= 10) {
                catColumnsArray.push(columnNames[column]);
            }

            const uniqueTypesCount = uniqueValuesInfo[columnNames[column]].typeCounts.length;

            if (uniqueTypesCount === 1) {
                const columnType = uniqueValuesInfo[columnNames[column]].typeCounts[0][0];
                
                if (columnType === "number") {
                    numColumnsArray.push(columnNames[column]);
                }

                if (columnType === "string") {
                    dateColumnsArray.push(columnNames[column]);
                }
            } else if (uniqueTypesCount === 2) {
                const mostOccurringType = uniqueValuesInfo[columnNames[column]].typeCounts[0][0];
                const leastOccurringType = uniqueValuesInfo[columnNames[column]].typeCounts[1][0];

                if ((mostOccurringType === "emptyField" && leastOccurringType === "number") || (leastOccurringType === "emptyField" && mostOccurringType === "number")) {
                    numColumnsArray.push(columnNames[column]);
                }
            }
            /* Handle other cases in future */      
        }

        setCatColumns(catColumnsArray);
        setCatColumnsLength(catColumnsArray.length);
        setNumColumns(numColumnsArray);
        setNumColumnsLength(numColumnsArray.length);
        setDateColumns(dateColumnsArray);

        setOperations((prevState) => {
            const newState = {...prevState};
            newState.setDataframe = true;
            return newState
        });
    }, [dataAsJSON]);

    useEffect(() => {
        if (!fileIsUploaded) return

        setDataAsJSONLength(dataAsJSON.length);

        setOperations((prevState) => {
            const newState = {...prevState};
            newState.setJSONLength = true;
            return newState
        });
    }, [dataAsJSON, fileIsUploaded]);

    //create a copy of catColumns called catOptions, which includes a placeholderString.
    useEffect(() => {
        if (!fileIsUploaded) return

        const catOptions = JSON.parse(JSON.stringify(catColumns));
        if (!catOptions.includes(placeholderString)) catOptions.unshift(placeholderString);
        setCatOptions(catOptions);

        setOperations((prevState) => {
            const newState = {...prevState};
            newState.setCatOptions = true;
            return newState
        });
    }, [catColumns, fileIsUploaded]);

    /* Creates a copy of dataAsJSON saved as dataCopy.
    Creates a copy of dataColumn saved as dataOptions.
    Parses all the entries of the dateColumns into Date types
    to see if a column has indeed only dates inside.
    If an entry cant be parsed into a Date the column is removed from dateOptions */
    useEffect(() => {
        if (!fileIsUploaded) return
        if (dateColumns.length === 0) {
            setOperations((prevState) => {
                const newState = {...prevState};
                newState.setDateOptions = true;
                return newState
            });

            return
        }

        const data: dataAsJSONEntryType[] = JSON.parse(JSON.stringify(dataAsJSON));
        const dateOptions = JSON.parse(JSON.stringify(dateColumns));
        // const data = dataAsJSON.map(a => {return {...a}});
        // const dateOptions = dateColumns.map(a => {return {...a}});

        data.forEach(d => {
            let isDate = true;
            let invalidColumnIndex = [];
            for (let i = 0; i < dateColumns.length; i++){
                d[dateColumns[i]] = Date.parse(d[dateColumns[i]]);
                
                if(isNaN(d[dateColumns[i]])){
                    isDate = false;
                    invalidColumnIndex.push(i);
                }
            }

            for (let i = 0; i < invalidColumnIndex.length; i++){
                if(isDate === false){
                    dateOptions.splice(invalidColumnIndex[i], 1);
                }
            }
        });

        setDateOptions(dateOptions);
        setDateColumnsLength(dateOptions.length);
        setDataCopy(data);

        setOperations((prevState) => {
            const newState = {...prevState};
            newState.setDateOptions = true;
            return newState
        });
    }, [dataAsJSON, dateColumns, fileIsUploaded]);

    useEffect(() => {
        if (!fileIsUploaded) return

        const operationsStates = Object.values(operations);
        const isOperationsDone = operationsStates.every(v => v === true);

        if (isOperationsDone) setIsLoading(!isOperationsDone);
    }, [operations, fileIsUploaded]);

    return (
        <DataContext.Provider 
            value={{
                fileIsUploaded,
                setFileIsUploaded,
                demodata,
                setDemodata,
                dataAsJSON,
                setDataAsJSON,
                dataAsJSONLength,
                catColumns,
                catColumnsLength,
                numColumns,
                numColumnsLength,
                dateColumns,
                dateColumnsLength,
                catOptions,
                dateOptions,
                dataCopy,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </DataContext.Provider>
    )
}