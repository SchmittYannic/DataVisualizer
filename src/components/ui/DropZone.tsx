import { ChangeEvent, KeyboardEvent, useRef, useState, DragEvent, MouseEvent } from "react";
import { parse as papaparse } from "papaparse";

import useData from "../../hooks/useData";
import AsyncButton from "./AsyncButton";
import "./DropZone.css";
import { isArrayOfDataAsJSONEntryType } from "../../utils/typeguards";

const DropZone = () => {
    const { setDataAsJSON, setDemodata, setIsLoading, isLoading } = useData();
    const [selectedFile, setSelectedFile] = useState<File>();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileInput = (file: File) => {
        if(file.type === "text/csv") {
            setSelectedFile(file);
        } else {
            alert("Datei nicht vom Typ text/csv");
            setSelectedFile(undefined);
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        if (!(event.target instanceof Element)) return
        if (!target.files) return
        handleFileInput(target.files[0]);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!e.dataTransfer) return

        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...e.dataTransfer.items].forEach((item) => {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                if (!file) return
                handleFileInput(file);
            }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...e.dataTransfer.files].forEach((file) => {
                handleFileInput(file);
            });
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        //console.log("File(s) in drop zone");

        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!selectedFile) {
            alert("Keine Datei ausgewählt");
            return
        }

        setIsLoading(true);

        papaparse(selectedFile, {
            worker: true,
            header: true,
            dynamicTyping: true,
            complete: (results) => {               
                if (results.data.length > 5000 || (results.meta.fields && results.meta.fields.length > 20)) {
                    setIsLoading(false);
                    setSelectedFile(undefined);
                    alert("Datensatz zu groß! Da es sich um ein reines Frontend Projekt handelt, darf der Datensatz maximal 5.000 Zeilen und 20 Spalten enthalten. Dies soll ein Absturz des Browsers verhindern.")
                    return
                }
                setDemodata("");

                const { data } = results
                if (!isArrayOfDataAsJSONEntryType(data)) return
                setDataAsJSON(data);
            }
        });
    }

    const handleLabelKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
        const  { key } = e;
        if (!inputRef.current) return
        if (key !== "Enter") return
        inputRef.current.click();
    };

    return (
        <div 
            className="dropzone-container" 
            onDrop={(e) => handleDrop(e)} onDragOver={(e) => handleDragOver(e)}
        >
            <p className="upload-text">Laden Sie hier Ihren Datensatz hoch.</p>
            
            <iframe name="dummyframe" id="dummyframe" title="dummyframe" style={{display: "none"}}></iframe>
            <form target="dummyframe" method="POST" encType="multipart/form-data" >
                <label 
                    className="dropzone-label"
                    title="Datei für Upload auswählen"
                    tabIndex={0}
                    onKeyDown={handleLabelKeyDown}
                    onClick={() => {
                        if (!inputRef.current) return
                        inputRef.current.click();
                    }}
                >
                    <div className="dropzone-content-container">
                        <svg className="dropzone-svg" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="dropzone-headtext">
                            <span className="font-bold">
                                Klicken zum Hochladen
                            </span> oder durch Drag & Drop
                        </p>
                        <p className="dropzone-subtext">nur .csv Dateien</p>
                    </div>
                    <input
                        ref={inputRef}
                        className="dropzone-input"
                        type="file" 
                        name="file" 
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={handleFileChange}
                    />
                    <p className="filename-display">{selectedFile && "Filename: " + selectedFile.name}</p>
                    <label>
                        <AsyncButton
                            className={`btn${isLoading ? " disabled-btn" : ""}`}
                            type="submit"
                            title="ausgewählte Datei hochladen"
                            onClick={handleSubmit}
                            isLoading={isLoading}
                        >
                            Upload
                        </AsyncButton>
                    </label>
                </label>
            </form>
        </div>
    )
}

export default DropZone