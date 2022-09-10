import React, { Suspense } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./paginas/Index";


import Filmes from "./paginas/Filmes";




function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Index/>}/>
               
                
                <Route path="/Filmes" element={<Filmes/>}/>
                
                
                
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;