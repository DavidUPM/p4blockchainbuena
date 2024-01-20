import { useState, useEffect, useContext } from "react";

import {StateContext} from "../StateContext.mjs";

import SubjectService from "../../js/SubjectService";



const Calificar = () => {

    const {asignatura} = useContext(StateContext);

    // Conservar los valores metidos en el formulario
    let [alumnoAddr, setAlumnoAddr] = useState("");
    let [indexEval, setEvalIndex] = useState("");
    let [tipo, setTipo] = useState("");
    let [calificacion, setCalificacion] = useState(""); 

    const [result, setResult] = useState("");

    const [rol, setRol] = useState("");

    const [alumnos_list, setAlumnosList] = useState([]);
    const [alumnos_list2, setAlumnosList2] = useState([]);
    const [alumno_seleccionado, setAlumnos] = useState(null);

    const [evaluaciones_list, setEvaluacionesList] = useState([]);
    const [evaluaciones_list2, setEvaluacionesList2] = useState([]);
    const [evaluacion_seleccionada, setEvaluacion] = useState(null);

    const [addr_alumno, setAddrAlumno] = useState("");
    const [indice_evaluacion, setIndiceEvaluacion] = useState("");
    let names_list = [];
    const notas = [];

    const [namesList, setNamesList] = useState([]);
    const [evaluationsList, setEvaluationsList] = useState([]);

    useEffect(() => {

        (async () => {
            
            const alumnos_list = (await new SubjectService(asignatura).getStudentsInfo());
            setAlumnosList(alumnos_list.map(alumno => alumno?.nombre));
            setAlumnosList2(alumnos_list);

            const evaluaciones_list = await new SubjectService(asignatura).getEvaluations();
            setEvaluationsList(evaluaciones_list.map(evaluacion => evaluacion?.nombre));
            setEvaluacionesList2(evaluaciones_list);

            const rolUsuario = (await new SubjectService(asignatura).whoAmI()); 
            setRol(rolUsuario);
        })();

    }, [asignatura]);


    const handleDropdownChange1 = (opcion) => {
        setAlumnos(opcion);
        for(let i = 0; i < alumnos_list2?.length; i++){
            console.log("opcion:" + opcion);
            console.log("alumnos_list[i].nombre:" + alumnos_list2[i]?.nombre);
            if(opcion === alumnos_list2[i]?.nombre){

                setAddrAlumno(alumnos_list2[i]?.address)
                console.log("Address alumno:" + alumnos_list2[i].address);
                
                break;
            }
        }
      };

    const handleDropdownChange2 = (opcion2) => {
        console.log("Lista de evaluaciones1: " + opcion2);
        setEvaluacion(opcion2);
        console.log("Lista de evaluaciones2: " + evaluaciones_list2);
        for(let i = 0; i < evaluaciones_list2.length; i++){
            if(opcion2 === evaluaciones_list2[i].nombre){
                setIndiceEvaluacion(i);
                console.log("Indice evaluacion:" + i);                
                break;
            }
        }
      };

    return (rol === "professor" && (<article className="AppMisDatos">
            <h3>Calificar</h3>

            <form>
                <p>
                    Nombre del Alumno:  &nbsp;
                    <select onChange={(e) => handleDropdownChange1(e.target.value)}>
                    
                    <option value="">Selecciona una opción</option>
                    {alumnos_list.map((opcion, index) => (
                        <option key={index} value={opcion}>
                        {opcion}
                        </option>
                    ))}
                    </select>
                </p>
                <p>
                    Evaluación:  &nbsp;
                    <select onChange={(e) => handleDropdownChange2(e.target.value)}>
                    <option value="">Selecciona una evaluación</option>
                    {evaluationsList?.map((opcion2, index) => (
                        <option key={index} value={opcion2}>
                        {opcion2}
                        </option>
                    ))}
                    </select>
                </p>
                <p>
                    Tipo: (0=Pendiente 1=N.P. 2=Normal):  &nbsp;
                    <input key="tipo" type="number" name="tipo" value={tipo} placeholder="Tipo de nota"
                           onChange={ev => setTipo(ev.target.value)}/>
                </p>
                <p>
                    Nota (x100):  &nbsp;
                    <input key="calificacion" type="number" name="calificacion" value={calificacion} placeholder="Nota"
                           onChange={ev => setCalificacion(ev.target.value)}/>
                </p>

                <button key="submit" className="pure-button" type="button"
                        onClick={async ev => {
                            ev.preventDefault();

                            const accounts = await window.web3.eth.getAccounts();
                            const account = accounts[0];
                            if (!account) { throw new Error('No se puede acceder a las cuentas de usuario.'); }

                            setResult('Enviando petición.');

                            //studentAddress, evaluationIndex, calificationType, calification
                            console.log("add_alumno:" + addr_alumno);
                            console.log("indice_evaluacion:" + indice_evaluacion);
                            console.log("tipo:" + tipo);
                            console.log("calificacion:" + calificacion);

                            const r = await new SubjectService(asignatura).setCalification(addr_alumno, indice_evaluacion, tipo, calificacion);
                            
                            console.log("r:" + r);

                            //const r = await asignatura.califica(alumnoAddr, indexEval, tipo, calificacion, {from: account});
                            if (r === true) { setResult('La transacción fue exitosa.');
                            } else if (r === false) { setResult('La transacción falló.');
                            } else { setResult('La transacción está pendiente.');
                            }

                        }}>Calificar</button>

                <p> Último estado = {result}</p>
            </form>
    </article>));
};

export default Calificar;
