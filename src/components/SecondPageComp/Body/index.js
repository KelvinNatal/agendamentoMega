import './style.css'
import { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";


const Body = () => {

    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [products, setProducts] = useState([]);

    
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

    const inputD = () => {
        var date = document.getElementById('dateCalendar').value;
        var array = date.split('-');
        var dataFinal = `${array[2]}/${array[1]}/${array[0]}`;
        setProduct({...product, data: dataFinal});
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

    const cadProduct = async () =>{      
        console.log(product)                  
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
                console.log(responseJson);
            }).catch((err)=>{                
                console.log(err);
            })                            
    }

    useEffect(() => {
        getProducts();
    }, [])    
    
    
    return (       
      <>
      <div className="todoConteudologin d-flex">
            <div className='conjuntoUser'>
            <div className='btnAgend' onClick={handleShow}>
                <p>+ Agendamento</p>
            </div>
            <Modal  dialogClassName='mod' fullscreen={fullscreen} show={show} onHide={handleClose} animation={true}>
              <Modal.Header closeButton className="modd">
                <Modal.Title>Criar Agendamento</Modal.Title>
             </Modal.Header>
            <Modal.Body className="modd">
            <div class="">
            <form id="product_form" onSubmit={cadProduct}>
        <div className='dataHora' >
            <div class="item">
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
                <i class="icone fas fa-calendar-alt"></i>
            </div>
        </div>
        <div class="item">
          <p>Empresa</p>
          <input type="text" name="nomeEmpresa" placeholder="First" onChange={inputValue} />
        </div>
        <div class="item">
          <p>Cliente</p>
          <input type="text" name="nomeCliente" onChange={inputValue} />
        </div>
        <div class="item">
          <p>Telefone</p>
          <input type="text" name="telefoneCliente" onChange={inputValue} />
        </div>
        <div class="item">
          <p>Produto</p>
          <input type="text" name="produtoContratado" onChange={inputValue} />
        </div>
        <div class="item">
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
        <div class="item">
          <p>Analista</p>
          <select id="analista" name="analista" onChange={inputValue}>
              <option value="">Analista</option>
              <option value="Amutti">Gabriel Amutti</option>
              <option value="Victor">Victor Rodrigues</option>
              <option value="Richard">Richard</option>
            </select>
        </div>
        <div class="item">
          <p>Status</p>
          <select id="status" name="status" onChange={inputValue}>
            <option value="Pendente">Status</option>
              <option value="Pendente">Pendente</option>
              <option value="Feito">Feito</option>
            </select>
        </div>
        <h4>Observação</h4>
        <textarea rows="4" name="observacao" onChange={inputValue}></textarea>
        <div class="btn-block">
          <button type="submit" className="botaoForm" href="/">Agendar</button>
        </div>    
        </form>
    </div>
            {/*        
            <form id="product_form" onSubmit={cadProduct}>
            <div className='bodyModal container'>
                <div className=''>
                    <div className="principal d-flex">
                        <div className="input-group-sm mb-1 labelForm">
                            <p className='titleForms'>Empresa:</p>
                            <input id="nomeEmpresa" type="text" name="nomeEmpresa" onChange={inputValue}  className="form-control inputForm"  aria-describedby="inputGroup-sizing-sm"/>
                        </div>
                        <div className="input-group-sm mb-1 labelForm">
                            <p className='titleForms'>Cliente:</p>
                            <input id="produtoContratado" type="text" name="produtoContratado"  onChange={inputValue} className="form-control inputForm"  aria-describedby="inputGroup-sizing-sm"/>                    
                        </div>
                        <div className="input-group-sm mb-1 labelForm">
                            <p className='titleForms'>Produto:</p>
                            <input id="date" type="text" name="date" onChange={inputValue} className="form-control inputForm" aria-describedby="inputGroup-sizing-sm"/>                    
                        </div>
                    </div>
                    <div className="principal d-flex">
                        <div className="input-group-sm mb-1 labelForm">
                            <p className='titleForms'>Telefone:</p>
                            <input id="date" type="text" name="date" onChange={inputValue} className="form-control inputForm" aria-describedby="inputGroup-sizing-sm"/>                    
                        </div>
                        <div className="input-group-sm mb-1 labelForm">
                            <p className='titleForms'>Data:</p>
                            <input id="date" type="text" name="date" onChange={inputValue} className="form-control inputForm" aria-describedby="inputGroup-sizing-sm"/>                    
                        </div>
                        <div className="input-group-sm mb-1 labelForm">
                            <p className='titleForms'>Horário: </p>
                            <input id="date" type="text" name="date" onChange={inputValue} className="form-control inputForm" aria-describedby="inputGroup-sizing-sm"/>                    
                        </div>
                    </div>
                    <div className="principal d-flex">                                 
                        <div className="input-group-sm mb-1 labelForm">
                            <p className='titleForms'>Observação: </p>
                            <input id="date" type="text" name="date" onChange={inputValue} className="form-control inputForm" aria-describedby="inputGroup-sizing-sm"/>                    
                        </div>
                </div> 
                <div className='botoesModal'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                    <button type="submit" className="botaoSalvar btn btn-primary" onClick={handleClose}>Save Changes</button> 
                </div>
            </div>
            <br/><br/>                    
        </div>         
    </form> 
    */}
            </Modal.Body>
            </Modal>
            <div className='addagendDiv'>
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
                                typeof products !== "undefined" && Object.values(products).map((produc) => {
                                    return (
                                        <tr className='agendRows'>
                                            <th scope="row"></th>
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
      {/*<div className="todoExemplo">
      <div className="serror">                  
        {status.type === 'erro'?<div className="serror">{status.message}</div> : ""} 
        {status.type === 'success'?<div className="serror">{status.message}</div> : ""} 
      </div>
      <form id="product_form" onSubmit={cadProduct}>
        <div className='container all'>
            <div className=''>  
                              
                <div className="input-group-sm mb-1 d-flex text">
                    <p className=''>SKU</p>
                    <input id="nomeEmpresa" type="text" name="nomeEmpresa" onChange={inputValue}  className="form-control inputSku"  aria-describedby="inputGroup-sizing-sm"/>

                </div>
                <div className="input-group-sm mb-1 d-flex text">
                    <p className=''>Name</p>
                    <input id="produtoContratado" type="text" name="produtoContratado"  onChange={inputValue} className="form-control inputName"  aria-describedby="inputGroup-sizing-sm"/>                    
                </div>
                <div className="input-group-sm mb-1 d-flex text">
                    <p className=''>Price($)</p>
                    <input id="date" type="text" name="date" onChange={inputValue} className="form-control inputPrice" aria-describedby="inputGroup-sizing-sm"/>                    
                </div>
            </div>
            <br/><br/>                  
        </div>         
        </form> 
    </div>        */}
            </div>
        </div>
      </>
    );
  };

export default Body;