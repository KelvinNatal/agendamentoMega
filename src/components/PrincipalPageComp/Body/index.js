import './style.css';
import React from 'react';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';

const Body = () => {

    const [agendamentos, setAgendamentos] = useState([]);
    const [relatorio, setRelatorios] = useState([]);

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

    /***const deleteProduct = async () => {
    let arrayids=[];
    Object.values(products).forEach(product=>{
        if(product.select){
          arrayids.push(product.id);
        }       
      });
      await fetch("https://jobphp.herokuapp.com/index.php?id=" + arrayids,{
        method: 'DELETE'       
      })
      .then((response) => response.json())
      .then((responseJson) => {        
        console.log(responseJson);  
        if(responseJson.erro){
          setStatus({
              type: 'erro',
              message: responseJson.message
          })
       } 
        getProducts();          
      })
    }  
*/

    useEffect(() => {
        getProducts();
    }, [])

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
                    <div id='buttonDash'>
                        <p>+ Agendamento</p>
                    </div>
                    <div className='agendamentosDiv'>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
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
                            <tbody> {
                                typeof agendamentos !== "undefined" && Object.values(agendamentos).map((agendamento) => {
                                    return (
                                        <tr className='agendRows'>
                                            <th scope="row"></th>
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
                                <tr>
                                    <th className="" scope="row"></th>
                                    <td>45</td>
                                    <td>43</td>
                                    <td>45</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Mark</td>
                                </tr>
                                <tr>
                                    <th className="" scope="row"></th>
                                    <td>45</td>
                                    <td>43</td>
                                    <td>45</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Mark</td>
                                </tr>
                                <tr>
                                    <th className="" scope="row"></th>
                                    <td>45</td>
                                    <td>43</td>
                                    <td>45</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Mark</td>
                                </tr>
                                <tr>
                                    <th className="" scope="row"></th>
                                    <td>45</td>
                                    <td>43</td>
                                    <td>45</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Mark</td>
                                </tr>
                                <tr>
                                    <th className="" scope="row"></th>
                                    <td>45</td>
                                    <td>43</td>
                                    <td>45</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Mark</td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                </div>
            </div>
        </>
    );
};

export default Body;
