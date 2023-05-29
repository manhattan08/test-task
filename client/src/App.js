import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes,BrowserRouter} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Registration from "./pages/Registration";
import {AuthProvider} from "./utils/AuthContext";
import Login from "./pages/Login";
import FavPokemons from "./pages/FavPokemons";


function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:name" element={<Details />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favpokemons" element={<FavPokemons />} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
