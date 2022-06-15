import './style.css';


const BookForm = (props) => {

      return (
      <>
      <div id='book'>
            <div className='input-group-sm mb-1 d-flex'>
                <p className='textBook'>Weight (KG)</p>
                <input id="weigth" type='text' name="weigth" onChange={props.func} value={props.weigth} class='form-control inputDVD' aria-label='size' aria-describedby='inputGroup-sizing-sm'/>
                <div className="serror">{props.statW}</div>
            </div>
            <h6 className='textDescription'>Please provide ther weight only in kilograms</h6>
         </div>
      </>
      
    );
  };

export default BookForm;