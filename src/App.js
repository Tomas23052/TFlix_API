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
const [modalEditar, setModalEditar]=useState(false);
const [modalExcluir, setModalExcluir]=useState(false);
const [modalCriado, setModalCriado]=useState(false);
const [modalEditado, setModalEditado]=useState(false);

const [filmeSelecionado, setFilmeSelecionado] = useState(
  {
    id : '',
    titulo: '',
    imagem: null,
    sinopse: '',
    dataLancamento: '',
    classificacao: '',
    elenco: '',
    genero: '',
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

const handleChange = e=>{
  const {name, value} = e.target;
  setFilmeSelecionado({
    ...filmeSelecionado,[name]:value
  });
  console.log(filmeSelecionado);
}

const handleImagemChange = (e) => {
  setFilmeSelecionado({
    ...filmeSelecionado, imagem: e.target.files[0]
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

const selecionarFilme=(filme,opcao)=>{
  setFilmeSelecionado(filme);
    (opcao ==="Editar") ?
      abrirFecharModalEditar(): abrirFecharModalExcluir();
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

const pedidoPut= async() => {
  await axios.put(baseURL + "/" + filmeSelecionado.id, filmeSelecionado)
  .then(response=>{
    var resposta = response.data;
    var dadosAuxiliar = data;
    console.log(filmeSelecionado.id)
    dadosAuxiliar.map((filme) => {
      if (filme.id === filmeSelecionado.id) {
        filme.titulo = resposta.titulo;
        filme.imagem = resposta.imagem;
        filme.sinopse = resposta.sinopse;
        filme.dataLancamento = resposta.dataLancamento;
        filme.classificacao = resposta.classificacao;
        filme.elenco = resposta.elenco;
        filme.genero = resposta.genero;
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
  await axios.delete(baseURL+"/"+filmeSelecionado.id)
  .then(response=>{
    setData(data.filter(filme=>filme.id !== response.data));
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
              <td><img src={'https://localhost:7198/Fotos/Filmes/' + filme.imagem}
                alt={'Imagem de ' + filme.titulo}
                title={filme.titulo}
                height="100"/>
                </td>
              <td className="sinopse">{filme.sinopse}</td>
              <td>{filme.dataLancamento}</td>
              <td>{filme.classificacao}</td>
              <td>{filme.elenco}</td>
              <td>{filme.genero}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>selecionarFilme(filme,"Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={()=>selecionarFilme(filme,"Excluir")}>Excluir</button>
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
          <input type="file" className='form-control' name="imagem" accept=".jpg,.png,.jpeg" onChange={handleImagemChange}/>
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
        <button className="btn btn-primary" onClick={()=>pedidoPost()}>Adicionar</button> {"   "}
        <button className="btn btn-danger" onClick={()=>abrirFecharModalAdicionar()}>Cancelar</button>
      </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Filme</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label>ID:</label> <br />
          <input type="text" className="form-control" readOnly value={filmeSelecionado && filmeSelecionado.id}/><br />
          <label>Título:</label>
          <br />
          <input type="text" className='form-control' name="titulo" onChange={handleChange}
            value={filmeSelecionado && filmeSelecionado.titulo}/>
          <label>Imagem:</label>
          <br />
          <input type="file" className='form-control' name="imagem" accept=".jpg,.png,.jpeg" onChange={handleImagemChange}/>
          <label>Sinopse:</label>
          <br />
          <input type="text" className='form-control' name="sinopse" onChange={handleChange}
            value={filmeSelecionado && filmeSelecionado.sinopse}/>
          <label>Data de Lançamento:</label>
          <br />
          <input type="date" className='form-control' name="dataLancamento" onChange={handleChange}
            value={filmeSelecionado && filmeSelecionado.dataLancamento}/>
          <label>Classificação:</label>
          <br />
          <input type="number" className='form-control' name="classificacao" onChange={handleChange}
            value={filmeSelecionado && filmeSelecionado.classificacao}/>
          <label>Elenco:</label>
          <br />
          <input type="text" className='form-control' name="elenco" onChange={handleChange}
            value={filmeSelecionado && filmeSelecionado.elenco}/>
          <label>Género:</label>
          <br />
          <input type="text" className='form-control' name="genero" onChange={handleChange}
            value={filmeSelecionado && filmeSelecionado.genero}/>
          <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>pedidoPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão deste filme : {filmeSelecionado && filmeSelecionado.titulo} ? 
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={()=>pedidoDelete()}> Sim </button>
          <button className='btn btn-secondary' onClick={()=> abrirFecharModalExcluir()}> Não </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCriado}>
        <ModalHeader>Filme Adicionado</ModalHeader>
        <ModalBody>
          <div>O filme que introduziu foi adicionado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalCriado()}></ModalFooter>
      </Modal>

      <Modal isOpen={modalEditado}>
        <ModalHeader>Filme Editado</ModalHeader>
        <ModalBody>
          <div>O filme foi editado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalEditado()}></ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
