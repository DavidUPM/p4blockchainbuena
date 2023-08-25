
import {useState, useEffect} from "react";

const MiCuenta = () => {

    const [addr, setAddr] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const accounts = await window.web3.eth.getAccounts();
                const account = accounts[0];
                setAddr(account);

                const balance = await window.web3.eth.getBalance(account);
                setBalance(web3.utils.fromWei(balance, "ether"));
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
            </ul>
        </article>);
};

export default MiCuenta;
