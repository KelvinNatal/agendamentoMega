import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClientePage from "./pages/ClientePage";

const Routte = () => {

    return(
      <>      
    <Router>
      <div className="d-flex">
      
      <Routes>
        <Route path="/" caseSensitive={false} element={<Login />} />        
        <Route path="/homepage" caseSensitive={false} element={<HomePage />} />
        <Route path="/addproduct" caseSensitive={false} element={<AddPage />} />
        <Route path="/addcliente" caseSensitive={false} element={<ClientePage />} />
        <Route path="/register" caseSensitive={false} element={<RegisterPage />} />
      </Routes>
      </div>
    </Router>
    
    </>
    );

};

export default Routte;