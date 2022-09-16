import './styles.css';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoSeries from './iconSeries.png'

function Series() {

const baseURL ="https://localhost:7198/API/SeriesAPI";

const [data, setData]=useState([]);
const [updateData, setUpdateData]=useState(true);
const [modalAdicionar, setModalAdicionar]=useState(false);
const [modalEditar, setModalEditar]=useState(false);
const [modalExcluir, setModalExcluir]=useState(false);
const [modalCriado, setModalCriado]=useState(false);
const [modalEditado, setModalEditado]=useState(false);

const [serieSelecionada, setSerieSelecionada] = useState(
  {
    id : '',
    nome : '',
    titulo: '',
    imagem: null,
    sinopse: '',
    dataLancamento: '',
    classificacao: '',
    elenco: '',
    genero: '',
    temporada: '',
    episodio: '',
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
  setSerieSelecionada({
    ...serieSelecionada,[name]:value
  });
  console.log(serieSelecionada);
}

const handleImagemChange = (e) => {
  setSerieSelecionada({
    ...serieSelecionada, imagem: e.target.files[0]
  });
  console.log(serieSelecionada);
}

const pedidoGet = async()=>{
  await axios.get(baseURL)
  .then(response =>{
    setData(response.data);
  }).catch(error =>{
    console.log(error);
  })

}

const selecionarSerie=(serie,opcao)=>{
  setSerieSelecionada(serie);
    (opcao ==="Editar") ?
      abrirFecharModalEditar(): abrirFecharModalExcluir();
}

const pedidoPost = async () => {
  delete serieSelecionada.id;
  const formData = new FormData();
  formData.append("titulo", serieSelecionada.titulo)
  formData.append("imagem", serieSelecionada.imagem)
  formData.append("sinopse", serieSelecionada.sinopse)
  formData.append("dataLancamento", serieSelecionada.dataLancamento)
  formData.append("classificacao", serieSelecionada.classificacao)
  formData.append("elenco", serieSelecionada.elenco)
  formData.append("genero", serieSelecionada.genero)
  formData.append("temporada", serieSelecionada.temporada)
  formData.append("episodio", serieSelecionada.episodio)
  axios.post(baseURL, formData, {
    headers: {
      'Content-Type' : 'multipart/form-data'
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
  await axios.put(baseURL + "/" + serieSelecionada.id, serieSelecionada)
  .then(response=>{
    var resposta = response.data;
    var dadosAuxiliar = data;
    console.log(serieSelecionada.id)
    dadosAuxiliar.map((serie) => {
      if (serie.id === serieSelecionada.id) {
        serie.titulo = resposta.titulo;
        serie.imagem = resposta.imagem;
        serie.sinopse = resposta.sinopse;
        serie.dataLancamento = resposta.dataLancamento;
        serie.classificacao = resposta.classificacao;
        serie.elenco = resposta.elenco;
        serie.genero = resposta.genero;
        serie.temporada = resposta.temporada;
        serie.episodio = resposta.episodio;
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
  await axios.delete(baseURL+"/"+serieSelecionada.id)
  .then(response=>{
    setData(data.filter(serie=>serie.id !== response.data));
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
    <div className="series_container">
      <br/>
      <Link className='button' to="/">
        <button type="button" className='btn btn-outline-info btn-sm'>Voltar</button>
      </Link>
      <h3>Series</h3>
      <header className="App-header">
        <img src={logoSeries} alt="Logo"/>
        <button onClick={()=> abrirFecharModalAdicionar()} className='btn btn-success'>Adicionar uma Série</button>
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
            <th>Nº Temporadas</th>
            <th>Nº Episódios</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(serie=>(
            <tr key={serie.id}>
              <td>{serie.id}</td>
              <td>{serie.titulo}</td>
              <td><img src={'https://localhost:7198/Fotos/Series/' + serie.imagem}
                alt={'Imagem de ' + serie.titulo}
                title={serie.titulo}
                height="100"/>
                </td>
              <td className="sinopse">{serie.sinopse}</td>
              <td>{serie.dataLancamento}</td>
              <td>{serie.classificacao}</td>
              <td>{serie.elenco}</td>
              <td>{serie.genero}</td>
              <td>{serie.temporada}</td>
              <td>{serie.episodio}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>selecionarSerie(serie,"Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={()=>selecionarSerie(serie,"Excluir")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalAdicionar}>
      <ModalHeader>Adicionar Série</ModalHeader>
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
          <label>Nº Temporadas:</label>
          <br />
          <input type="number" className='form-control' name="temporada" onChange={handleChange}/>
          <label>Nº Episódios:</label>
          <br />
          <input type="number" className='form-control' name="episodio" onChange={handleChange}/>
       </div> 
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>pedidoPost()}>Adicionar</button> {"   "}
        <button className="btn btn-danger" onClick={()=>abrirFecharModalAdicionar()}>Cancelar</button>
      </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Série</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label>ID:</label> <br />
          <input type="text" className="form-control" readOnly value={serieSelecionada && serieSelecionada.id}/><br />
          <label>Título:</label>
          <br />
          <input type="text" className='form-control' name="titulo" onChange={handleChange}
            value={serieSelecionada && serieSelecionada.titulo}/>
          <label>Imagem:</label>
          <br />
          <input type="file" className='form-control' name="imagem" accept=".jpg,.png,.jpeg" onChange={handleImagemChange}/>
          <label>Sinopse:</label>
          <br />
          <input type="text" className='form-control' name="sinopse" onChange={handleChange}
            value={serieSelecionada && serieSelecionada.sinopse}/>
          <label>Data de Lançamento:</label>
          <br />
          <input type="date" className='form-control' name="dataLancamento" onChange={handleChange}
            value={serieSelecionada && serieSelecionada.dataLancamento}/>
          <label>Classificação:</label>
          <br />
          <input type="number" className='form-control' name="classificacao" onChange={handleChange}
            value={serieSelecionada && serieSelecionada.classificacao}/>
          <label>Elenco:</label>
          <br />
          <input type="text" className='form-control' name="elenco" onChange={handleChange}
            value={serieSelecionada && serieSelecionada.elenco}/>
          <label>Género:</label>
          <br />
          <input type="text" className='form-control' name="genero" onChange={handleChange}
            value={serieSelecionada && serieSelecionada.genero}/>
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
          Confirma a exclusão deste Série : {serieSelecionada && serieSelecionada.titulo} ? 
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={()=>pedidoDelete()}> Sim </button>
          <button className='btn btn-secondary' onClick={()=> abrirFecharModalExcluir()}> Não </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCriado}>
        <ModalHeader>Série Adicionada</ModalHeader>
        <ModalBody>
          <div>A série que introduziu foi adicionado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalCriado()}></ModalFooter>
      </Modal>

      <Modal isOpen={modalEditado}>
        <ModalHeader>Série Editada</ModalHeader>
        <ModalBody>
          <div>A série foi editado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalEditado()}></ModalFooter>
      </Modal>

    </div>
  );
}

export default Series;
