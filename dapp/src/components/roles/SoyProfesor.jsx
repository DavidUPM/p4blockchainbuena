
import {useState, useEffect, useContext} from "react";

import {StateContext} from "../StateContext.mjs";

const SoyProfesor = ({children}) => {

    const {asignatura} = useContext(StateContext);

    const [profesorAddr, setProfesorAddr] = useState(null);
    const [myAddr, setMyAddr] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                // Obtener addr del profesor:
                const addr = await asignatura.profesor();
                setProfesorAddr(addr.toString());

                // Obtener mi addr:
                const accounts = await window.web3.eth.getAccounts();
                setMyAddr(accounts[0]);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);   // [] -> Sin dependencias. Solo se llama a useEffect una vez.

    if (profesorAddr !== myAddr) {
        return null
    }
    return <>
        {children}
    </>
};

export default SoyProfesor;
