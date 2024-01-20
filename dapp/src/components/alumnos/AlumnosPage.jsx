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

const [addrNuevoAlumno, setAddrNuevoAlumno] = useState("");
const [nombreNuevoAlumno, setNombreNuevoAlumno] = useState("");
const [dniNuevoAlumno, setDniNuevoAlumno] = useState("");
const [emailNuevoAlumno, setEmailNuevoAlumno] = useState("");
const [mensajeNuevoAlumnoMatriculado, setmensajeNuevoAlumnoMatriculado] = useState("");

const addrNuevoAlumnoIntroducido = (event) => {
    setAddrNuevoAlumno(event.target.value);
  };
  
const nombreNuevoAlumnoIntroducido = (event) => {
    setNombreNuevoAlumno(event.target.value);
  };

  const dniNuevoAlumnoIntroducido = (event) => {
    setDniNuevoAlumno(event.target.value);
  };

  const emailNuevoAlumnoIntroducido = (event) => {
    setEmailNuevoAlumno(event.target.value);
  };

  const handleMatricularNuevoAlumno = async () => {
    if (addrNuevoAlumno == null || nombreAlumno == null || dniAlumno == null || emailAlumno == null){
        setmensajeNuevoAlumnoMatriculado("Rellene todos los campos");
        
    }else{
        const matricula = (await new SubjectService(asignatura).setStudent(addrNuevoAlumno, nombreNuevoAlumno, dniNuevoAlumno, emailNuevoAlumno));
        console.log(matricula)
        if (matricula) {
            setmensajeNuevoAlumnoMatriculado("Se ha matriculado correctamente al alumno");
        } else {
            setmensajeNuevoAlumnoMatriculado("Ha habido algun error en el proceso de añadir");
        }
        
    }
};


 const mostrar = rol === "coordinator"  || rol === "owner" || rol === "professor" 
    return (
        
        <div>

    <section className="AppAlumnos">
        
        <h2>Alumnos</h2>
        
        {mostrar && <AlumnosList/>}
        
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
{rol === "owner" && (
    <section className="FormularioMatricula">
        <h2>Formulario para matricular nuevos alumnos</h2>

        <form>
                <p>
                    <input key="addrAlumno" type="text" name="addr" value={addrNuevoAlumno} placeholder="Dirección del alumno"
                    onChange={addrNuevoAlumnoIntroducido}/>
                </p>

                <p>
                    <input key="nombreNuevoAlumno" type="text" name="nombre" value={nombreNuevoAlumno} placeholder="Nombre del alumno"
                    onChange={nombreNuevoAlumnoIntroducido}/>
                </p>

                <p>
                    <input key="dniNuevoAlumno" type="text" name="dni" value={dniNuevoAlumno} placeholder="DNI"
                    onChange={dniNuevoAlumnoIntroducido}/>
                </p>

                <p>
                    <input key="emailNuevoAlumno" type="text" name="email" value={emailNuevoAlumno} placeholder="Email"
                    onChange={emailNuevoAlumnoIntroducido}/>
                </p>
                

                <button key="submit2" className="pure-button" type="button"
                        onClick={
                            handleMatricularNuevoAlumno
                        }>Matricular nuevo alumno</button>
                        
            <p>{mensajeNuevoAlumnoMatriculado}</p>           
            </form>
        
    </section>)}
    </div>
    );
}

export default AlumnosPage;
