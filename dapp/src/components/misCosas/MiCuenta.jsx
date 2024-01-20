
import {useState, useEffect, useContext} from "react";
import { StateContext } from "../StateContext.mjs";
import SubjectService from "../../js/SubjectService";

const MiCuenta = () => {

    const [addr, setAddr] = useState(null);
    const [balance, setBalance] = useState(null);
    const [perfil, setPerfil] = useState(null);

    const {asignatura} = useContext(StateContext);

    useEffect(() => {
        (async () => {
            try {
                const accounts = await window.web3.eth.getAccounts();
                const account = accounts[0];
                setAddr(account);

                const balance = await window.web3.eth.getBalance(account);
                setBalance(web3.utils.fromWei(balance, "ether"));

               let perfil = await new SubjectService(asignatura).whoAmI() 

                console.log(perfil)

                switch (perfil) {
                    case "owner": 
                        perfil = "Owner - usted desplegó este contrato"
                        break
                    case "coordinator":
                        perfil = "Coordinador de la asignatura"
                        break
                    case "professor":
                        perfil = "Profesor"
                        break
                    case "students":
                        perfil = "Alumno"
                        break
                    default:
                        perfil = "Usted no se ha registrado / iniciado sesión"
                        break
                }
               
                console.log(perfil)

                setPerfil(perfil)

            } catch (e) {
                console.log(e);
            }
        })();
    }, []);


    return (
        <article className="AppMiCuenta">
            <h3>Mi Cuenta</h3>
            <ul>
                <li>Dirección: <span style={{color: "blue"}}>{addr}</span></li>
                <li>Balance: <span style={{color: "blue"}}>{balance ?? "??"}</span> ethers</li>
                <li>Identificado como: <span style={{color: "green"}}>{perfil ?? "??"}</span></li>
            </ul>
        </article>);
};

export default MiCuenta;
