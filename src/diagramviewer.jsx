import React, { useEffect, useRef } from "react";
import Modeler from "bpmn-js/lib/Modeler";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import TokenSimulationModule from "bpmn-js-token-simulation";
import "bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css";

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";

import BpmnColorPickerModule from "bpmn-js-color-picker";
import "bpmn-js-color-picker/colors/color-picker.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import "./styles.css";

const diagram =
  "https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn";

export const BpmnJs = () => {
  const containerRef = useRef(null);
  const propertiesPanelRef = useRef(null);

  useEffect(() => {
    // Crear el modelador BPMN
    const modeler = new Modeler({
      container: containerRef.current,
      propertiesPanel: {
        parent: propertiesPanelRef.current, // Donde se renderiza el panel de propiedades
      },
      additionalModules: [
        TokenSimulationModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        BpmnColorPickerModule,
      ],
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

  return (
    <div style={{ display: "flex", height: "500px" }}>
      {/* Contenedor del canvas */}
      <div ref={containerRef} className="diagram-container" />
      {/* Contenedor del panel de propiedades 
      <div ref={propertiesPanelRef} className="properties-panel" />*/}
    </div>
  );
};
