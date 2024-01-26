import './InputNumber.scss';                        
import { useRef, useState } from 'react';

function InputNumber({ inputNumber, setInputNumber }) {
  const inputRef = useRef(null);

  const wrapperClickHandler = () => {
    inputRef.current.focus()
  }

  const buttonPlusHandler = (value) => {
    setInputNumber(`${+inputNumber + value}`)
  }

  const buttonMinusHandler = (value) => {
    if (+inputNumber - value >= 0) {
      setInputNumber(`${+inputNumber - value}`)
    } else {
      setInputNumber('0');
    }
  }

  const inputNumberHandler = (e) => {
    const currentSymbol = e.target.value.split('')[e.target.value.length-1];
    console.log(e.target.value)
    if (!isNaN(+e.target.value) && (currentSymbol !== ' ')) {
      setInputNumber(`${+e.target.value}`);
    }
  }

  return (
    <div onClick={wrapperClickHandler} className="inputNumber">
      <button className="inputNumber__button" onClick={() => {buttonMinusHandler(1)}}>-1</button>
      <button className="inputNumber__button" onClick={() => {buttonMinusHandler(100)}}>-100</button>
      <input className="inputNumber__input" ref={inputRef} type="text" value={inputNumber} onChange={inputNumberHandler} />
      <button className="inputNumber__button" onClick={() => {buttonPlusHandler(1)}}>+1</button>
      <button className="inputNumber__button" onClick={() => {buttonPlusHandler(100)}}>+100</button>
    </div>
  );
}

export default InputNumber;
