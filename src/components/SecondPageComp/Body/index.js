import './style.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link} from "react-router-dom";
import Disc from '../Disc/index';
import FurnitureForm from '../FurnitureForm/index';
import Book from '../Book';

const Body = () => {

    const navigate = useNavigate();

    const initialstate = {
        skuError: '',
        nameError: '',
        priceError: '',
        sizeError: '',
        heightError: '',
        widthError: '',
        lengthError: '',
        weightError: '',
        emptyError: ''
    }

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [state, setState] = useState({
        state: initialstate
    });

    const [productType, setType] = useState({});

    const [product, setProduct] = useState({
        sku: '',
        name: '',
        price: '',
        size: null,
        height: null,
        width: null,
        length: null,
        weight: null,
        
    });

    const productFunc = () => {

        while(productType === '0'){
            return '';
        }
        
        while(productType === '1'){
            product.width = null;
            product.height = null;
            product.length = null;
            product.weight = null;
            return <Disc      
                        func = {inputValue}
                        stat = {state.sizeError}
                    />;
        }

        while(productType === '2'){
            product.size = null;
            product.weight = null;
            return <FurnitureForm
                        func = {inputValue}
                        statH = {state.heightError}
                        statW = {state.widthError}
                        statL = {state.lengthError}
                    />;
        }

        while(productType === '3'){
            product.width = null;
            product.height = null;
            product.length = null;
            product.size = null;
            return <Book
                    func = {inputValue}
                    statW = {state.weightError}
                    />; 
        }  
    } 

    const inputValue = e => setProduct({...product, [e.target.name]: e.target.value});
    
    const validate = () => {

            let skuError= '';
            let nameError= '';
            let priceError= '';
            let sizeError = '';
            let heightError= '';
            let widthError= '';
            let lengthError= '';
            let weightError= '';
            let emptyError= '';
            
            if(product.sku === '')
            {
                skuError = "Please, submit required data";
            }
            if(product.name === '')
            {
                nameError = "Please, submit required data";
            }
            if(product.price === '')
            {
                priceError = "Please, submit required data";
                
            }else if(isNaN(product.price)){
                priceError = "Please, provide the data of indicated type";
            }
            if(product.size === '' && productType === '1')
            {
                sizeError = "Please, submit required data";
            }
            else if(isNaN(product.size)){
                sizeError = "Please, provide the data of indicated type";
            }
            if(product.height === null && productType === '2')
            {
                heightError = "Please, submit required data";
            }
            else if(isNaN(product.height)){
                heightError = "Please, provide the data of indicated type";
            }
            if(product.width === null && productType === '2')
            {
                widthError = "Please, submit required data";
            }
            else if(isNaN(product.width)){
                widthError = "Please, provide the data of indicated type";
            }
            if(product.length === null && productType === '2')
            {
                lengthError = "Please, submit required data";
            }
            else if(isNaN(product.length)){
                lengthError = "Please, provide the data of indicated type";
            }
            if(product.weight === null && productType === '3')
            {
                weightError = "Please, submit required data";
            }
            else if(isNaN(product.weight)){
                weightError = "Please, provide the data of indicated type";
            }       
            else if((product.size || product.height || product.weight) === null){
                emptyError = "Please fill in a type";
            }    
            if(skuError || nameError || priceError || sizeError || heightError || widthError || lengthError || weightError || emptyError){
                setState({skuError, nameError, priceError, sizeError, heightError, widthError, lengthError, weightError, emptyError});
                return false;
            }
            
            return true;          
    };

    const cadProduct = async e =>{       
        e.preventDefault();
        const isValid = validate();
        if(isValid){                        
            await fetch("https://jobphp.herokuapp.com/index.php",{ 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({product})         
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.erro){
                    setStatus({
                        type: 'erro',
                        message: responseJson.message
                    })
                 }else{
                    setStatus({
                        type: 'success',
                        message: responseJson.message
                    }) 
                 }
            }).catch(()=>{                
                navigate('/')
            })       
            setState(initialstate);               
        }
    }
    
    return (       
      <>
      <form id="product_form" onSubmit={cadProduct}>
      <header className="heade">
        <nav className="navbar bg-light">
            <div className="container cont">
                 <p className="navbar-brand product">Product ADD</p>
                    <div className="d-flex">
                        <button className="btn btn-outline-dark button" type="submit">Save</button>
                        <Link to="/"><button className="btn btn-danger" >Cancel</button></Link>
                    </div>
                </div>
                </nav>
                <div className="d-flex justify-content-center">
            <hr size="4" className="hr-weigh"/>
        </div>
        </header> 
        <div className='container all'>
            <div className=''>  
                              
                <div className="input-group-sm mb-1 d-flex text">
                    <p className=''>SKU</p>
                    <input id="sku" type="text" name="sku" onChange={inputValue}  className="form-control inputSku"  aria-describedby="inputGroup-sizing-sm"/>
                    <div className="serror">
                    {state.skuError}   
                    {status.type === 'erro'?<div className="serror">{status.message}</div> : ""} 
                    {status.type === 'success'?<div className="serror">{status.message}</div> : ""} 
                    </div>
                </div>
                <div className="input-group-sm mb-1 d-flex text">
                    <p className=''>Name</p>
                    <input id="name" type="text" name="name"  onChange={inputValue} className="form-control inputName"  aria-describedby="inputGroup-sizing-sm"/>
                    <div className="serror">{state.nameError}</div>
                    
                </div>
                <div className="input-group-sm mb-1 d-flex text">
                    <p className=''>Price($)</p>
                    <input id="price" type="text" name="price" onChange={inputValue} className="form-control inputPrice" aria-describedby="inputGroup-sizing-sm"/>
                    <div className="serror">{state.priceError}</div>
                    
                </div>
            </div>
            
            <br/><br/>              
            <div className='d-flex'>
                <p className='txtType'>Type Switcher</p>                
                <div className="input-group-sm mb-3">
                    <select 
                    value={productType} onChange={(e) => setType(e.target.value)}
                    className="form-select" id="productType"> 
                        <option name="type" value="0">Type Switcher</option>                 
                        <option name="dvd" value="1">DVD</option>
                        <option name="furniture" value="2">Furniture</option>
                        <option name="book" value="3">Book</option>
                    </select>
                 </div>
                 <div className="serror">{state.emptyError}</div>
            </div>
            <br/>
            <div id="ado" className='forms'>            
              {productFunc()}                
            </div>         
        </div>    
        </form>        
      </>
    );
  };

export default Body;