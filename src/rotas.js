import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./paginas/Index";
import Sobre from "./paginas/Sobre";
import Series from "./paginas/Series";
import Filmes from "./paginas/Filmes";
import Alugueres from "./paginas/Alugueres";
import Utilizadores from "./paginas/Utilizadores";



function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Index/>}/>
                <Route path="/Sobre" element={<Sobre/>}/>
                <Route path="/Filmes" element={<Filmes/>}/>
                <Route path="/Series" element={<Series/>}/>
                <Route path="/Alugueres" element={<Alugueres/>}/>
                <Route path="/Utilizadores" element={<Utilizadores/>}/>
                
                
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;