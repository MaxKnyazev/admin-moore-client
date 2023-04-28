import "./Cashbox.scss";
import { editGuestAsync } from '../../store/guests/guestsActionCreaters';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';

function Cashbox() {
  const dispatch = useDispatch();

  const [ cashboxCashInput, setCashboxCashInput ] = useState('');
  const [ cashboxCashComment, setCashboxCashComment ] = useState('');
  const [ cashboxNoncashInput, setCashboxNoncashInput ] = useState('');
  const [ cashboxNoncashComment, setCashboxNoncashComment ] = useState('');

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  };

  return (
    <section className="cashbox">
      <div className="cashbox__money">
        <label htmlFor="noncash">Сумма:</label>
        <input
          className="cashbox__input"
          placeholder="0"
          type="number"
          value={cashboxNoncashInput}
          onChange={(e) => inputHandler(e, setCashboxNoncashInput)}
        />

        <label htmlFor="cash">Комментарий:</label>
        <input
          className="cashbox__input"
          placeholder="Comment..."
          type="text"
          value={cashboxNoncashComment}
          onChange={(e) => inputHandler(e, setCashboxNoncashComment)}
        />

        <fieldset className="cashbox__fieldset fieldset">
          <div className="fieldset__radio">
            <input className="fieldset__input" type="radio" id="cash" name="cashbox" onChange={() => {}}/>
            <label className="fieldset__label" htmlFor="cash">Наличные</label>
          </div>

          <div className="fieldset__radio"> 
            <input className="fieldset__input" type="radio" id="nonCash" name="cashbox" onChange={() => {}} />
            <label className="fieldset__label" htmlFor="nonCash">Безналичные</label>
          </div>
        </fieldset>

        <div className="cashbox__buttons">
          <button className="cashbox__button">Приход</button>
          <button className="cashbox__button">Расход</button>
        </div>
      </div>

      {
        null
      //  <div className="cashbox__display">18.000</div>
      }
    </section>
  );
}

export default Cashbox;
