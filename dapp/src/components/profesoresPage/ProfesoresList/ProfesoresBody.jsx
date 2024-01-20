
import {useState, useEffect, useContext} from "react";

import {StateContext} from "../../StateContext.mjs";

import ProfesoresRow from "./ProfesoresRow.jsx";


const ProfesoresBody = () => {

    const {asignatura} = useContext(StateContext);

    const [profesoresLength, setProfesoresLength] = useState(0);

    useEffect(() => {
        console.log("Obtener el numero de profesores.");
        (async () => {
            try {
                const pr = await asignatura.profesoresLength();
                setProfesoresLength(pr.toNumber());
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);   // [] -> Sin dependencias. Solo se llama a useEffect una vez.

    let rows = [];
    rows.push(<ProfesoresRow key={"ab-"} />);

    return <tbody>{rows}</tbody>;
};

export default ProfesoresBody;
