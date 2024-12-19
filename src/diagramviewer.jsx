/*import ReactBpmn from "react-bpmn";

export const BpmnJs = (props) => {
  const onShown = () => {
    console.log("diagram shown");
  };

  const onLoading = () => {
    console.log("diagram loading");
  };

  const onError = (err) => {
    console.log("failed to show diagram");
  };

  return (
    <ReactBpmn
      url="https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn"
      onShown={onShown}
      onLoading={onLoading}
      onError={onError}
    />
  );
};
*/

import React, { useEffect, useRef } from "react";
import Modeler from "bpmn-js/lib/Modeler";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import TokenSimulationModule from "bpmn-js-token-simulation";
import "bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css";

const diagram =
  "https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn";

export const BpmnJs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Crear el modelador BPMN
    const modeler = new Modeler({
      container: containerRef.current,
      additionalModules: [TokenSimulationModule],
      keyboard: {
        bindTo: window,
      },
    });

    // Cargar el diagrama BPMN
    fetch(diagram)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al cargar el diagrama: ${response.statusText}`
          );
        }
        return response.text();
      })
      .then((bpmnXML) => {
        modeler
          .importXML(bpmnXML)
          .then(() => console.log("Diagrama cargado"))
          .catch((err) => console.error("Error al importar el BPMN", err));
      })
      .catch((err) => console.error("Error al realizar la solicitud", err));

    return () => {
      // Limpiar el modelador al desmontar el componente
      modeler.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
};
