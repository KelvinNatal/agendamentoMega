import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './style.css';

const UpdateUser = (props) => { 

    const {id} = useParams();

    const[input, setInput] = useState([]);  

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [name]: value}));
    }

    const updateUsuario = async () =>{       
              await fetch(`http://localhost/final/index.php/updateUsuario/${id}`,{ 
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
                  body: JSON.stringify({input})         
              })
              .then((response) => response.json())
              .then((responseJson) => {
                //console.log(responseJson);
              }).catch((err)=>{                
                  console.log(err);
              })                         
      }

    useEffect(() => {   
      fetch(`http://localhost/final/index.php/usuario/${id}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }    
        })
        .then((response) => response.json())
        .then((responseJson) => { 
          setInput(responseJson.usuario[0]);                           
        }).catch((error)=>{                
            console.log(error);
        })  
    }, [id]) 

    return(
        <>
        <div className="corpoPaginaUser">
        <div className="corpoUpdateUser">
        <form onSubmit={updateUsuario}>
        <div className='dataHora' >
        </div>
        <div className="item">
          <p>Nome</p>
          <input type="text" name='username' id="nome" placeholder="Nome" onChange={handleChange} value={input.username}/>
        </div>
        <div className="item">
          <p>Senha</p>
          <input type="password" name="password" placeholder="Senha" onChange={handleChange} />
        </div>
        <div className="item">
          <p>Cargo</p>
          <select id="analista" name="cargo" onChange={handleChange} value={input.cargo}>
              <option value="">Cargo</option>
              <option value="Admin">Admin</option>
              <option value="Analista">Analista</option>
            </select>
        </div>
        <div className="btn-block">
          <button type="submit" className="botaoForm">Cadastrar</button>
        </div>    
        </form>
    </div>
    </div>
        </>
    );

}

export default UpdateUser;