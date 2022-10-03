import './style.css'
import { useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import { FaUser } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";


const Register = () => {

    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [users, setUsers] = useState([]);

    const [user, setUser] = useState({
        username: '',
        password: ''       
    }); 

    const handleClose = () => {
        setShow(false)
    };

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
      }  

    const inputValue = e => setUser({...user, [e.target.name]: e.target.value});

    const navigate = useNavigate();

    const getUsers = async () => {
        await fetch("http://localhost/final/index.php/usuarios", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.listaUsuarios)
            setUsers(responseJson.listaUsuarios);
        });
    };

    const cadUsuario = async () =>{                     
            await fetch("http://localhost/final/index.php/registrar",{ 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                body: JSON.stringify({user})         
            })
            .then((response) => response.json())
            .then((responseJson) => {
                
            }).catch((err)=>{                
                console.log(err);
            })                            
    }

    const deleteUser= async (id) => {
        await fetch(`http://localhost/final/index.php/${id}/delUser`,{
          method: 'DELETE'       
        })
        .then((response) => response.json())
        .then((responseJson) => {      
          console.log(responseJson);
          getUsers();          
        })
      }

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        if(sessionStorage.getItem('userData') !== null){            
            navigate('/register');
         }else{
            navigate('/');
         }         
    }, [navigate])
    
    return (
        <>
            <div className="todoConteudoRegister d-flex">
            <div className='conjuntoUser'>
            <div className='btnUser' onClick={handleShow}>
                    <p>+</p>
                </div>
            <Modal  dialogClassName='regMod' fullscreen={fullscreen} show={show} onHide={handleClose} animation={true}>
              <Modal.Header>
                <Modal.Title>Criar Usuário</Modal.Title>
             </Modal.Header>
            <Modal.Body className="modd">
            <form onSubmit={cadUsuario}>
            <div className='boxReg'>
                        <div className="inputsRegis">
                            <h5 className='campos'>Usuário de acesso:</h5>
                            <input id="inputeId" type="text" className=" inpute form-control" placeholder="Digite seu usuário" name="username"
                                onChange={inputValue}></input>
                            <h5 className='campos'>Senha de acesso:</h5>
                            <input type="text" className=" inpute form-control" placeholder="Digite sua senha" name="password"
                                onChange={inputValue}></input>
                            <button type="submit" className="btnLogin btn btn-primary" onClick={cadUsuario}>Registrar</button>
                        </div>  
                </div>
            </form>
    </Modal.Body>
            </Modal>
                        <div className='d-flex '>
                        {
                                typeof users !== "undefined" && Object.values(users).map((user, index) => {
                                    return (
                        <div className="card userCard" key={user.user_id}>
                            <h5 className="card-title titleCard">{user.cargo}</h5>
                        <div className="card-body bodyC">
                            <FaUser className="userIcon" id=""/>
                            <p className="card-text userTitle">{user.username}</p>
                        </div>
                        <div className="bottomCard">
                        <div className="opcoesUser">
                                <div className="opcUsers d-flex">
                                    <button className='buttonsUser' id="bt1Apag" onClick={() => deleteUser(user.user_id)}>
                                       <FaTrashAlt className="opcIcons"/>
                                    </button>
                                    <div className='buttonsUser' id="bu2">
                                        <GoPencil className="opcIcons"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
                                })
                            }
                            </div>
                </div>
            </div>
        </>
    );
}


export default Register;
