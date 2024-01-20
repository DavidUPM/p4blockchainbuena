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

        let students = new Array();

        try {
            length = await this.contract.matriculasLength()
            for (let i = 0; i < length; i++) {
                let student = await this.contract.matriculas(i)
                students.push(student)
            }

        } catch (e) {

            console.log("Error while getting students:\n\n" + e + "\n\n")

            return null
        }
        return students;
    }


    async getStudentsInfo() {

        let students = await this.getStudents();
        let dataList = new Array()

        try {

            for (let i = 0; i < students.length; i++) {
                let student = await this.contract.datosAlumno(students[i]);
                student.address = students[i];
                dataList.push(student);
            }

        } catch (e) {

            console.log("Error while getting students info:\n\n" + e + "\n\n")
            return null
        }

        return dataList;
    }

    async getProfessors() {

        let professors = new Array();

        try {
            length = await this.contract.profesoresLength()
            for (let i = 0; i < length; i++) {
                let professor = await this.contract.profesores(i)
                professors.push(professor)
            }

        } catch (e) {

            console.log("Error while getting professors:\n\n" + e + "\n\n")

            return null
        }
        return professors;
    }

    async getProfessorInfo() {

        let professors = await this.getProfessors();
        let dataList = new Array()

        try {

            for (let i = 0; i < professors.length; i++) {
                let professor = await this.contract.datosProfesor(professors[i]);
                console.log(professor)
                dataList.push(professor);
            }

        } catch (e) {

            console.log("Error while getting professors info:\n\n" + e + "\n\n")
            return null

        }

        return dataList;
    }


    async setProfessor(professorAddress, nombre) {

        var r = null

        const accounts = await window.web3.eth.getAccounts()
        const account = accounts[0]

        try {

            r = await this.contract.addProfesor(professorAddress, nombre, { from: account })

        } catch (e) {

            console.log("Error while setting professor: \n\n" + e + "\n\n")
            return false

        }

        return r.receipt.status ? true : false

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
            console.log("Error while getting coordinator:\n\n" + e + "\n\n")
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

            r = await this.contract.automatricula(name, dni, email, { from: account })

        } catch (e) {

            console.log("Error while self-registration: \n\n" + e + "\n\n")
            return false

        }

        return r.receipt.status ? true : false
    }


    async getEvaluations() {

        let evaluations = new Array();

        try {
            length = await this.contract.evaluacionesLength()
            for (let i = 0; i < length; i++) {
                let evaluation = await this.contract.evaluaciones(i)
                evaluations.push(evaluation)
            }

        } catch (e) {

            console.log("Error while getting evaluations:\n\n" + e + "\n\n")

            return null
        }
        return evaluations;
    }


    async setCalification(studentAddress, evaluationIndex, calificationType, calification) {

        var r = null

        var whoAmI = await this.whoAmI()
        if (whoAmI != "professor" && whoAmI != "coordinator") return false

        const accounts = await window.web3.eth.getAccounts()
        const account = accounts[0]

        try {

            r = await this.contract.califica(studentAddress, evaluationIndex, calificationType, calification, { from: account })

        } catch (e) {

            console.log("Error while setting calification: \n\n" + e + "\n\n")
            return false

        }

        return r.receipt.status ? true : false

    }

    async setEvaluation(name, date, percentage, minMark) {

        var r = null

        var whoAmI = await this.whoAmI()
        if (whoAmI != "coordinator") return false

        const accounts = await window.web3.eth.getAccounts()
        const account = accounts[0]

        date = parseInt(date,"10")
        percentage = parseInt(date,"10")
        minMark = parseInt (date, "10")

        try {

            r = await this.contract.creaEvaluacion(name, date, percentage, minMark, { from: account })

        } catch (e) {

            console.log("Error while setting new evaluation: \n\n" + e + "\n\n")
            return false

        }

        return r.receipt.status ? true : false

    }


    async setStudent(address, name, dni, email) {

        var r = null

        var whoAmI = await this.whoAmI()
        if (whoAmI != "owner") return false

        const accounts = await window.web3.eth.getAccounts()
        const account = accounts[0]

        try {

            r = await this.contract.matricular(address, name, dni, email, { from: account })

        } catch (e) {

            console.log("Error while setting new student: \n\n" + e + "\n\n")
            return false

        }

        return r.receipt.status ? true : false

    }



}

export default SubjectService