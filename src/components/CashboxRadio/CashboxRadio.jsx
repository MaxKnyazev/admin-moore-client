import './CashboxRadio.scss';                        
import React from 'react';

function CashboxRadio({title, isActive, buttonHandler, inputType}) { 
  return (
    <button className={isActive ? 'cashboxRadio cashboxRadio--active' : 'cashboxRadio'} onClick={() => {buttonHandler(inputType)}}>
      <div className="cashboxRadio__title">{title}</div>
    </button>
  );
}

export default CashboxRadio;
