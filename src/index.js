import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import DataContext, { DataContextProvider } from "./context/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </AuthContextProvider>
);
