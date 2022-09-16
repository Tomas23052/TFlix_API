import logo1 from './logo1.png';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import React from 'react';

function Sobre() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo1} className="App-logo" alt="logo" />
                <div className="descricao">
                    <br />
                    <p>Trabalho Final da unidade curricular de Desenvolvimento Web. TFlix é uma aplicação que disponibiliza uma vasta gama de filmes que posteriormente podem ser alugados pelos utilizadores interessados, ficando disponíveis por um determinado tempo.</p>
                    <a href="https://github.com/ferndiogo/TFlix_DW">GitHub MCV</a>
                    <br />
                    <a href="https://github.com/Tomas23052/TFlix_API">GitHub API</a>
                </div>
                <p></p>
                <Link className="button" to="/">
                    <button type="button" className="btn btn-outline-info btn-sm">Voltar</button>
                </Link>
            </header>
        </div>
    );
}

export default Sobre;
