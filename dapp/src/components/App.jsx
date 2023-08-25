import {BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from './Layout.jsx';
import HomePage from './homePage/HomePage.jsx';
import EvaluacionesPage from "./evaluaciones/EvaluacionesPage.jsx";
import AlumnosPage from "./alumnos/AlumnosPage.jsx";
import AlumnoDetail from "./alumnos/AlumnoDetail.jsx";
import CalificacionesPage from "./calificaciones/CalificacionesPage.jsx";
import MisCosasPage from "./misCosas/MisCosasPage.jsx";
import NoMatch from './NoMatch';


const App = () => (
    <div className="appCounter">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="evaluaciones" element={<EvaluacionesPage/>}/>
                    <Route path="alumnos" element={<AlumnosPage/>}/>
                    <Route path="alumnos/:addr" element={<AlumnoDetail/>}/>
                    <Route path="calificaciones" element={<CalificacionesPage/>}/>
                    <Route path="miscosas" element={<MisCosasPage/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
