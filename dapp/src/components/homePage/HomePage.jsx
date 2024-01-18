import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateContext.mjs";
import SubjectService from "../../js/SubjectService";

function HomePage() {

    const [owner, setOwner] = useState(null);
    const [coordinador, setCoordinador] = useState(null);
    const [asignatura_estado, setAsignaturaEstado] = useState(null);

    const {asignatura} = useContext(StateContext);

    useEffect(() => {

        (async () => {
            const owner = (await new SubjectService(asignatura).getOwner());
            setOwner(owner);
            const coord = (await new SubjectService(asignatura).getCoordinator());
            setCoordinador(coord)
            const estado = (await new SubjectService(asignatura).isClosed());
            setAsignaturaEstado(estado)
            const rolUsuario = (await new SubjectService(asignatura).whoAmI());; 
            setRol(rolUsuario);
        })();

   },[]);

   const handleInputChange = (event) => {
    setNuevaDireccion(event.target.value);
  };
  
  const [nuevaDireccion, setNuevaDireccion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensaje2, setMensaje2] = useState("");
  const [mensajeColor, setMensajeColor] = useState("");
  const [rol, setRol] = useState("");
  

  const handleCambiarDireccion = async () => {
    const coord = (await new SubjectService(asignatura).setCoordinator(nuevaDireccion));
    if (coord == false) {
        setMensaje("La dirección no es correcta.");
        
        const nuevoCoord = await new SubjectService(asignatura).getCoordinator();
    setCoordinador(nuevoCoord);
    } else {
        setMensaje("El cambio se ha realizado correctamente.");
        setMensajeColor("text-success");
        const nuevoCoord = await new SubjectService(asignatura).getCoordinator();
    setCoordinador(nuevoCoord);
    }
    
    if (nuevaDireccion.trim() === "") {
        setMensaje("La dirección no puede estar vacía.");
        setMensajeColor("text-danger");
      return;
    }
    return coord;
};

const handleCerrarAsignatura = async () => {
    const coord = (await new SubjectService(asignatura).setClosed());
    if (coord){
        setMensaje2("Asignatura cerrada");
    }else{
        setMensaje2("No se ha podido cerrar la asignatura");
    }
};



    return (
        <div>
            <p>Página Home de la Asignatura Lite</p>
            <p>Dirección del usuario owner: {owner}</p>
            <p>Dirección del usuario coordinador: {coordinador}</p>
            {asignatura_estado !== null && (
                <p>
                    La asignatura está: {asignatura_estado ? <b>Cerrada</b> : <b>Abierta</b>}
                </p>
            )}


{rol === "coordinator" && (
        <div>
            <h3>Cambiar dirección del coordinador</h3>

            <form>
                <p>
                    Nueva dirección del coordinador:  &nbsp;
                    <input key="coordinador" type="text" name="coordinador" value={nuevaDireccion} placeholder="Dirección del coordinador"
                           onChange={handleInputChange}/>
                </p>
                

                <button key="submit" className="pure-button" type="button"
                        onClick={
                            handleCambiarDireccion
                        }>Cambiar dirección</button>
                        
            <p className={mensajeColor}>{mensaje}</p>           
            </form>

            <h3>Cerrar asignatura</h3>

            <form>
                 <button key="submit" className="pure-button" type="button"
                        onClick={
                            handleCerrarAsignatura
                        }>Cerrar asignatura</button>

             <p className={mensajeColor}>{mensaje2}</p>         
            </form>
            </div>
      )}

        </div>
    );
}

export default HomePage;
