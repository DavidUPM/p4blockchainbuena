import isEqual from 'lodash/isEqual';
import {useState, useEffect, useContext} from "react";

import {StateContext} from "../../StateContext.mjs";

import {Link} from "react-router-dom";

import SubjectService from "../../../js/SubjectService";


const ProfesoresRow = ({index}) => {

    const {asignatura} = useContext(StateContext);

    const [Profesores, setProfesores] = useState([]);

    useEffect(() => {
        (async () => {
            try {
            
                console.log("Obtener datos del profesor.");
                const profesores = await new SubjectService(asignatura).getProfessorInfo();
                console.log("profesores:", profesores);
                if (!isEqual(profesores, Profesores)) {
                    setProfesores(profesores);
                    console.log("estoy dentro:");
                }
        
            } catch (e) {
                console.log(e);
            }
        })();
    });   // [] -> Sin dependencias. Solo se llama a useEffect una vez.

    useEffect(() => {
        console.log("profesores 2:", Profesores);
      });
      
    return (  
        Profesores?.map((profesor, mapIndex) => (
        <tr key={"Profesor-" + mapIndex}>
          <th>P<sub>{index}</sub></th>
          <td>{profesor}</td>
        </tr>
      ))
    );
};

export default ProfesoresRow;
