import './styles.css';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoSubs from './iconSubs.png'

function Subscricao() {

const baseURL ="https://localhost:7198/API/SubscricaoesAPI";
const baseURL1 ="https://localhost:7198/API/UtilizadoresAPI";
const baseURL2 ="https://localhost:7198/API/FilmesAPI";
const baseURL3 ="https://localhost:7198/API/SeriesAPI";

const [data, setData]=useState([]);
const [data1, setData1]=useState([]);
const [data2, setData2]=useState([]);
const [data3, setData3]=useState([]);
const [updateData, setUpdateData]=useState(true);
const [updateData1, setUpdateData1]=useState(true);
const [updateData2, setUpdateData2]=useState(true);
const [updateData3, setUpdateData3]=useState(true);
const [modalAdicionar, setModalAdicionar]=useState(false);
const [modalEditar, setModalEditar]=useState(false);
const [modalExcluir, setModalExcluir]=useState(false);
const [modalCriado, setModalCriado]=useState(false);
const [modalEditado, setModalEditado]=useState(false);

const [subscricaoSelecionada, setSubscricaoSelecionada] = useState(
  {
    id: '',
    utilizador: '',
    duracao: null,
    preco: null,
    auxPreco: null,
    dataInicio: null,
    dataFim: null,
    filmes: '',
    series: '',
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
}

const abrirFecharModalEditado=()=>{
  setModalEditado(!modalEditado)
}

const handleUtilizadorChange = (e) => {
  setSubscricaoSelecionada({
      ...subscricaoSelecionada, utilizador: e.target.value
  });
  console.log(subscricaoSelecionada);
}

const handleFilmeChange = (e) => {
  setSubscricaoSelecionada({
      ...subscricaoSelecionada, filmes: e.target.value
  });
  console.log(subscricaoSelecionada);
}

const handleSerieChange = (e) => {
  setSubscricaoSelecionada({
      ...subscricaoSelecionada, series: e.target.value
  });
  console.log(subscricaoSelecionada);
}

const handleAuxPrecoChange = (e) => {
  setSubscricaoSelecionada({
      ...subscricaoSelecionada, auxPreco: e.target.value
  });
  console.log(subscricaoSelecionada);
}



const pedidoGet = async () => {
  await axios.get(baseURL)
      .then(response => {
          setData(response.data);
          console.log(response.data)
      }).catch(error => {
          console.log(error);
      })
}

const pedidoGet1 = async () => {
  await axios.get(baseURL1)
      .then(response => {
          setData1(response.data);
      }).catch(error => {
          console.log(error);
      })
}


const pedidoGet2 = async () => {
  await axios.get(baseURL2)
      .then(response => {
          setData2(response.data);
      }).catch(error => {
          console.log(error);
      })
}

const pedidoGet3 = async () => {
  await axios.get(baseURL3)
      .then(response => {
          setData3(response.data);
      }).catch(error => {
          console.log(error);
      })
}

const selecionarSubscricao = (subscricao, opcao) => {
  setSubscricaoSelecionada(subscricao);
  (opcao === "Editar") ?
      abrirFecharModalEditar() : abrirFecharModalExcluir();
}

const pedidoPost = async () => {
  delete subscricaoSelecionada.id;
  const formData = new FormData();
  formData.append("nomeUtilizador", subscricaoSelecionada.nomeUtilizador)
  formData.append("nomeFilme", subscricaoSelecionada.nomeFilme)
  formData.append("preco", subscricaoSelecionada.preco)
  formData.append("auxPreco", subscricaoSelecionada.auxPreco)
  formData.append("dataInicio", subscricaoSelecionada.dataInicio)
  formData.append("dataFim", subscricaoSelecionada.dataFim)
  axios.post(baseURL, formData, {
      headers: {
          'Content-Type': 'text/plain'
      }
  }).then(response => {
      setData(data.concat(response.data));
      setUpdateData(true);
      abrirFecharModalAdicionar();
      abrirFecharModalCriado();
  }).catch(error => {
      console.log(error);
  })
}

const pedidoPut= async() => {
  await axios.put(baseURL + "/" + subscricaoSelecionada.id, subscricaoSelecionada)
  .then(response=>{
    var resposta = response.data;
    var dadosAuxiliar = data;
    console.log(subscricaoSelecionada.id)
    dadosAuxiliar.map((subscricao) => {
      if (subscricao.id === subscricaoSelecionada.id) {
        subscricao.nomeUtilizador = resposta.nomeUtilizador;
        subscricao.nomeFilme = resposta.nomeFilme;
        subscricao.preco = resposta.preco;
        subscricao.dataInicio = resposta.dataInicio;
        subscricao.dataFim = resposta.dataFim;
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
  await axios.delete(baseURL+"/"+ subscricaoSelecionada.id)
  .then(response=>{
    setData(data.filter(subscricao=>subscricao.id !== response.data));
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

useEffect(()=>{
  if(updateData1){
    pedidoGet1();
    setUpdateData1(false);
  }
  
}, [updateData1])

useEffect(()=>{
  if(updateData2){
    pedidoGet2();
    setUpdateData2(false);
  }
  
}, [updateData2])

useEffect(()=>{
  if(updateData3){
    pedidoGet3();
    setUpdateData3(false);
  }
  
}, [updateData3])

  return (
    <div className="subscricoes_container">
      <br/>
      <h3>Filmes</h3>
      <Link className="button" to="/">
          <button type="button" className="btn btn-outline-info btn-sm">Voltar</button>
      </Link>
      <header className="App-header">
        <img src={logoSubs} alt="Logo"/>
        <button onClick={()=> abrirFecharModalAdicionar()} className='btn btn-success'>Adicionar uma Subscrição</button>
      </header>
      <table className='table table-dark table-striped mt-4'>
        <thead>
          <tr>
           <th>Id</th>
           <th>Utilizador</th>(
           <th>Duração</th>
           <th>Preço</th>
           <th>Data de Início</th>
           <th>Data de Fim</th>
           <th>Filmes</th>
           <th>Séries</th>
           <th>Operação</th>
          </tr>
        </thead>
        <tbody>
        {data.map((subscricao, i) => (
            <tr key={subscricao}>
                <td>{subscricao.id}</td>
                <td>{subscricao.utilizador.nome}</td>
                <td>{subscricao.duracao}</td>
                <td>{subscricao.preco}</td>
                <td>{subscricao.dataInicio}</td>
                <td>{subscricao.dataFim}</td>
                <td>{subscricao.filmes[i].titulo}</td>
                <td>{subscricao.series[i].titulo}<br />
                    {subscricao.series[i + 1].titulo}
                </td>
                <td>
                    <button className="btn btn-primary" onClick={() => selecionarSubscricao(subscricao, "Editar")}></button> {"   "}
                    <button className="btn btn-danger" onClick={() => selecionarSubscricao(subscricao, "Excluir")}></button>
                </td>
            </tr>
        ))}
        </tbody>
      </table>
      <Modal isOpen={modalAdicionar}>
      <ModalHeader>Adicionar Subscrição</ModalHeader>
      <ModalBody>
      <div className="form-group">
          <label>Utilizador:</label>
          <br />
          <select className="form-select" onChange={handleUtilizadorChange}>
              <option value="">Escolha um utilizador</option>
              {data1.map(utilizador => (
                  <option key={utilizador.id} value={utilizador.id}>{utilizador.nome}</option>
              ))}
          </select>
          <br />
          <label>Filme:</label>
          <select className="form-select" onChange={handleFilmeChange}>
              <option value="">Escolha um flme</option>
              {data2.map(filme => (
                  <option key={filme.id} value={filme.id} >{filme.titulo}</option>
              ))}
          </select>
          <br />
          <label>Série:</label>
          <select className="form-select" onChange={handleSerieChange}>
              <option value="">Escolha uma série</option>
              {data3.map(serie => (
                  <option key={serie.id} value={serie.id} >{serie.titulo}</option>
              ))}
          </select>
          <br />
          <label>Preço:</label>
          <br />
          <select className="form-control" onChange={handleAuxPrecoChange}>
              <option value="">Escolha uma opção</option>
              <option value="10.99">10,99 por 1 mês</option>
              <option value="39.99">39,99 por 6 meses</option>
              <option value="69.99">69,99 por 12 meses</option>
          </select>
      </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>pedidoPost()}>Adicionar</button> {"   "}
        <button className="btn btn-danger" onClick={()=>abrirFecharModalAdicionar()}>Cancelar</button>
      </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Subscrição</ModalHeader>
        <ModalBody>
        <div className="form-group">
          <label>Utilizador:</label>
          <br />
          <select className="form-select" onChange={handleUtilizadorChange}>
              <option value="">Escolha um utilizador</option>
              {data1.map(utilizador => (
                  <option key={utilizador.id} value={utilizador.id}>{utilizador.nome}</option>
              ))}
          </select>
          <br />
          <label>Filme:</label>
          <select className="form-select" onChange={handleFilmeChange}>
              <option value="">Escolha um flme</option>
              {data2.map(filme => (
                  <option key={filme.id} value={filme.id} >{filme.titulo}</option>
              ))}
          </select>
          <br />
          <label>Série:</label>
          <select className="form-select" onChange={handleSerieChange}>
              <option value="">Escolha uma série</option>
              {data3.map(serie => (
                  <option key={serie.id} value={serie.id} >{serie.titulo}</option>
              ))}
          </select>
          <br />
          <label>Preço:</label>
          <br />
          <select className="form-control" onChange={handleAuxPrecoChange}>
              <option value="">Escolha uma opção</option>
              <option value="10.99">10,99 por 1 mês</option>
              <option value="39.99">39,99 por 6 meses</option>
              <option value="69.99">69,99 por 12 meses</option>
          </select>
      </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>pedidoPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão desta Subscrição : {subscricaoSelecionada && subscricaoSelecionada.id} ? 
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={()=>pedidoDelete()}> Sim </button>
          <button className='btn btn-secondary' onClick={()=> abrirFecharModalExcluir()}> Não </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCriado}>
        <ModalHeader>Subscrição Adicionada</ModalHeader>
        <ModalBody>
          <div>A Subscrição que introduziu foi adicionada com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalCriado()}></ModalFooter>
      </Modal>

      <Modal isOpen={modalEditado}>
        <ModalHeader>Subscrição Editada</ModalHeader>
        <ModalBody>
          <div>A Subscrição foi editado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalEditado()}></ModalFooter>
      </Modal>

    </div>
  );
}

export default Subscricao;
