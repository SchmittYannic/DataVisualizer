import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { DataProvider } from "./context/DataProvider.tsx"
import { FontProvider } from "./context/FontProvider.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FontProvider>
            <DataProvider>
                <App />
            </DataProvider>
        </FontProvider>
    </React.StrictMode>,
)
