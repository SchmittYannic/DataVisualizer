import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const Homepage = lazy(() => import("./components/Homepage" /* webpackChunkName: "Homepage" */));
const UploadStep = lazy(() => import("./features/datavisualizer/UploadStep" /* webpackChunkName: "UploadStep" */));
const DataStep = lazy(() => import("./features/datavisualizer/DataStep" /* webpackChunkName: "DataStep" */));
const VisualizationStep = lazy(() => import("./features/datavisualizer/VisualizationStep" /* webpackChunkName: "VisualizationStep" */));
const ProgressSteps = lazy(() => import("./components/ProgressSteps" /* webpackChunkName: "ProgressStep" */));

export const steps = [
    {
        stepcount: 1,
        label: "Upload",
        component: UploadStep,
        path: "/DataVisualizer/UploadStep",
    },
    {
        stepcount: 2,
        label: "Datenansicht",
        component: DataStep,
        path: "/DataVisualizer/DataStep",
    },
    {
        stepcount: 3,
        label: "Visualisierung",
        component: VisualizationStep,
        path: "/DataVisualizer/VisualizationStep",
    },
]

const App = () => {
    return (
        <Router>
            <ScrollToTop>
                <Routes>
                    <Route path="/">
                        <Route index element={<Suspense><Homepage /></Suspense>}/>

                        <Route path="DataVisualizer">
                            <Route path="UploadStep" element={
                                <Suspense>
                                    <ProgressSteps />
                                    <UploadStep />
                                </Suspense>
                            } />

                            <Route path="DataStep" element={
                                <Suspense>
                                    <ProgressSteps />
                                    <DataStep />
                                </Suspense>
                            } />

                            <Route path="VisualizationStep" element={
                                <Suspense>
                                    <ProgressSteps />
                                    <VisualizationStep />
                                </Suspense>
                            } />
                        </Route>
                    </Route>

                    {/* if route doesnt exist redirect back to frontpage */}
                    <Route path="*" element={ <Navigate to="/" /> }/>
                </Routes>
            </ScrollToTop>
        </Router>
    )
}

export default App;
