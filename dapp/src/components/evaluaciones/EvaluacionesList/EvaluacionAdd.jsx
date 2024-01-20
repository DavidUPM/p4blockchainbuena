import {useState, useEffect, useContext} from "react";

import {StateContext} from "../../StateContext.mjs";

import SubjectService from "../../../js/SubjectService";

const EvaluacionRow = ({evaluacionIndex}) => {

    const {asignatura} = useContext(StateContext);

    const [rol, setRol] = useState("");

    const [result, setResult] = useState("");

    useEffect(() => {
        console.log("Obtener la evaluacion del indice indicado.");
        (async () => {
            try {
                const rolUsuario = (await new SubjectService(asignatura).whoAmI()); 
                setRol(rolUsuario);
                console.log("rol evaluacion: " + rol)

            } catch (e) {
                console.log(e);
            }
        })();
    }, []);   // [] -> Sin dependencias. Solo se llama a useEffect una vez.

const [nombreEval, setNombreEvalr] = useState("");
const [fecha, setFecha] = useState("");
const [porcentaje, setPorcentaje] = useState("");
const [notaMin, setNotaMin] = useState("");

const nombreIntroducido = (event) => {
    setNombreEvalr(event.target.value);
    console.log("nombre evaluacion: " + nombreEval);
};
const fechaIntroducida = (event) => {
    setFecha(event.target.value);
    console.log("fecha: " + nombreEval);
};
const porcentajeIntroducido = (event) => {
    setPorcentaje(event.target.value);
    console.log("porcentaje: " + nombreEval);
};
const notaMinIntroducido = (event) => {
    setNotaMin(event.target.value);
    console.log("notamin: " + nombreEval);
};
//Fecha -> timesaamp, porcentaje, nota min


    return (rol === "coordinator" && (<article className="AppMisDatos">
            <h3>Crear evaluación</h3>

            <form>
                <p>
                    <input key="EvaluacionName" type="text" placeholder="Nombre de la evaluación"
                    onChange={nombreIntroducido}/>
                </p> 
                <p>
                    <input key="EvaluacionFecha" type="number"  placeholder="Fecha"
                    onChange={fechaIntroducida}/>
                </p> 
                <p>
                    <input key="Porcentaje" type="number"  placeholder="Porcentaje"
                    onChange={porcentajeIntroducido}/>
                </p> 
                <p>
                    <input key="NoraMin" type="number"  placeholder="Nota mínima"
                    onChange={notaMinIntroducido}/>
                </p> 

                <button key="submit" className="pure-button" type="button"
                        onClick={async ev => {
                            ev.preventDefault();

                            const accounts = await window.web3.eth.getAccounts();
                            const account = accounts[0];
                            if (!account) { throw new Error('No se puede acceder a las cuentas de usuario.'); }

                            setResult('Enviando petición.');

                            const r = await new SubjectService(asignatura).setEvaluation(nombreEval, fecha, porcentaje, notaMin);
                            
                           // console.log("r:" + r);

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


export default EvaluacionRow;
