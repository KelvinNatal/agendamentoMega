import './style.css'
import { useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import NavLine from '../navLine';
import NavBar from '../navbar';
import Modal from "react-bootstrap/Modal";

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
            console.log(responseJson);
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
                console.log(responseJson);
            }).catch((err)=>{                
                console.log(err);
            })                            
    }

    useEffect(() => {
        getUsers();
    }, [])
    
    return (
        <>
            <div className="todoConteudologin d-flex">
            <div className='conjuntoUser'>
            <div className="btnUser" onClick={handleShow}>+Usuário</div>
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
            <div className='UsersDiv'>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Usuário</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody> {
                                typeof users !== "undefined" && Object.values(users).map((user) => {
                                    return (
                                        <tr className='userRow'>
                                            <th scope="row" ></th>
                                            <td className='fontTable'>{user.username}</td>                                            
                                            <td className='fontTable'>Admin</td>
                                            <td className='fontTable'></td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                      </div>
                {/*<div className="meio container">
                    <div className='boxContainer'>
                        <div className='logoContainer'>
                            <img src={logo}
                                className='imagem'></img>
                            <p id="title" className='logoTitle'>AGENDAMENTO</p>
                            <p id="subTitle" className='logoTitle'>Mega Conecta</p>
                        </div>
                        <div className="inputsLogin">
                            <h5 className='campos'>Usuário de acesso:</h5>
                            <input id="inputeId" type="text" className=" inpute form-control" placeholder="Digite seu usuário" name="username"
                                onChange={inputValue}></input>
                            <h5 className='campos'>Senha de acesso:</h5>
                            <input type="text" className=" inpute form-control" placeholder="Digite sua senha" name="password"
                                onChange={inputValue}></input>
                            <button type="submit" className="btnLogin btn btn-primary" onClick={register}>Registrar</button>
                            
                            <a href="/register">Registrar</a>
                        </div>
                    </div>
    </div>**/}
                </div>
            </div>
        </>
    );
}


export default Register;
