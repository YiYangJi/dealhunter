import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const ExampleComponent = () => (
  <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-right">Tooltip text</Tooltip>}>
    <button>Hover over me</button>
  </OverlayTrigger>
);

export default ExampleComponent;
