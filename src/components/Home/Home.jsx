import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editGuestAsync } from '../../store/guests/guestsActionCreaters';
import Header from '../Header';
import Guests from '../Guests';
import Cashbox from '../Cashbox';
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { currentGuest, showModal } = useSelector(state => state.guestsReducer);

  const [ modalCashInput, setModalCashInput ] = useState('');
  const [ modalNoncashInput, setModalNoncashInput ] = useState('');

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
    
  }

  return (
    <div className="App">
      {/* <Header /> */}

      <Guests />
      
      <Cashbox />

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

export default Home;


