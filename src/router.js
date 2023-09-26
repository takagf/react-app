import Home from "./pages/home";
import Login from "./pages/login";
import Cliente from "./pages/clientePage";
import Produto from "./pages/produtoPage";

import Menu from "./components/menu";

import { BrowserRouter, Routes, Route } from "react-router-dom"

function Router(){
    return(
        <BrowserRouter>

            <Menu/>
            
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/clientes" element={<Cliente/>}/>
                <Route path="/produtos" element={<Produto/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;