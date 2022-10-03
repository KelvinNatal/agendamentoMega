import './style.css'
import { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import {useNavigate} from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { TiFilter } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

const ClienteP = () => {

    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [products, setProducts] = useState([]);    

    const navigate = useNavigate();
    
    const [product, setProduct] = useState({
        nomeEmpresa: '',
        cliente: '',
        telCliente: '',
        comercial: '',
        produto: '',
        plano: '',
        ramais: '',
        dataEmp: '',   
        link: '' 
    });    

    const inputValue = (e) => {
        let valor = e.target.value;
        setProduct({...product, [e.target.name]: valor});    
        console.log(product)   
    }

    const inputD = () => {
        var date = document.getElementById('dateCalendar').value;
        var array = date.split('-');
        var dataFinal = `${array[2]}/${array[1]}/${array[0]}`;
        setProduct({...product, dataEmp: date});
    }

    const handleClose = () => {
        setShow(false)
    };

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
      } 
      var obj = JSON.parse(sessionStorage.getItem('userData'));

    const getEmpresas = () => {
        fetch(`http://localhost/final/index.php/empresas`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }        
            })
            .then((response) => response.json())
            .then((responseJson) => { 
              console.log(responseJson);
                 setProducts(responseJson.listaEmpresas);                          
            }).catch((error)=>{                
                console.log(error);
            })                
    } 

    const getFilter = (e) => {
      var dataI = document.getElementById('inputInicialEmp').value; 
      var dataF = document.getElementById('inputFinalEmp').value; 
      const filtroTeste = {
        dataInicial: dataI,
        dataFinal: dataF
      }     
      e.preventDefault();
        fetch(`http://localhost/final/index.php/filtroEmpresa`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                body: JSON.stringify({filtroTeste})         
            })
            .then((response) => response.json())
            .then((responseJson) => {
                setProducts(responseJson.listaFiltro);
            }).catch((error)=>{                
                console.log(error)
            })                
    }  

    const cadProduct = async (e) =>{     
      e.preventDefault();      
            await fetch("http://localhost/final/index.php/criarEmpresa",{ 
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

    const deleteAgend = async (id) => {
      await fetch(`http://localhost/final/index.php/${id}/delempresa`,{
        method: 'DELETE'       
      })
      .then((response) => response.json())
      .then((responseJson) => {      
        console.log(responseJson);
        getEmpresas();          
      })
    }


    useEffect(() => {   
      getEmpresas();  
    }, [])    

    useEffect(() => {
        if(sessionStorage.getItem('userData') !== null){            
            navigate('/addcliente');
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
      <div className="todoConteudoCli d-flex">
            <div className='conjuntoCli'>
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
                <Modal.Title>Criar Empresa</Modal.Title>
             </Modal.Header>
            <Modal.Body className="modd">
            <div className="">
            <form id="product_form" onSubmit={cadProduct}>
        <div className='dataHora' >
            <div className="item">
                <p>Data</p>
                <input type="date" name="dataEmp" id="dateCalendar" onChange={inputD}required/>
                <i className="icone fas fa-calendar-alt"></i>
            </div>
        </div>
        <div className="item">
          <p>Empresa</p>
          <input type="text" name="nomeEmpresa" placeholder="First" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Cliente</p>
          <input type="text" name="cliente" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Telefone</p>
          <input type="text" name="telCliente" onChange={inputValue} />
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
          <p>Produto</p>
          <input type="text" name="produto" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Plano / Canais</p>
          <select id="plano" name="plano" onChange={inputValue}>
              <option value="">Plano</option>
              <option value="ilimitado">Ilimitado</option>
              <option value="tarifado">Tarifado</option>
            </select>
        </div>
        <div className="item">
          <p>Ramais / Licenças</p>
          <input type="text" name="ramais" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Link</p>
          <input type="text" name="link" onChange={inputValue} />
        </div>
        <div className="btn-block">
          <button type="submit" className="botaoForm" href="/">Salvar</button>
        </div>    
        </form>
    </div>
            </Modal.Body>
            </Modal>
            <div className='addCliDiv d-flex'>
                      <div className='tudoCard'>
                        <div className="cabecalhoCard d-flex">
                          <div className='cabeEmp'>Empresa</div>
                          <div className='cabeCli'>Cliente</div>
                          <div className='cabeTel'>Telefone</div>
                          <div className='cabeDat'>Comercial</div>
                          <div className='cabeHor'>Produto</div>
                          <div className='cabeSta'>Plano</div>
                          <div className='cabeAna'>Ramais</div>
                          <div className='cabeObs'>Data</div>
                          <div className='cabeOpc'>Opções</div>
                        </div>
                        {
                                typeof products !== "undefined" && Object.values(dataSearch).map((produc, index) => {
                                    return (
                      <div className="agendCard d-flex" key={produc.idEmpresa}>
                            <div className="empresaDiv">
                            {produc.nomeEmpresa}
                            </div>
                            <div className="clienteDiv">
                            {produc.cliente}
                            </div>
                            <div className="telefoneDiv">
                            {produc.telCliente}
                            </div>
                            <div className="comercialDiv">
                            {produc.comercial}
                            </div>
                            <div className="produtoDiv">
                            {produc.produto}
                            </div>
                            <div className="planoDiv">
                            {produc.plano}
                            </div>
                            <div className="ramaisDiv">
                            {produc.ramais}
                            </div>
                            <div className="dataDiv">
                            {produc.dataEmp}
                            </div>
                            <div className="opcoesDiv">
                                <div className="opcButtons d-flex">
                                      <button className='buttonsOpc' id="bt1Apag" onClick={() => deleteAgend(produc.idEmpresa)}>
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
                      <form onSubmit={getFilter}>
                      <div className='filtroDiv'>
                        <div className='btnFiltro'>
                            <p>Data</p>
                        </div>
                        <div className="tituloFiltro">
                          <p>Data Inicial:</p>
                        </div>
                        <div className='filterSearch'>
                        <div className="select">
                          <div className="">
                          <input type="date" name="dataInicial" className="inputF" id="inputInicialEmp"/>
                          <FaCalendarAlt className="calendarIcon" id="calendarI"/>
                          </div>
                          <div className="subtituloFiltro">
                            <p>Data Final:</p>
                          </div>                          
                          <div className="inputFiltroDiv">
                            <input type="date" name="dataFinal" className="inputF" id="inputFinalEmp"/>
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

export default ClienteP;