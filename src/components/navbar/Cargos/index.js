import { FaClipboardList, FaUserCog } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Cargos = () => {

    return(
        <>
            <div className="icones" >
                <div className=" teste">
                    <Link to="/addproduct"><FaClipboardList className="navIcons"/></Link>
                </div>
            </div>
            <div className="icones">
                <div className=" teste">
                    <Link to="/register"><FaUserCog className="navIcons" id="navUse"/></Link>
                </div>
            </div>
        </>
    );

}

export default Cargos;