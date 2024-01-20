
import ProfesoresHead from "./ProfesoresHead.jsx";
import ProfesoresBody from "./ProfesoresBody.jsx";


const ProfesoresList = () => (
    <section className="AppProfesores">
        <h3>Todos los Profesores</h3>
        <table>
            <ProfesoresHead/>
            <ProfesoresBody/>
        </table>
    </section>
);

export default ProfesoresList;