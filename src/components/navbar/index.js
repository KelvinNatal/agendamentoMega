import { Link } from 'react-router-dom';
import logo from '../../agendaIcon.png';
import { TiHome } from "react-icons/ti";
import { TbCalendarTime } from "react-icons/tb";
import { FaClipboardList, FaUserCog } from "react-icons/fa";

import './style.css'

const NavBar = () => {
    
    return ( 
    <>
    <header className="head">
        <nav className="navbar">
            <div className="logoNav"> 
                <Link to="/homepage"><img className="logoNav" src={logo}/></Link>
            </div>
            <div className="iconsNav">
            <div className="icones">
                <div className=" teste">
                    <Link to="/homepage"><TiHome className="navIcons"/></Link>
                </div>
            </div>
            <div className="icones">
                <div className=" teste">
                    <Link to="/addproduct"><TbCalendarTime className="navIcons"/></Link>
                </div>
            </div>
            <div className="icones">
                <div className=" teste">
                    <Link to="/addproduct"><FaClipboardList className="navIcons"/></Link>
                </div>
            </div>
            <div className="icones">
                <div className=" teste">
                    <Link to="/register"><FaUserCog className="navIcons" id="navUse"/></Link>
                </div>
            </div>
            </div>
        </nav>
    </header>
    </>
    );
}

export default NavBar;