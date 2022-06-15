import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const Routte = () => {

    return(
    <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={<HomePage />} />
        <Route path="/addproduct" caseSensitive={false} element={<AddPage />} />
      </Routes>
    </Router>
    );

};

export default Routte;