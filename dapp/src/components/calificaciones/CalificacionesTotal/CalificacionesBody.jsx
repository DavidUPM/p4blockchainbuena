import {useState, useEffect, useContext} from "react";

import {StateContext} from "../../StateContext.mjs";

import CalificacionRow from "./CalificacionRow.jsx";


const CalificacionesBody = () => {

    const {asignatura} = useContext(StateContext);

    const [matriculasLength, setMatriculasLength] = useState(0);

    useEffect(() => {
        // Obtener el numero de matriculaciones:
        (async () => {
            try {
                const ml = await asignatura.matriculasLength();
                setMatriculasLength(ml.toNumber());
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);   // [] -> Sin dependencias. Solo se llama a useEffect una vez.

    let rows = [];
    for (let i = 0; i < matriculasLength; i++) {
       rows.push(<CalificacionRow key={i} alumnoIndex={i}/>);
    }

    return <tbody>{rows}</tbody>;
};

export default CalificacionesBody;
