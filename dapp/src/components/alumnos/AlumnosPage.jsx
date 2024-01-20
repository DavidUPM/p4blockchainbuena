import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateContext.mjs";
import AlumnosList from "./AlumnosList/index.jsx";
import SubjectService from "../../js/SubjectService";



function AlumnosPage(){

    const {asignatura} = useContext(StateContext);

    const [rol, setRol] = useState("");
    
    useEffect(() => {

        (async () => {
            const rolUsuario = (await new SubjectService(asignatura).whoAmI()); 
            setRol(rolUsuario);
        })();

   },[]);

const [nombreAlumno, setNombreAlumno] = useState("");
const [dniAlumno, setDniAlumno] = useState("");
const [emailAlumno, setEmailAlumno] = useState("");
const [mensajeAutomatricula, setmensajeAutomatricula] = useState("");

const nombreIntroducido = (event) => {
    setNombreAlumno(event.target.value);
  };

  const dniIntroducido = (event) => {
    setDniAlumno(event.target.value);
  };

  const emailIntroducido = (event) => {
    setEmailAlumno(event.target.value);
  };


const handleAutomatricularse = async () => {
    if (nombreAlumno == null || dniAlumno == null || emailAlumno == null){
        setmensajeAutomatricula("Rellene todos los campos");
        
    }else{
        const automatricula = (await new SubjectService(asignatura).selfRegistration(nombreAlumno, dniAlumno, emailAlumnos));
        if (automatricula) {
            setmensajeAutomatricula("Te has matriculado correctamente");
        } else {
            setmensajeAutomatricula("Ha habido algun error en el proceso de automatricula");
        }
        
    }
};

const mostrarAlumnosList = rol === "owner" || rol === "professor" || rol === "coordinator"

    return (
        <div>

    <section className="AppAlumnos">
        
        <h2>Alumnos</h2>
        
        {mostrarAlumnosList && <AlumnosList/>}
        
    </section>
    <section className="FormularioMatricula">
        <h2>Formulario Matrícula</h2>

        <form>
                <p>
                    <input key="nombreAlumno" type="text" name="coordinador" value={nombreAlumno} placeholder="Nombre del alumno"
                    onChange={nombreIntroducido}/>
                </p>

                <p>
                    <input key="dniAlumno" type="text" name="coordinador" value={dniAlumno} placeholder="DNI"
                    onChange={dniIntroducido}/>
                </p>

                <p>
                    <input key="emailAlumno" type="text" name="coordinador" value={emailAlumno} placeholder="Email"
                    onChange={emailIntroducido}/>
                </p>
                

                <button key="submit" className="pure-button" type="button"
                        onClick={
                            handleAutomatricularse
                        }>Automatricularse</button>
                        
            <p>{mensajeAutomatricula}</p>           
            </form>
        
    </section>
    </div>
    );
}

export default AlumnosPage;
