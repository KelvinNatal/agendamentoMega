import { HiUserCircle } from "react-icons/hi";
import {Link, useNavigate} from 'react-router-dom';

import './style.css'

const NavLine = (props) => {

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.setItem("userData", '');
        sessionStorage.clear();
        navigate('/');
    }
    

    return (
        <>
            <header className="headLine">
                <nav className="naveLine navbar-expand-lg bg-light d-flex">
                <div className=" todoNavLine container-fluid d-flex">
                    <div className='TituloDiv'>
                        <h3 className='tituloPagina'>{props.name}</h3>
                    </div>
                    
                        <div className="perfilDiv d-flex" onClick={logout}>
                            <HiUserCircle className='perfIcon'/>
                            <div className='descPerfil'>
                                <p className='titlePerfil' id="subtitlePerfil">Kelvin Natal</p>
                                <p className='titlePerfil'>Analista</p>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default NavLine;
