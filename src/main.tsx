import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import ReactModal from "react-modal";

const ROOT = document.getElementById("root") as HTMLHtmlElement;

ReactModal.setAppElement(ROOT);
const root = ReactDOM.createRoot(ROOT);

const ConnectedApp: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

root.render(
  <React.StrictMode>
    <ConnectedApp>
      <App />
    </ConnectedApp>
  </React.StrictMode>
);
