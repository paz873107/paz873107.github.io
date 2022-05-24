import './App.css';
import React, {useState} from 'react';

function App() {

  const [number, setNumber] = useState("");
  const [shoeType, setShoeType] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");
  const [result, setResult] = useState(0);
  const deleteNumber = () => {
    if (currentOperation === "") {
      setShoeType(shoeType.toString().slice(0,-3));
    } else {
      setNumber(number.toString().slice(0, -1));
    }
  };

  function clickShoe(val){
    if (currentOperation === ""){
      setShoeType(val);  
    }  
  }
  
  function clickOperator (val){
    setCurrentOperation(val);
  }
  
  function clickNumber(val){
    setNumber(number+val);
  }

  function getResult(){
    switch (currentOperation){
      case "+":
        setResult (Number(shoeType)+Number(number))
        break;
      case "-":
        setResult (Number(shoeType)-Number(number))
        break;
      case "*":
        setResult (Number(shoeType)*Number(number))
        break;
      case "/":
        setResult (Number(shoeType)/Number(number))
        break;
    }
  }


  function allClear(){
    setNumber("");
    setShoeType("");
    setCurrentOperation("");
    setResult("");
  }

  return (
    <div className="App">
      <h1 className='title'>Shoe calculator</h1>
      <h2 className='subtitle'>Calzados Limani by Paz C.</h2>
      <div className= "main-grid">
        <div className= "calculator-grid">
          <div className= "output-area">
            <div className= "previous-operand">{currentOperation ? shoeType + currentOperation : ""}</div>
            <div className= "current-operand">{result ? result : (!currentOperation ? shoeType : (number || shoeType))}</div>
          </div>
          <button onClick={()=>{clickShoe(90)}} className= "Abiel"></button>
          <button onClick={()=>{clickShoe(100)}} className= "Hary"></button>
          <button onClick={()=>{clickShoe(80)}} className= "Lara"></button>
          <button onClick={()=>{clickShoe(80)}} className= "Lulu"></button>
          <button onClick={()=>{clickShoe(80)}} className= "Maldivas"></button>
          <button onClick={()=>{clickShoe(100)}} className= "Muna"></button>
          <button onClick={allClear}className="span-two">AC</button>
          <button onClick={deleteNumber}>DEL</button>
          <button onClick={()=>{clickOperator("/")}}>/</button>
          <button onClick={()=>{clickShoe(120)}} className= "Rey"></button>
          <button onClick={()=>{clickNumber(7)}}>7</button>
          <button onClick={()=>{clickNumber(8)}}>8</button>
          <button onClick={()=>{clickNumber(9)}}>9</button>
          <button onClick={()=>{clickOperator("*")}}>*</button>
          <button onClick={()=>{clickShoe(70)}} className= "Sorreto"></button>
          <button onClick={()=>{clickNumber(4)}}>4</button>
          <button onClick={()=>{clickNumber(5)}}>5</button>
          <button onClick={()=>{clickNumber(6)}}>6</button>
          <button onClick={()=>{clickOperator("+")}}>+</button>
          <button onClick={()=>{clickShoe(100)}} className= "Xuxa"></button>
          <button onClick={()=>{clickNumber(3)}}>3</button>
          <button onClick={()=>{clickNumber(2)}}>2</button>
          <button onClick={()=>{clickNumber(1)}}>1</button>
          <button onClick={()=>{clickOperator("-")}}>-</button>
          <button onClick={()=>{{clickNumber(".")}}}className="span-two">.</button>
          <button onClick={()=>{{clickNumber(0)}}}>0</button>
          <button onClick={getResult} className="span-two">=</button>
        </div>
        <div className= "shoe-grid">
          
          
          
          
         
          
          
          
          
        </div> 
      </div>
    </div>
  );
}

export default App;
