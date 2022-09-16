import './styles.css';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoUsers from './user.jpg'

function Utilizadores() {

const baseURL ="https://localhost:7198/API/UtilizadoresAPI";

const [data, setData]=useState([]);
const [updateData, setUpdateData]=useState(true);
const [modalAdicionar, setModalAdicionar]=useState(false);
const [modalEditar, setModalEditar]=useState(false);
const [modalExcluir, setModalExcluir]=useState(false);
const [modalCriado, setModalCriado]=useState(false);
const [modalEditado, setModalEditado]=useState(false);

const [utilizadorSelecionado, setUtilizadorSelecionado] = useState(
  {
    id : '',
    nome: '',
    email: '',
    nif: '',
    morada: '',
    pais: '',
    codPostal: '',
    sexo: '',
    dataNasc: '',
    userF: '',
  }
)

const abrirFecharModalAdicionar=()=>{
  setModalAdicionar(!modalAdicionar);
}

const abrirFecharModalEditar=()=>{
  setModalEditar(!modalEditar);
}

const abrirFecharModalExcluir=()=>{
  setModalExcluir(!modalExcluir);
}

const abrirFecharModalCriado=()=>{
  setModalCriado(!modalCriado);
  document.body.style.overflow = "visible";
  document.body.style.paddingRight = "0px";
}

const abrirFecharModalEditado=()=>{
  setModalEditado(!modalEditado);
  document.body.style.overflow = "visible";
  document.body.style.paddingRight = "0px";
}

const handleChange = e=>{
  const {name, value} = e.target;
  setUtilizadorSelecionado({
    ...utilizadorSelecionado,[name]:value
  });
  console.log(utilizadorSelecionado);
}


const pedidoGet = async()=>{
  await axios.get(baseURL)
  .then(response =>{
    setData(response.data);
  }).catch(error =>{
    console.log(error);
  })

}

const selecionarUtilizador=(utilizador,opcao)=>{
  setUtilizadorSelecionado(utilizador);
    (opcao ==="Editar") ?
      abrirFecharModalEditar(): abrirFecharModalExcluir();
}

const pedidoPost = async () => {
  delete utilizadorSelecionado.id;
  axios.post(baseURL, utilizadorSelecionado)
  .then(response => {
    setData(data.concat(response.data));
    setUpdateData(true);
    abrirFecharModalAdicionar();
    abrirFecharModalCriado();
  }).catch(error => {
    console.log(error);
  })
}

const pedidoPut= async() => {
  await axios.put(baseURL + "/" + utilizadorSelecionado.id, utilizadorSelecionado)
  .then(response=>{
    var resposta = response.data;
    var dadosAuxiliar = data;
    console.log(utilizadorSelecionado.id)
    dadosAuxiliar.map((utilizador) => {
      if (utilizador.id === utilizadorSelecionado.id) {
        utilizador.nome = resposta.nome;
        utilizador.email = resposta.email;
        utilizador.nif = resposta.nif;
        utilizador.morada = resposta.morada;
        utilizador.pais = resposta.pais;
        utilizador.codPostal = resposta.codPostal;
        utilizador.sexo = resposta.sexo;
        utilizador.dataNasc = resposta.dataNasc;
        utilizador.userF = resposta.userF;
      }
    });
    setUpdateData(true);
    abrirFecharModalEditar();
    abrirFecharModalEditado();
  }).catch(error =>{
    console.log(error);
  })
}

const pedidoDelete=async()=>{
  await axios.delete(baseURL+"/"+ utilizadorSelecionado.id)
  .then(response=>{
    setData(data.filter(utilizador=>utilizador.id !== response.data));
    setUpdateData(true);
    abrirFecharModalExcluir();
  }).catch(error=>{
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
    <div className="utilizadores_container">
      <br/>
      <Link className='button' to="/">
        <button type='button' className='btn btn-outline-info btn-sm'>Voltar</button>
      </Link>
      <h3>Filmes</h3>
      <header className="App-header">
        <img src={logoUsers} alt="Logo"/>
        <button onClick={()=> abrirFecharModalAdicionar()} className='btn btn-success'>Adicionar um utilizador</button>
      </header>
      <table className='table table-dark table-striped mt-4'>
        <thead>
          <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Email</th>
          <th>NIF</th>
          <th>Morada</th>
          <th>País</th>
          <th>Código Postal</th>
          <th>Sexo</th>
          <th>Data de Nascimento</th>
          <th>Função</th>
          <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(utilizador=>(
            <tr key={utilizador.id}>
              <td>{utilizador.id}</td>
              <td>{utilizador.nome}</td>
              <td>{utilizador.email}</td>
              <td>{utilizador.nif}</td>
              <td>{utilizador.morada}</td>
              <td>{utilizador.pais}</td>
              <td>{utilizador.codPostal}</td>
              <td>{utilizador.sexo}</td>
              <td>{utilizador.dataNasc}</td>
              <td>{utilizador.userF}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>selecionarUtilizador(utilizador,"Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={()=>selecionarUtilizador(utilizador,"Excluir")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalAdicionar}>
      <ModalHeader>Adicionar utilizador</ModalHeader>
      <ModalBody>
      <div className="form-group">
            <label>Nome:</label>
            <br />
            <input type="text" className="form-control" name="nome" onChange={handleChange} />
            <br />
            <label>Email:</label>
            <br />
            <input type="text" className="form-control" name="email" onChange={handleChange} />
            <br />
            <label>NIF:</label>
            <br />
            <input type="text" className="form-control" name="nif" onChange={handleChange} />
            <br />
            <label>Morada:</label>
            <br />
            <input type="text" className="form-control" name="morada" onChange={handleChange} />
            <br />
            <label>País:</label>
            <br />
            <input type="text" className="form-control" name="pais" onChange={handleChange} />
            <br />
            <label>Código Postal:</label>
            <br />
            <input type="text" className="form-control" name="codPostal" onChange={handleChange} />
            <br />
            <label>Sexo:</label>
            <br />
            <input type="text" className="form-control" name="sexo" onChange={handleChange} />
            <br />
            <label>Data de Nascimento:</label>
            <br />
            <input type="date" className="form-control" name="dataNasc" onChange={handleChange} />
            <br />
            <label>Função:</label>
            <br />
            <input type="text" className="form-control" name="userF" onChange={handleChange} />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>pedidoPost()}>Adicionar</button> {"   "}
        <button className="btn btn-danger" onClick={()=>abrirFecharModalAdicionar()}>Cancelar</button>
      </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar utilizador</ModalHeader>
        <ModalBody>
        <div className="form-group">
          <label>Id:</label>
          <input type="text" className="form-control" readOnly value={utilizadorSelecionado && utilizadorSelecionado.id} />
          <br />
          <label>Nome:</label>
          <br />
          <input type="text" className="form-control" name="nome" onChange={handleChange}
              value={utilizadorSelecionado && utilizadorSelecionado.nome} />
          <br />
          <label>Email:</label>
          <br />
          <input type="text" className="form-control" name="email" onChange={handleChange}
              value={utilizadorSelecionado && utilizadorSelecionado.email} />
          <br />
          <label>NIF:</label>
          <br />
          <input type="text" className="form-control" name="nif" onChange={handleChange}
              value={utilizadorSelecionado && utilizadorSelecionado.nif} />
          <br />
          <label>Morada:</label>
          <br />
          <input type="text" className="form-control" name="morada" onChange={handleChange}
              value={utilizadorSelecionado && utilizadorSelecionado.morada} />
          <br />
          <label>País:</label>
          <br />
          <input type="text" className="form-control" name="pais" onChange={handleChange}
              value={utilizadorSelecionado && utilizadorSelecionado.pais} />
          <br />
          <label>Código Postal:</label>
          <br />
          <input type="text" className="form-control" name="codPostal" onChange={handleChange}
              value={utilizadorSelecionado && utilizadorSelecionado.codPostal} />
          <br />
          <label>Sexo:</label>
          <br />
          <input type="text" className="form-control" name="sexo" onChange={handleChange}
              value={utilizadorSelecionado && utilizadorSelecionado.sexo} />
          <br />
          <label>Data de Nascimento:</label>
          <br />
          <input type="date" className="form-control" name="dataNasc" onChange={handleChange}
              value={utilizadorSelecionado && utilizadorSelecionado.dataNasc} />
          <br />
          <label>Função:</label>
          <br />
          <input type="text" className="form-control" name="userF" onChange={handleChange}
              value={utilizadorSelecionado && utilizadorSelecionado.userF} />
      </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>pedidoPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão deste filme : {utilizadorSelecionado && utilizadorSelecionado.titulo} ? 
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={()=>pedidoDelete()}> Sim </button>
          <button className='btn btn-secondary' onClick={()=> abrirFecharModalExcluir()}> Não </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCriado}>
        <ModalHeader>Utilizador Adicionado</ModalHeader>
        <ModalBody>
          <div>O Utilizador que introduziu foi adicionado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalCriado()}></ModalFooter>
      </Modal>

      <Modal isOpen={modalEditado}>
        <ModalHeader>Utilizador Editado</ModalHeader>
        <ModalBody>
          <div>O Utilizador foi editado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalEditado()}>Fechar</ModalFooter>
      </Modal>

    </div>
  );
}

export default Utilizadores;
