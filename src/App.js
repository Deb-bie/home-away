import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AuthProvider from './context/Context';
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import Admin from "./pages/admin/Admin.jsx";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/hotels" element={<List/>}/> */}
          {/* <Route path="/hotels/:id" element={<Hotel/>}/> */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
