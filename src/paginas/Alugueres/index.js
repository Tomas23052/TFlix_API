import React, { useState, useEffect } from 'react';
import './styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import iconAluga from './iconAluga.png';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



function Alugueres() {

    const [data1, setData1] = useState([]);

    const baseURL1 = "https://localhost:7198/API/UtilizadoresAPI";

    const [updateData1, setUpdateData1] = useState(true);

    const [data2, setData2] = useState([]);

    const baseURL2 = "https://localhost:7198/API/FilmesAPI";

    const [updateData2, setUpdateData2] = useState(true);

    const baseURL = "https://localhost:7198/API/AluguersAPI";

    const [data, setData] = useState([]);

    const [updateData, setUpdateData] = useState(true);

    const [modalAdicionar, setModalAdicionar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalApagar, setModalApagar] = useState(false);

    const [modalCriado, setModalCriado] = useState(false);

    const [modalEditado, setModalEditado] = useState(false);

    const [aluguerSelecionado, setAluguerSelecionado] = useState(
        {
            id: '',
            nomeUtilizador: '',
            nomeFilme: '',
            preco: null,
            dataInicio: null,
            dataFim: null,
        }
    )

    const selecionarAluguer = (aluguer, opcao) => {
        setAluguerSelecionado(aluguer);
        (opcao === "Editar") ?
            abrirFecharModalEditar() : abrirFecharModalApagar();
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setAluguerSelecionado({
            ...aluguerSelecionado, [name]: value
        });
        console.log(aluguerSelecionado);
    }

    const abrirFecharModalAdicionar = () => {
        setModalAdicionar(!modalAdicionar);
    }

    const abrirFecharModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirFecharModalApagar = () => {
        setModalApagar(!modalApagar);
    }

    const abrirFecharModalCriado = () => {
        setModalCriado(!modalCriado);
        document.body.style.overflow = "visible";
        document.body.style.paddingRight = "0px";
    }

    const abrirFecharModalEditado = () => {
        setModalEditado(!modalEditado);
        document.body.style.overflow = "visible";
        document.body.style.paddingRight = "0px";
    }

    const handlePrecoChange = (e) => {
        setAluguerSelecionado({
            ...aluguerSelecionado, preco: e.target.value
        });
        console.log(aluguerSelecionado);
    }

    const handleUtilizadorChange = (e) => {
        setAluguerSelecionado({
            ...aluguerSelecionado, nomeUtilizador: e.target.value
        });
        console.log(aluguerSelecionado);
    }

    const handleFilmeChange = (e) => {
        setAluguerSelecionado({
            ...aluguerSelecionado, nomeFilme: e.target.value
        });
        console.log(aluguerSelecionado);
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
    const pedidoPost = async () => {
        delete aluguerSelecionado.id;
        const formData = new FormData();
        formData.append("nomeUtilizador", aluguerSelecionado.nomeUtilizador)
        formData.append("nomeFilme", aluguerSelecionado.nomeFilme)
        formData.append("preco", aluguerSelecionado.preco)
        formData.append("dataInicio", aluguerSelecionado.dataInicio)
        formData.append("dataFim", aluguerSelecionado.dataFim)
        axios.post(baseURL, formData )
            .then(response => {
                setData(data.concat(response.data));
                setUpdateData(true);
                abrirFecharModalAdicionar();
                abrirFecharModalCriado();
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoPut = async () => {
        await axios.put(baseURL + "/" + aluguerSelecionado.id, aluguerSelecionado)
            .then(response => {
                var resposta = response.data;
                var dadosAuxiliar = data;
                dadosAuxiliar.map(aluguer => {
                    if (aluguer.id === aluguerSelecionado.id) {
                        aluguer.nomeUtilizador = resposta.nomeUtilizador;
                        aluguer.nomeFilme = resposta.nomeFilme;
                        aluguer.preco = resposta.preco;
                        aluguer.dataInicio = resposta.dataInicio;
                        aluguer.dataFim = resposta.dataFim;
                    }
                });

                setUpdateData(true);
                abrirFecharModalEditar();
                abrirFecharModalEditado();
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoDelete = async () => {
        await axios.delete(baseURL + "/" + aluguerSelecionado.id)
            .then(response => {
                setData(data.filter(aluguer => aluguer.id !== response.data));
                setUpdateData(true);
                abrirFecharModalApagar();
            }).catch(error => {
                console.log(error);
            })
    }

    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData) {
            pedidoGet();
            setUpdateData(false);
        }
    }, [updateData])

    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData1) {
            pedidoGet1();
            setUpdateData1(false);
        }
    }, [updateData1])



    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData2) {
            pedidoGet2();
            setUpdateData2(false);
        }
    }, [updateData2])


    return (
        <div className="utilizadores-container">
            <br />
            <Link className="button" to="/">
                <button type="button" className="btn btn-outline-info btn-sm">Voltar</button>
            </Link>
            <br />
            <br />
            <h3>Criação de Alugueres</h3>
            <img src={iconAluga} alt='Alugueres' width="50px" />
            <button className="btn btn-success" onClick={() => abrirFecharModalAdicionar()}>Adicionar Aluguer</button>

            <table className="table table-dark table-striped mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Utilizador</th>
                        <th>Filme</th>
                        <th>Preço</th>
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Operação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(aluguer => (
                        <tr key={aluguer.id}>
                            <td>{aluguer.id}</td>
                            <td>{aluguer.nomeUtilizador}</td>
                            <td>{aluguer.nomeFilme}</td>
                            <td>{aluguer.preco}</td>
                            <td>{aluguer.dataInicio}</td>
                            <td>{aluguer.dataFim}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => selecionarAluguer(aluguer, "Editar")}>Editar</button> {"   "}
                                <button className="btn btn-danger" onClick={() => selecionarAluguer(aluguer, "Excluir")}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalAdicionar}>
                <ModalHeader>Adicionar Aluguer</ModalHeader>
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
                            <option value="">Escolha um filme</option>
                            {data2.map(filme => (
                                <option key={filme.id} value={filme.id} >{filme.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Preço:</label>
                        <br />
                        <select className="form-control" onChange={handlePrecoChange}>
                            <option value="">Escolha uma opção</option>
                            <option value="5.99">5,99 por 1 filme (1 ano)</option>
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPost()}>Adicionar</button>
                    <button className="btn btn-danger" onClick={() => abrirFecharModalAdicionar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Aluguer</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Utilizador:</label>
                        <br />
                        <select className="form-select" onChange={handleUtilizadorChange}>
                            <option value="">{aluguerSelecionado && aluguerSelecionado.nomeUtilizador}</option>
                            {data1.map(utilizador => (
                                <option key={utilizador.id} value={utilizador.id}>{utilizador.nome}</option>
                            ))}
                        </select>   
                        <br />
                        <label>Filme:</label>
                        <select className="form-select" onChange={handleFilmeChange}>
                            <option value="">{aluguerSelecionado && aluguerSelecionado.nomeFilme}</option>
                            {data2.map(filme => (
                                <option key={filme.id} value={filme.id} >{filme.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Preço:</label>
                        <br />
                        <select className="form-control" onChange={handlePrecoChange}>
                            <option value="">Escolha uma opção</option>
                            <option value="5.99">5,99 por 1 filme (1 ano)</option>
                        </select>
                        <br />
                        <label>Data de Início:</label>
                        <br />
                        <input type="text" className="form-control" name="dataInicio" onChange={handleChange} 
                        readOnly value={aluguerSelecionado && aluguerSelecionado.dataInicio} />
                        <br />
                        <label>Data de Fim:</label>
                        <br />
                        <input type="text" className="form-control" name="dataFim" onChange={handleChange} 
                        readOnly value={aluguerSelecionado && aluguerSelecionado.dataFim}/>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPut()}>Editar</button>
                    <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalApagar}>
                <ModalBody>
                    Confirma a eliminação esta subscrição: {aluguerSelecionado && aluguerSelecionado.id} ?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
                    <button className="btn btn-secondary" onClick={() => abrirFecharModalApagar()}>Não</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalCriado}>
                <ModalHeader>Aluguer Adicionado</ModalHeader>
                <ModalBody>
                    <div>O aluguer que introduziu foi adicionado com sucesso!</div>
                </ModalBody>
                <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalCriado()}></ModalFooter>
            </Modal>

            <Modal isOpen={modalEditado}>
                <ModalHeader>Aluguer Editado</ModalHeader>
                <ModalBody>
                    <div>O aluguer foi editado com sucesso!</div>
                </ModalBody>
                <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalEditado()}></ModalFooter>
            </Modal>

        </div>
    );
}


export default Alugueres;
