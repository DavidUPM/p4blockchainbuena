import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateContext.mjs";
import ProfesoresList from "./ProfesoresList/index.jsx";
import SubjectService from "../../js/SubjectService";


function ProfesoresPage(){

    const {asignatura} = useContext(StateContext);

    const [rol, setRol] = useState("");
    
    useEffect(() => {

        (async () => {
            const rolUsuario = (await new SubjectService(asignatura).whoAmI()); 
            setRol(rolUsuario);
        })();

   },[]);

const [nombreProfesor, setNombreProfesor] = useState("");
const [nombreDireccion, setNombreDireccion] = useState("");
const [mensajeAutomatricula, setmensajeAutomatricula] = useState("");


const nombreIntroducido = (event) => {
    setNombreProfesor(event.target.value);
    console.log(nombreProfesor);
  };

  const direccionIntroducida = (event) => {
    setNombreDireccion(event.target.value);
    console.log(nombreDireccion);
  };  


const handleAñadirProfesor = async () => {
    if (nombreProfesor == null || nombreDireccion == null){
        setmensajeAutomatricula("Rellene todos los campos");
        
    }else{
        const profesor = (await new SubjectService(asignatura).setProfessor(nombreDireccion, nombreProfesor));
        if (profesor) {
            setmensajeAutomatricula("Se ha añadido al porfesor correctamente");
        } else {
            setmensajeAutomatricula("Ha habido algun error en el proceso");
        }
        
    }
};

const mostrarProfesoresList = rol === "owner" 

    return (
        <div>

    <section className="AppProfesores">
        
        <h2>Profesores</h2>
        
        {<ProfesoresList/>}
        
    </section>

    
{rol === "owner" && (
    <section className="FormularioAñadirProfesor">
        <h3>Formulario para añadir un nuevo profesor</h3>

        <form>
                <p>
                    <input key="nombreProfesor" type="text" name="profesor" value={nombreProfesor} placeholder="Nombre del profesor"
                    onChange={nombreIntroducido}/>
                </p>   

                <p>
                    <input key="nombreDireccion" type="text" name="direccion" value={nombreDireccion} placeholder="Dirección del profesor"
                    onChange={direccionIntroducida}/>
                </p>         

                <button key="submit" className="pure-button" type="button"
                        onClick={
                            handleAñadirProfesor
                        }>Añadir</button>
                        
            <p>{mensajeAutomatricula}</p>           
            </form>
        
    </section>
     )}
    </div>
    );
}

export default ProfesoresPage;
