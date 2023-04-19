import './App.scss';
import { editGuestAsync } from '../../store/guests/guestsActionCreaters';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';
import Header from '../Header';
import Guests from '../Guests';

function App() {
  const dispatch = useDispatch();
  const { currentGuest, showModal } = useSelector(state => state.guestsReducer);

  const [ modalCashInput, setModalCashInput ] = useState('');
  const [ modalNoncashInput, setModalNoncashInput ] = useState('');
  const [ cashboxCashInput, setCashboxCashInput ] = useState('');
  const [ cashboxCashComment, setCashboxCashComment ] = useState('');
  const [ cashboxNoncashInput, setCashboxNoncashInput ] = useState('');
  const [ cashboxNoncashComment, setCashboxNoncashComment ] = useState('');

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  const modalCancelButtonHandler = () => {
    dispatch(editGuestAsync({
      id: currentGuest.id, 
      options: {
        stop_time: null,
        minutes: null,
        for_payment: null,
        payment_description: null,
        cash: null,
        non_cash: null,
        result_money: null,
      }}
    ))

    setCashboxNoncashInput('');
    setCashboxCashInput('');
  }

  const modalPaymentButtonHandler = () => {
    dispatch(editGuestAsync({
      id: currentGuest.id, 
      options: {
        cash: +modalCashInput,
        non_cash: +modalNoncashInput,
        result_money: +modalCashInput + +modalNoncashInput,
      }}
    ))

    setCashboxNoncashInput('');
    setCashboxCashInput('');
  }

  return (
    <div className="App">
      <Header />

      <Guests />
      
      <section className="cashbox">
          <div className="cashbox__money">
            <label htmlFor="noncash">Безналичные:</label>
            <input className="cashbox__input" placeholder="Non-cash..." type="number" value={cashboxNoncashInput} onChange={e => inputHandler(e, setCashboxNoncashInput)} />

            <label htmlFor="cash">Комментарий:</label>
            <input className="cashbox__input" placeholder="Comment..." type="number" value={cashboxNoncashComment} onChange={e => inputHandler(e, setCashboxNoncashComment)} />

            <div className="cashbox__buttons">
              <button className="cashbox__button">Добавить</button>
              <button className="cashbox__button">Убрать</button>
            </div>
          </div>
          
          <div className="cashbox__display">
            18.000
          </div>
          
          <div className="cashbox__money">
            <label htmlFor="cash">Наличные:</label>
            <input className="cashbox__input" placeholder="Cash..." type="number" value={cashboxCashInput} onChange={e => inputHandler(e, setCashboxCashInput)} />

            <label htmlFor="cash">Комментарий:</label>
            <input className="cashbox__input" placeholder="Comment..." type="number" value={cashboxCashComment} onChange={e => inputHandler(e, setCashboxCashComment)} />

            <div className="cashbox__buttons">
              <button className="cashbox__button">Добавить</button>
              <button className="cashbox__button">Убрать</button>
            </div>
          </div>
      </section>

      {
        showModal &&
        <section className="paymentModal">
          <div className="paymentModal__wrapper">
            <div className="paymentModal__description">
              <span>Payment description: {currentGuest.payment_description}</span>
              <span>Tariff: {currentGuest.tariffs_id}</span>
              <span>Time: {currentGuest.start_time} - {currentGuest.stop_time}</span>
              <span>Minutes: {currentGuest.minutes}</span>
              <span>For payment: {currentGuest.for_payment}</span>
            </div>

            <label htmlFor="">Наличные:</label>
            <input type="number" placeholder="Cash..." className="paymentModal__input" value={modalCashInput} onChange={e => {inputHandler(e, setModalCashInput)}} />

            <label htmlFor="">Безналичные:</label>
            <input type="number" placeholder="Non-cash..." className="paymentModal__input" value={modalNoncashInput} onChange={e => {inputHandler(e, setModalNoncashInput)}} />


            <div className="paymentModal__buttons">
              <button className="paymentModal__button" onClick={modalCancelButtonHandler}>Отмена</button>
              <button className="paymentModal__button" onClick={modalPaymentButtonHandler}>Оплатить</button>
            </div>
          </div>
        </section>
      }
    </div>
  );
}

export default App;
