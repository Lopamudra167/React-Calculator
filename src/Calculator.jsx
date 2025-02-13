import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const Calculator = () =>{
    const [input,setInput] = useState('');
    const [output,setOutput] = useState('');

    const buttons = [['7','8','9','+'],
                    ['4','5','6','-'],
                    ['1','2','3','*'],
                    ['C','0','=','/']
                                        ];

    const handleButtonClick = (value) => {
        if (value === 'C') {
            setInput('');
            setOutput('');
        } else if (value === '=') {
            handleEvaluate();
        } else {
            setInput((prevInput) => prevInput + value);
        }
    };

    const handleEvaluate = () => {
        if (!input || /[+\-*/]$/.test(input)) {  
            setOutput("Error");
            return;
        }

        try {
            // Check for 0/0 case before eval
            if (input === "0/0") {
                setOutput("NaN");
                return;
            }

            // Evaluate safely
            const result = eval(input);
            if (!isFinite(result)) {
                setOutput("Infinity");
            } else {
                setOutput(result.toString());
            }
        } catch (error) {
            setOutput(`Error;${error}`);
        }
    };


    return(
        <>
      <div className="container d-flex flex-column justify-content-center align-items-center pt-5 fw-bold" style={{ fontFamily: 'serif' }}>
    <div className="text-center">
        <h5 className="display-4">React Calculator</h5>
    </div>
    <div className="mt-4">
        <input type="text" className="form-control border border-dark border-1 fs-4" style={{width:"300px"}} value={input} />
    </div>
    <div className='mb-2 mt-4 fs-2 text-secondary'>
        {output}
    </div>
    {buttons.map((row, rowIndex) => (
            <div className="row m-2" key={rowIndex}>
              {row.map((button, colIndex) => (
                <div className="col-3 gap-2" key={colIndex}>
                  <button
                    className={`btn   btn-light btn-lg fw-bold px-4 py-3  btn-outline-secondary  w-100 ${button === 'C' ? 'btn' : button === '=' ? 'btn' : 'btn'}`}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button}
                  </button>
                </div>
              ))}
            </div>
          ))}
    </div>
        </>
    );
}
export default Calculator;