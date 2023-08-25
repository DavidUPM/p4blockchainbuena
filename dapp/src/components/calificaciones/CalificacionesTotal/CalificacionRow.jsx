import {useState, useEffect, useContext} from "react";

import {StateContext} from "../../StateContext.mjs";

const CalificacionRow = ({alumnoIndex}) => {

    const {asignatura, txEmitter} = useContext(StateContext);

    const [alumnoName, setAlumnoName] = useState(null);
    const [notas, setNotas] = useState([]);

    const [forceReload, setForceReload] = useState(0);

    // Este efecto escucha los eventos "tx" de txEmitter que informan de que se ha
    // recibido una transaccion que afecta al contrato.
    // Si ocurre eso, se fuerza el renderizado del componente cambiando el valor de estado forceReload.
    // El siguiente efecto, que es el obtiene los valores que pinta este componente, depende de forceReload.
    useEffect(() => {
        // Vigilar los eventos tx de txEmitter.
        const eh = (tx) => { setForceReload(fr => fr + 1); };  // Cambiar el valor fuerza el repintado del componente.
        txEmitter.on("tx", eh);

        // Limpiar la subscripcion a eventEmitter.
        return () => { txEmitter.off("tx", eh); }
    }, []);   // [] -> Sin dependencias.
              // Solo se llama a useEffect al renderizar la primera vez que se renderiza el componente.

    useEffect(() => {
        (async () => {
            try {
                // Obtener la direccion del alumno:
                const addr = await asignatura.matriculas(alumnoIndex);

                // Obtener el nombre del alumno:
                const alumnoName = (await asignatura.datosAlumno(addr))?.nombre;
                setAlumnoName(alumnoName);

                // Obtener el numero de evaluaciones:
                const ne = await asignatura.evaluacionesLength();

                let notas = [];
                for (let ei = 0; ei < ne; ei++) {
                    const nota = await asignatura.calificaciones(addr, ei);
                    notas.push(
                        <td key={"p2-" + alumnoIndex + "-" + ei}>
                            {nota?.tipo.toString() === "0" ? "" : ""}
                            {nota?.tipo.toString() === "1" ? "N.P." : ""}
                            {nota?.tipo.toString() === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
                        </td>
                    );
                }
                setNotas(notas)
            } catch (e) {
                console.log(e);
            }
        })();
    }, [forceReload]);   // Si cambia el valor de forceReload, se vuelven a obtener los datos a pintar.

    return <tr key={"d" + alumnoIndex}>
        <th>A<sub>{alumnoIndex}</sub></th>
        <td>{alumnoName}</td>
        {notas}
    </tr>;
};

export default CalificacionRow;
