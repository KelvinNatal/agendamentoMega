import './style.css'
import { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import {useNavigate} from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { TiFilter } from "react-icons/ti";

const Body = () => {

    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [products, setProducts] = useState([]);    

    const navigate = useNavigate();
    
    const [product, setProduct] = useState({
        nomeEmpresa: '',
        nomeCliente: '',
        produtoContratado: '',
        telefoneCliente: '',
        data: '',
        horario: '',
        status: '',
        analista: '',
        comercial: '',
        observacao: ''     
    });    

    const inputValue = (e) => {
        let valor = e.target.value;
        setProduct({...product, [e.target.name]: valor});    
        console.log(product)   
    }

    const [filtro, setFiltro] = useState({
      dataInicial: null,
      dataFinal: null
    });  

    const inputFiltro = (e) => {
      var dataI = document.getElementById('inputInicial').value; 
      var dataF = document.getElementById('inputFinal').value;
      
      setFiltro({dataInicial: dataI, dataFinal: dataF});      
    }
    const inputD = () => {
        var date = document.getElementById('dateCalendar').value;
        var array = date.split('-');
        var dataFinal = `${array[2]}/${array[1]}/${array[0]}`;
        setProduct({...product, data: date});
    }

    const handleClose = () => {
        setShow(false)
    };

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
      }    
      
      const getProducts = async () => {
        await fetch("http://localhost/final/index.php/agendamentos", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setProducts(responseJson.listaAgendamentos);
        });
    };

    const getFilter = (e) => {
      var dataI = document.getElementById('inputInicial').value; 
      var dataF = document.getElementById('inputFinal').value; 
      const filtroTeste = {
        dataInicial: dataI,
        dataFinal: dataF
      }     
      console.log(filtroTeste)
      e.preventDefault();
        fetch(`http://localhost/final/index.php/filtrar`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                body: JSON.stringify({filtroTeste})         
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
                setProducts(responseJson.listaFiltro);
            }).catch((error)=>{                
                console.log(error)
            })                
    }   

    const cadProduct = async () =>{           
            await fetch("http://localhost/final/index.php/criarAgendamento",{ 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                body: JSON.stringify({product})         
            })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
            }).catch((err)=>{                
                console.log(err);
            })                         
    }

    useEffect(() => {        
        getProducts();
    }, [])    

    useEffect(() => {
        if(sessionStorage.getItem('userData') !== null){            
            navigate('/addproduct');
         }else{
            navigate('/');
         }         
    }, [navigate]);

    const [filter, setFilter] = useState('');

    const searchText = (event) =>{
      setFilter(event.target.value);
    }
  let dataSearch = products.filter(item=>{
    return Object.keys(item).some(key=>
        item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
      )
  });    
    
    return (       
      <>
      <div className="todoConteudoAdd d-flex">
            <div className='conjuntoAdd'>
              <div className='cabeButtons d-flex'>
                <div className='btnAgend' onClick={handleShow}>
                    <p>+</p>
                </div>
                <div className='pesquisaFiltro'>
                  <input type="Text" placeholder="Insira..." id="inputFiltro" value={filter} onChange={searchText.bind(this)}></input>
                  <IoMdSearch className="fa addIcons"/>
                </div>
              </div>
            <Modal  dialogClassName='mod' fullscreen={fullscreen} show={show} onHide={handleClose} animation={true}>
              <Modal.Header closeButton className="modd">
                <Modal.Title>Criar Agendamento</Modal.Title>
             </Modal.Header>
            <Modal.Body className="modd">
            <div class="">
            <form id="product_form" onSubmit={cadProduct}>
        <div className='dataHora' >
            <div className="item">
                <p>Data/Horário</p>
                <input type="date" name="data" id="dateCalendar" onChange={inputD}required/>
                <select id="horario" name="horario" onChange={inputValue}>
                    <option value="">Horário</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                </select>
                <i className="icone fas fa-calendar-alt"></i>
            </div>
        </div>
        <div className="item">
          <p>Empresa</p>
          <input type="text" name="nomeEmpresa" placeholder="First" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Cliente</p>
          <input type="text" name="nomeCliente" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Telefone</p>
          <input type="text" name="telefoneCliente" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Produto</p>
          <input type="text" name="produtoContratado" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Comercial</p>
          <select id="comercial" name="comercial" onChange={inputValue}>
              <option value="">Comercial</option>
              <option value="Mariana">Mariana</option>
              <option value="Pamela">Pamela</option>
              <option value="Alef">Alef</option>
              <option value="Cleiton">Cleiton</option>
              <option value="Elieser">Elieser</option>
              <option value="Junior">Junior</option>
            </select>
        </div>
        <div className="item">
          <p>Analista</p>
          <select id="analista" name="analista" onChange={inputValue}>
              <option value="">Analista</option>
              <option value="Amutti">Gabriel Amutti</option>
              <option value="Victor">Victor Rodrigues</option>
              <option value="Richard">Richard</option>
            </select>
        </div>
        <div className="item">
          <p>Status</p>
          <select id="status" name="status" onChange={inputValue}>
            <option value="Pendente">Status</option>
              <option value="Pendente">Pendente</option>
              <option value="Andamento">Andamento</option>
              <option value="Feito">Feito</option>
            </select>
        </div>
        <h4>Observação</h4>
        <textarea rows="4" name="observacao" onChange={inputValue}></textarea>
        <div className="btn-block">
          <button type="submit" className="botaoForm" href="/">Agendar</button>
        </div>    
        </form>
    </div>
            </Modal.Body>
            </Modal>
            <div className='addagendDiv d-flex'>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                    <th scope="col">Empresa</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Produto</th>
                                    <th scope="col">Comercial</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Horário</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Analista</th>
                                    <th scope="col">Observacao</th>
                                </tr>
                            </thead>
                            <tbody>{
                                typeof products !== "undefined" && Object.values(dataSearch).map((produc, index) => {
                                    return (
                                        <tr className='agendRows' key={index}>
                                            <td>{index+1}</td>
                                            <td>{produc.nomeEmpresa}</td>                                            
                                            <td>{produc.nomeCliente}</td>
                                            <td>{produc.produtoContratado}</td>
                                            <td>{produc.comercial}</td>
                                            <td>{produc.telefoneCliente}</td>
                                            <td>{produc.data}</td>
                                            <td>{produc.horario}</td>
                                            <td>{produc.status}</td>
                                            <td>{produc.analista}</td>
                                            <td>{produc.observacao}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                      </div>
                      <form onSubmit={getFilter}>
                      <div className='filtroDiv'>
                        <div className='btnFiltro'>
                            <p>Data</p>
                        </div>
                        <div className="tituloFiltro">
                          <p>Data Inicial:</p>
                        </div>
                        <div className='filterSearch'>
                        <div class="select">
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
                    </form>
            </div>     
            
        </div>
      </>
    );
  };

export default Body;