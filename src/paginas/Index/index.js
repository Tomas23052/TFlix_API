import logo1 from './logo1.png';
import logo2 from './logo2.png';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import React from 'react';

function Index() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo1} className="App-logo" alt="logo" />
        <p>
          <img src={logo2} className="App-logo2" />
        </p>
        <Link className="button" to="Utilizadores">
          <button type="button" className="btn btn-outline-light btn-lg">Utilizadores</button>
        </Link>
        <p> </p>
        <Link className="button" to="Filmes">
          <button type="button" className="btn btn-outline-light btn-lg">Filmes</button>
        </Link>
        <p> </p>
        <Link className="button" to="Series">
          <button type="button" className="btn btn-outline-light btn-lg">Séries</button>
        </Link>
        <p></p>
        <Link className="button" to="Alugueres">
          <button type="button" className="btn btn-outline-light btn-lg">Aluguer</button>
        </Link>
        <p></p>
        <Link className="button" to="Subscricao">
          <button type="button" className="btn btn-outline-light btn-lg">Subscrição</button>
        </Link>
        <p></p>
        <Link className="button" to="Sobre">
          <button type="button" className="btn btn-info">Sobre</button>
        </Link>
      </header>

    </div>
  );
}

export default Index;