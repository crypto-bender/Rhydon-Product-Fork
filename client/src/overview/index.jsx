import React from "react";
import {createRoot} from "react-dom/client";
import Overview from "./Overview.jsx";

const container = document.createElement("div");
container.setAttribute("id", "root");
document.body.appendChild(container);
const root = createRoot(container);

root.render(<Overview />);