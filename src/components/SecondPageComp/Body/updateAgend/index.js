import { useEffect, useState } from "react";

const UpdateAgend = (props) => {   


    console.log(props.agendId);
    const[input, setInput] = useState([]);

    var obj = JSON.parse(sessionStorage.getItem('userData'));

    const getAgendamentos = () => {
          fetch(`http://localhost/final/index.php/agendamento`,{
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
                body: JSON.stringify({})        
              })
              .then((response) => response.json())
              .then((responseJson) => { 
                setInput(responseJson.listaAgendamentos);                           
              }).catch((error)=>{                
                  console.log(error);
              })                
      } 

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        //setProduct(values => ({...values, [name]: value}));
    }

    useEffect(() => {   
      getAgendamentos();  
    }, []) 


    return(
        <>
            <div className="">
            <form id="product_form">
        <div className='dataHora' >
            <div className="item">
                <p>Data/Horário</p>
                <input type="date" name="data" id="dateCalendar"  required/>
                <select id="horario" name="horario" onChange={handleChange}>
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
          <input type="text" name="nomeEmpresa" placeholder="First" onChange={handleChange} />
        </div>
        <div className="item">
          <p>Analista</p>
          <select id="analista" name="analista" onChange={handleChange} >
              <option value="">Analista</option>
              <option value="Amutti">Gabriel Amutti</option>
              <option value="Victor">Victor Rodrigues</option>
              <option value="Richard">Richard</option>
            </select>
        </div>
        <div className="item">
          <p>Status</p>
          <select id="status" name="status" onChange={handleChange} >
            <option value="">Status</option>
              <option value="Pendente">Pendente</option>
              <option value="Andamento">Andamento</option>
              <option value="Feito">Feito</option>
            </select>
        </div>
        <h4>Observação</h4>
        <textarea rows="4" name="observacao" onChange={handleChange} ></textarea>
        <div className="btn-block">
          <button type="submit" className="botaoForm">Alterar</button>
        </div>    
        </form>
    </div>
        </>
    );

}

export default UpdateAgend;