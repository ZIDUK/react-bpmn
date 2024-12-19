/*import { BpmnJs } from "./diagramviewer";
import "./styles.css";

export default function App() {
  return (
    <>
      <BpmnJs></BpmnJs>
    </>
  );
}
*/
import React from "react";
import { BpmnJs } from "./diagramviewer";

function App() {
  return (
    <div className="App">
      <h1>Visualizador BPMN</h1>
      <BpmnJs />
    </div>
  );
}

export default App;
