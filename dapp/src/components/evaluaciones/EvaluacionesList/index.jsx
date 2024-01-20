import EvaluacionesHead from "./EvaluacionesHead.jsx";
import EvaluacionesBody from "./EvaluacionesBody.jsx";
import EvaluacionesAdd from "./EvaluacionAdd.jsx";

const EvaluacionesList = () => (
    <section className="AppEvaluaciones">
        <h3>Todas las Evaluaciones</h3>

        <table>
            <EvaluacionesHead/>
            <EvaluacionesBody/>
        </table>
        <EvaluacionesAdd/>
    </section>
);

export default EvaluacionesList;
