#! /usr/local/bin/node

// Ejemplo de una app que se lanza desde la linea de comando.
// Transacciones para incrementar el contador. 

import fs from "fs";
import Web3 from "web3";
import TruffleContract from "@truffle/contract";

console.log("Ejemplo APP");

try {
    // Instancia de Web3
    let web3 = new Web3('http://127.0.0.1:7545');

    // Proveedor de Web3.
    let web3Provider = web3.currentProvider;

    // Cargar el artefacto del contrato Contador (json)
    const json = JSON.parse(fs.readFileSync("../truffle/build/contracts/Contador.json"));

    // Crear la abstraccion del contrato Contador
    const Contador = TruffleContract(json);

    // Provisionar el contrato con el proveedor web3
    Contador.setProvider(web3Provider);

    // ¿Conectado a la red Ganache?
    const id = await web3.eth.net.getId();
    if (id !== 5777) {
        throw new Error("No estoy conectado a Ganache.");
    }

    console.log(`Estoy conectado con el nodo Ethereum ${id}.`);

    // Usar la primera cuenta del usuario
    const accounts = await web3.eth.getAccounts();
    if (accounts.length == 0) {
        throw new Error("No hay cuentas.");
    }
    const account = accounts[0];
    console.log("Cuenta de usuario =", account);

    // Obtener el contrato desplegado
    const contador = await Contador.deployed();
    console.log("Dirección del Contrato =", contador.address);

    const c1 = await contador.valor();
    await contador.incr({from: account});
    await contador.incr({from: account});
    await contador.incr({from: account});
    await contador.incr({from: account});
    const c2 = await contador.valor();
    console.log(c1.toNumber(), ">>", c2.toNumber());

} catch (error) {
    console.log("ERROR:" + error.message || error);
    process.exit(1)
} finally {
    console.log("FIN");
    process.exit(0)
}
