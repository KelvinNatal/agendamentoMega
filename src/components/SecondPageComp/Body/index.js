import './style.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link} from "react-router-dom";
import DForm from '../DForm/index';
import FurnitureForm from '../FurnitureForm/index';
import BookForm from '../BookForm';

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
        weigthError: '',
        emptyError: ''
    }

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [state, setState] = useState({
        state: initialstate
    });

    const [productType, setType] = useState([]);

    const [product, setProduct] = useState({
        sku: '',
        name: '',
        price: 0,
        size: 0,
        height: 0,
        width: 0,
        length: 0,
        weigth: 0,
        
    });

    const productFunc = () => {

        while(productType === '0'){
            return '';
        }

        while(productType === '1'){
            product.width = 0;
            product.height = 0;
            product.length = 0;
            product.weigth = 0;
            return <DForm      
                        func = {inputValue}
                        stat = {state.sizeError}
                    />;
        }

        while(productType === '2'){
            product.size = 0;
            product.weigth = 0;
            return <FurnitureForm
                        func = {inputValue}
                        statH = {state.heightError}
                        statW = {state.widthError}
                        statL = {state.lengthError}
                    />;
        }

        while(productType === '3'){
            product.width = 0;
            product.height = 0;
            product.length = 0;
            product.size = 0;
            return <BookForm
                    func = {inputValue}
                    statW = {state.weigthError}
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
            let weigthError= '';
            let emptyError= '';
            
            if(product.sku === '')
            {
                skuError = "Please, submit required data";
            }
            if(product.name === '')
            {
                nameError = "Please, submit required data";
            }
            if(product.price === 0)
            {
                priceError = "Please, submit required data";
                
            }else if(isNaN(product.price)){
                priceError = "Please, provide the data of indicated type";
            }
            if(product.size === 0 && productType === '1')
            {
                sizeError = "Please, submit required data";
            }
            else if(isNaN(product.size)){
                sizeError = "Please, provide the data of indicated type";
            }
            if(product.height === 0 && productType === '2')
            {
                heightError = "Please, submit required data";
            }
            else if(isNaN(product.height)){
                heightError = "Please, provide the data of indicated type";
            }
            if(product.width === 0 && productType === '2')
            {
                widthError = "Please, submit required data";
            }
            else if(isNaN(product.width)){
                widthError = "Please, provide the data of indicated type";
            }
            if(product.lenght === 0 && productType === '2')
            {
                lengthError = "Please, submit required data";
            }
            else if(isNaN(product.length)){
                lengthError = "Please, provide the data of indicated type";
            }
            if(product.weigth === 0 && productType === '3')
            {
                weigthError = "Please, submit required data";
            }
            else if(isNaN(product.weigth)){
                weigthError = "Please, provide the data of indicated type";
            }       
            else if((product.size || product.height || product.weigth) === 0){
                emptyError = "Please select a type";
            }    
            if(skuError || nameError || priceError || sizeError || heightError || widthError || lengthError || weigthError || emptyError){
                setState({skuError, nameError, priceError, sizeError, heightError, widthError, lengthError, weigthError, emptyError});
                return false;
            }
            
            return true;          
    };

    const cadProduct = async e =>{       
        e.preventDefault();
        const isValid = validate();
        if(isValid){                        
            await fetch("http://localhost/apiphp/index.php",{ 
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
        <nav class="navbar bg-light">
            <div class="container cont">
                 <p class="navbar-brand product"><h3>Product ADD</h3></p>
                    <div class="d-flex">
                        <button class="btn btn-outline-dark button" type="submit" name="btnRegister" id="test">Save</button>
                        <Link to="/"><button class="btn btn-danger" >Cancel</button></Link>
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
                    <input id="name" type="text" name="name"  onChange={inputValue} class="form-control inputName"  aria-describedby="inputGroup-sizing-sm"/>
                    <div className="serror">{state.nameError}</div>
                    
                </div>
                <div className="input-group-sm mb-1 d-flex text">
                    <p className=''>Price($)</p>
                    <input id="price" type="text" name="price" onChange={inputValue} class="form-control inputPrice" aria-describedby="inputGroup-sizing-sm"/>
                    <div className="serror">{state.priceError}</div>
                    
                </div>
            </div>
            
            <br/><br/>              
            <div className='d-flex'>
                <p className='txtType'>Type Switcher</p>                
                <div class="input-group-sm mb-3">
                    <select 
                    onClick={productFunc}
                    value={productType} onChange={(e) => setType(e.target.value)}
                    class="form-select" id="productType"> 
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