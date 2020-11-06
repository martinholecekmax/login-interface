import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AuthManager from "./context/authManager";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthManager />
      </BrowserRouter>
    </div>
  );
};

export default App;
