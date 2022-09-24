import './style.css';
import React from 'react';
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

const Body = () => {

    const [agendamentos, setAgendamentos] = useState([]);
    const [relatorio, setRelatorios] = useState([]);

    const navigate = useNavigate();

    const getProducts = async () => {
        await fetch("http://localhost/final/index.php/agendamentos", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setAgendamentos(responseJson.listaAgendamentos)
            setRelatorios(responseJson.relatorios[0].totalAgendamentos);
        });
    };

    useEffect(() => {
        getProducts();
    }, [])

    useEffect(() => {
        if(sessionStorage.getItem('userData') !== null){            
            navigate('/homepage');
         }else{
            navigate('/');
         }         
    }, [navigate])

    return (
        <>
            <div className="todoConteudo">
                <div className='conjuntoTotal'>
                    <div className='dashDiv d-flex'>
                        <div className='dashCard' id="firstCard">
                            <div className='subtitleCard'>
                              <p>Total</p>
                            </div>
                            <div className='tituloCard'>
                              <p>{relatorio}</p>
                            </div>
                        </div>
                        <div className='dashCard' id="secondCard">
                            <div className='subtitleCard'>
                                <p>Realizados</p>
                            </div>
                            <div className='tituloCard'>
                                <p>5</p>
                            </div>
                        </div>
                        <div className='dashCard' id="thirdCard">
                            <div className='subtitleCard'>
                                <p>Pendentes</p>
                            </div>
                            <div className='tituloCard'>
                              <p>2</p>
                            </div>
                        </div>
                        <div className='dashCard' id="lastCard">
                            <div className='subtitleCard'>
                                <p>Em treinamento</p>
                            </div>
                            <div className='tituloCard'>
                              <p>3</p>
                            </div>
                        </div>
                    </div>
                    <div className='agendamentosDiv'>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th scope="col">Empresa</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Produto</th>
                                    <th scope="col">comercial</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Horário</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Analista</th>
                                    <th scope="col">Observacao</th>
                                </tr>
                            </thead>
                            <tbody>{
                                typeof agendamentos !== "undefined" && Object.values(agendamentos).map((agendamento, index) => {
                                    return (
                                        <tr className='agendRows' key={index}>
                                            <td>{index+1}</td>
                                            <td>{agendamento.nomeEmpresa}</td>                                            
                                            <td>{agendamento.nomeCliente}</td>
                                            <td>{agendamento.produtoContratado}</td>
                                            <td>{agendamento.comercial}</td>
                                            <td>{agendamento.telefoneCliente}</td>
                                            <td>{agendamento.data}</td>
                                            <td>{agendamento.horario}</td>
                                            <td>{agendamento.status}</td>
                                            <td>{agendamento.analista}</td>
                                            <td>{agendamento.observacao}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                      </div>
                </div>
            </div>
        </>
    );
};

export default Body;
