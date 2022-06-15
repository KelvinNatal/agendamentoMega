import './style.css'
import Body from '../Body';

const FurnitureForm = (props) => {

      return (
      <>
      <div id='furniture'>
                <div className='input-group-sm mb-1'>
                  <div className='d-flex'>
                      <p className='textFurniture'>Height (CM)</p>
                      <input type='text' name="height" onChange={props.func} value={props.weight} className='form-control inputFurniture'  aria-label='size' aria-describedby='inputGroup-sizing-sm'/>
                      <div className="serror">{props.statH}</div>
                   </div>
                   <div className='d-flex'>
                      <p className='textFurniture'>Width (CM)</p>
                      <input type='text' name="width" onChange={props.func} value={props.width} className='form-control inputFurniture' id="middle" aria-label='size' aria-describedby='inputGroup-sizing-sm'/>
                      <div className="serror">{props.statW}</div>
                   </div>
                   <div className='d-flex'>
                      <p className='textFurniture'>Lenght (CM)</p>
                      <input type='text' name="lenght" onChange={props.func} value={props.lenght} className='form-control inputFurniture'  id="down" aria-label='size' aria-describedby='inputGroup-sizing-sm'/>
                      <div className="serror">{props.statL}</div>
                   </div>
                </div>
                <h6 className='textDescription'>Please provide dimensions in HxWxL format</h6>
        </div>
      </>
      
    );
  };

export default FurnitureForm;