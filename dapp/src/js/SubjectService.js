import { useState, useEffect, useContext } from "react";
import { StateContext } from "../components/StateContext.mjs";

class SubjectService {

    constructor(asignatura) {

        this.contract = asignatura;

    }

    async whoAmI() {

        const currentAccount = (await window.web3.eth.getAccounts())[0]

        if (currentAccount === await this.getOwner()) return "owner";
        if (currentAccount === await this.getCoordinator()) return "coordinator";
        if ((await this.getProfessors()).includes(currentAccount)) return "professor";
        if ((await this.getStudents()).includes(currentAccount)) return "students";

        return "none"

    }

    async getStudents() {

        let students = null;

        try {

            students = await this.contract.matriculas();

        } catch (e) {

            console.log("Error while getting students:\n\n" + e + "\n\n")

            return null
        }
        return students;
    }

    async getProfessors() {

        let professors = null;

        try {

            professors = await this.contract.profesores();

        } catch (e) {

            console.log("Error while getting professors:\n\n" + e + "\n\n")

            return null
        }
        return professors;
    }

    async getOwner() {

        let owner = null;
        try {
            owner = await this.contract.owner();
        } catch (e) {
            console.log("Error while getting owner:\n\n" + e + "\n\n")
            return null
        }
        return owner;

    }

    async getCoordinator() {

        let coord = null;
        try {
            coord = await this.contract.coordinador();
        } catch (e) {
            console.log("Error while getting coordinador:\n\n" + e + "\n\n")
            return null
        }
        return coord;

    }

    async setCoordinator(addr) {

        var r = null

        const accounts = await window.web3.eth.getAccounts()
        const account = accounts[0]

        if (addr.length !== 42 || !addr.startsWith("0x")) {
            return false
        }

        try {
            r = await this.contract.setCoordinador(addr, { from: account })

        } catch (e) {

            console.log("Error while setting coordinator:\n\n" + e + "\n\n")
            return false

        }

        return r.receipt.status ? true : false
    }

    async isClosed() {

        let closed = null;
        try {
            closed = await this.contract.cerrada();
            console.log(closed)
        } catch (e) {
            console.log("Error while getting subject state:\n\n" + e + "\n\n")
            return null;
        }
        return closed;

    }


    async setClosed() {

        var r = null

        const accounts = await window.web3.eth.getAccounts()
        const account = accounts[0]

        try {

            r = await this.contract.cerrar({ from: account })

        } catch (e) {

            console.log("Error while closing the subject:\n\n" + e + "\n\n")
            return false

        }

        return r.receipt.status ? true : false
    }

    async selfRegistration(name, dni, email) {

        var r = null

        const accounts = await window.web3.eth.getAccounts()
        const account = accounts[0]
        try {

            r = await this.contract.automatricula(name,dni,email,{ from: account })

        } catch (e) {

            console.log("Error while self-registration: \n\n" + e + "\n\n")
            return false

        }

        return r.receipt.status ? true : false
    }






}

export default SubjectService