import './style.css';
import React from 'react';
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { TiFilter } from "react-icons/ti";

const Body = () => {

    const [agendamentos, setAgendamentos] = useState([]);
    const [relatorio, setRelatorios] = useState([]);
    const [deletar, setDeletar] = useState('');

    const navigate = useNavigate();

    var obj = JSON.parse(sessionStorage.getItem('userData'));

    /*const getProducts = async () => {
        await fetch("http://localhost/final/index.php/agendamentos", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            setAgendamentos(responseJson.listaAgendamentos)
            setRelatorios(responseJson.relatorios[0].totalAgendamentos);
        });
    }; */
    
    const getAgendamentos = () => {
        const userRel = {
          username: obj.userData.username,
          cargo: obj.userData.cargo
        }     
          fetch(`http://localhost/final/index.php/agendamentos`,{
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
                  body: JSON.stringify({userRel})         
              })
              .then((response) => response.json())
              .then((responseJson) => {
                if(responseJson !== ''){
                setAgendamentos(responseJson.listaAgendamentos);   
                if(obj.userData.cargo !== "Admin"){
                    setRelatorios(responseJson.listUserrel[0].totalAgendUser);
                }else{
                    setRelatorios(responseJson.relatorios[0].totalAgendamentos);
                }    
              }else{
                return <div></div>;
              }                      
              }).catch((error)=>{                
                  console.log(error);
              })                
      } 

      const deleteAgend = async (id) => {
          await fetch(`http://localhost/final/index.php/${id}/delagend`,{
            method: 'DELETE'       
          })
          .then((response) => response.json())
          .then((responseJson) => {      
            console.log(responseJson);
            getAgendamentos();          
          })
        }

    useEffect(() => {
        getAgendamentos();
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
                    <div className='agendamentosDiv d-flex'>
                      <div className='tudoCardDash'>
                        <div className="cabecalhoCardDash d-flex">
                          <div className='cabeEmpDash'>Empresa</div>
                          <div className='cabeCliDash'>Cliente</div>
                          <div className='cabeTelDash'>Telefone</div>
                          <div className='cabeDatDash'>Data</div>
                          <div className='cabeHorDash'>Horário</div>
                          <div className='cabeStaDash'>Status</div>
                          <div className='cabeAnaDash'>Analista</div>
                          <div className='cabeObsDash'>Observação</div>
                          <div className='cabeOpc'>Opções</div>
                        </div>
                        {typeof agendamentos !== "undefined" && Object.values(agendamentos).map((agendamento, index) => {
                                    return (
                      <div className="agendCardDash d-flex" key={agendamento.id}>
                            <div className="empresaDivDash">
                            {agendamento.nomeEmpresa}
                            </div>
                            <div className="clienteDivDash">
                            {agendamento.cliente}
                            </div>
                            <div className="telefoneDivDash">
                            {agendamento.telCliente}
                            </div>
                            <div className="dataDivDash">
                            {agendamento.data}
                            </div>
                            <div className="horarioDivDash">
                            {agendamento.horario}
                            </div>
                            <div className="statusDivDash">
                            {agendamento.status}
                            </div>
                            <div className="analistaDivDash">
                            {agendamento.analista}
                            </div>
                            <div className="obsDivDash">
                            {agendamento.observacao}
                            </div>
                            <div className="opcoesDiv">
                                <div className="opcButtons d-flex" >
                                      <button className='buttonsOpc' id="bt1Apag" onClick={() => deleteAgend(agendamento.id)}>
                                        <FaTrashAlt className="opcIcons"/>
                                      </button>
                                    <div className='buttonsOpc' id="bt2">
                                        <GoPencil className="opcIcons"/>
                                    </div>
                                    <div className='buttonsOpc' id="bt3">
                                        <BsThreeDotsVertical className="opcIcons"/>
                                    </div>
                                </div>
                            </div>
                      </div>
                      );
                    })
                }
                      </div>                      
                      </div>
                      <div className='filtroDivDash'>
                        <div className='btnFiltro'>
                            <p>Data</p>
                        </div>
                        <div className="tituloFiltro">
                          <p>Data Inicial:</p>
                        </div>
                        <div className='filterSearch'>
                        <div className="select">
                          <div className="">
                          <input type="date" name="dataInicial" className="inputF" id="inputInicial"/>
                          <FaCalendarAlt className="calendarIcon" id="calendarI"/>
                          </div>
                          <div className="subtituloFiltro">
                            <p>Data Final:</p>
                          </div>                          
                          <div className="inputFiltroDiv">
                            <input type="date" name="dataFinal" className="inputF" id="inputFinal"/>
                            <FaCalendarAlt className="calendarIcon" id="calendarF"/>
                            <button type="submit" className="botaoFiltro" href="/"><TiFilter className="filterIcons"/></button>
                           </div>
                          </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;
