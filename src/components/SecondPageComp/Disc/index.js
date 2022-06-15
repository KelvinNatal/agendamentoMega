import './style.css'


const DForm = (props) => {

    return (
      <>
      <body>
      <div id='dvd'>
              <div className='input-group-sm mb-1 d-flex'>
                 <p className='textDVD'>Size (MB)</p>
                 <input id="size" type='text' class='form-control inputDVD' name="size" onChange={props.func} value={props.size} aria-label='size' aria-describedby='inputGroup-sizing-sm'/>
                 <div className="serror">{props.stat}</div>
              </div>
           <h6 className='textDescription'>Please provide the size only in Megabytes(MB)</h6>
      </div>
      </body>
      </>      
    );
  };

export default DForm;