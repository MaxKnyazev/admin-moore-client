import './CashboxModal.scss';
import { addCashboxLogAsync } from '../../store/cashboxLogs/cashboxLogsActionCreaters';
import { createValidDate, createValidTime } from '../../utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';

function CashboxModal() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer);
  const { currentShift } = useSelector(state => state.shiftsReducer);

  const [ cashboxMoneyInput, setCashboxMoneyInput ] = useState('');
  const [ cashboxCommentInput, setCashboxCommentInput ] = useState('');
  const [ moneyType, setMoneyType ] = useState('cash');

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  };

  const cashboxButtonHandler = (operationType) => {
    const options = {
      input_cash: operationType === 'add' && moneyType === 'cash' ? +cashboxMoneyInput : null,
      output_cash: operationType === 'remove' && moneyType === 'cash' ? +cashboxMoneyInput : null,
      input_non_cash: operationType === 'add' && moneyType === 'nonCash' ? +cashboxMoneyInput : null,
      output_non_cash: operationType === 'remove' && moneyType === 'nonCash' ? +cashboxMoneyInput : null,
    }

    const date = new Date();

    dispatch(addCashboxLogAsync({
      ...options,
      users_id: user.id,
      users_name: user.name,
      description: cashboxCommentInput,
      time: createValidTime(date),
      shifts_id: currentShift.id,
    }))
    setCashboxCommentInput('');
    setCashboxMoneyInput('');
  }

  const cashboxRadioButtonHandler = (moneyTypeFromInput) => {
    setMoneyType(moneyTypeFromInput);
  }

  return (
    <section className="cashbox">
      <div className="cashbox__wrapper">
        <div className="cashbox__money">
          <label htmlFor="noncash">Сумма:</label>
          <input
            className="cashbox__input"
            placeholder="0"
            type="number"
            value={cashboxMoneyInput}
            onChange={(e) => inputHandler(e, setCashboxMoneyInput)}
          />
    
          <label htmlFor="cash">Комментарий:</label>
          <input
            className="cashbox__input"
            placeholder="Comment..."
            type="text"
            value={cashboxCommentInput}
            onChange={(e) => inputHandler(e, setCashboxCommentInput)}
          />
    
          <fieldset className="cashbox__fieldset fieldset">
            <div className="fieldset__radio">
              <input className="fieldset__input" checked={moneyType === 'cash'} type="radio" id="cash" name="cashbox" onChange={() => {cashboxRadioButtonHandler('cash')}}/>
              <label className="fieldset__label" htmlFor="cash">Наличные</label>
            </div>
    
            <div className="fieldset__radio"> 
              <input className="fieldset__input" checked={moneyType === 'nonCash'} type="radio" id="nonCash" name="cashbox" onChange={() => {cashboxRadioButtonHandler('nonCash')}} />
              <label className="fieldset__label" htmlFor="nonCash">Безналичные</label>
            </div>
          </fieldset>
    
          <div className="cashbox__buttons">
            <button className="cashbox__button" onClick={() => { cashboxButtonHandler('add') }}>Приход</button>
            <button className="cashbox__button" onClick={() => { cashboxButtonHandler('remove') }}>Расход</button>
          </div>
        </div>
    
        {
          null
        //  <div className="cashbox__display">18.000</div>
        }
      </div>
    </section>
  );
}

export default CashboxModal;
