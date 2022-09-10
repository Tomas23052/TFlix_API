import './App.css';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoFilmes from './assets/iconFilmes.png'

function App() {

const baseURL ="https://localhost:7198/API/FilmesAPI";

const [data, setData]=useState([]);
const [updateData, setUpdateData]=useState(true);
const [modalAdicionar, setModalAdicionar]=useState(false);
const [modalCriado, setModalCriado]=useState(false);

const [filmeSelecionado, setFilmeSelecionado] = useState(
  {
    id : '',
    titulo: '',
    imagem: null,
    sinopse: '',
    dataLancamento: '',
    classicacao: '',
    elenco: '',
    genero: '',
  }
)

const abrirFecharModalAdicionar=()=>{
  setModalAdicionar(!modalAdicionar);
}

const abrirFecharModalCriado=()=>{
  setModalCriado(!modalCriado);
}

const handleChange = e=>{
  const {name, value} = e.target;
  setFilmeSelecionado({
    ...filmeSelecionado,[name]:value
  });
  console.log(filmeSelecionado);
}

const pedidoGet = async()=>{
  await axios.get(baseURL)
  .then(response =>{
    setData(response.data);
  }).catch(error =>{
    console.log(error);
  })

}

const pedidoPost = async () => {
  delete filmeSelecionado.id;
  const formData = new FormData();
  formData.append("titulo", filmeSelecionado.titulo)
  formData.append("imagem", filmeSelecionado.imagem)
  formData.append("sinopse", filmeSelecionado.sinopse)
  formData.append("dataLancamento", filmeSelecionado.dataLancamento)
  formData.append("classificacao", filmeSelecionado.classificacao)
  formData.append("elenco", filmeSelecionado.elenco)
  formData.append("genero", filmeSelecionado.genero)
  axios.post(baseURL, formData)
  .then(response => {
    setData(data.concat(response.data));
    setUpdateData(true);
    abrirFecharModalAdicionar();
    abrirFecharModalCriado();
  }).catch(error => {
    console.log(error);
  })
}

useEffect(()=>{
  if(updateData){
    pedidoGet();
    setUpdateData(false);
  }
  
}, [updateData])

  return (
    <div className="filmes_container">
      <br/>
      <h3>Filmes</h3>
      <header className="App-header">
        <img src={logoFilmes} alt="Logo"/>
        <button onClick={()=> abrirFecharModalAdicionar()} className='btn btn-success'>Adicionar um Filme</button>
      </header>
      <table className='table table-dark table-striped mt-4'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Imagem</th>
            <th>Sinopse</th>
            <th>Data de Lançamento</th>
            <th>Classificação</th>
            <th>Elenco</th>
            <th>Género</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(filme=>(
            <tr key={filme.id}>
              <td>{filme.id}</td>
              <td>{filme.titulo}</td>
              <td>{filme.imagem}</td>
              <td>{filme.sinopse}</td>
              <td>{filme.dataLancamento}</td>
              <td>{filme.classicacao}</td>
              <td>{filme.elenco}</td>
              <td>{filme.genero}</td>
              <td>
                <button className="btn btn-primary">Editar</button> {"  "}
                <button className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalAdicionar}>
      <ModalHeader>Adicionar Filme</ModalHeader>
      <ModalBody>
       <div className='form-group'>
          <label>Título:</label>
          <br />
          <input type="text" className='form-control' name="titulo" onChange={handleChange}/>
          <label>Imagem:</label>
          <br />
          <input type="file" className='form-control' name="imagem" accept=".jpg,.png,.jpeg" onChange={handleChange}/>
          <label>Sinopse:</label>
          <br />
          <input type="text" className='form-control' name="sinopse" onChange={handleChange}/>
          <label>Data de Lançamento:</label>
          <br />
          <input type="date" className='form-control' name="dataLancamento" onChange={handleChange}/>
          <label>Classificação:</label>
          <br />
          <input type="number" className='form-control' name="classificacao" onChange={handleChange}/>
          <label>Elenco:</label>
          <br />
          <input type="text" className='form-control' name="elenco" onChange={handleChange}/>
          <label>Género:</label>
          <br />
          <input type="text" className='form-control' name="genero" onChange={handleChange}/>
          <br />
       </div> 
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>pedidoPost()}>Adicionar</button> {"   "}~
        <button className="btn btn-danger" onClick={()=>abrirFecharModalAdicionar()}>Cancelar</button>
      </ModalFooter>
      </Modal>

      <Modal isOpen={modalCriado}>
        <ModalHeader>Filme Adicionado</ModalHeader>
        <ModalBody>
          <div>O filme que introduziu foi adicionado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalCriado}></ModalFooter>
      </Modal>


    </div>
  );
}

export default App;
