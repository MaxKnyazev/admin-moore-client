import './GuestsPaymentModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editGuestAsync, setCurrentGroupAsync } from '../../store/guests/guestsActionCreaters';

function GuestsPaymentModal() {
  const dispatch = useDispatch();
  const [ modalCashInput, setModalCashInput ] = useState('');
  const [ modalNoncashInput, setModalNoncashInput ] = useState('');
  const { currentGuest } = useSelector(state => state.guestsReducer);

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  const modalCancelButtonHandler = () => {
//*************************************************************************** 2023-06-07 */
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
//*************************************************************************** 2023-06-07 */

    setModalCashInput('');
    setModalNoncashInput('');
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

    if (currentGuest.group_id) {
      dispatch(setCurrentGroupAsync(currentGuest.group_id));
    }

    setModalCashInput('');
    setModalNoncashInput('');
  }

  return (
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
        <input 
          type="number" 
          placeholder="Cash..." 
          className="paymentModal__input" 
          value={modalCashInput} 
          onChange={e => {inputHandler(e, setModalCashInput)}} 
        />

        <label htmlFor="">Безналичные:</label>
        <input 
          type="number" 
          placeholder="Non-cash..." 
          className="paymentModal__input" 
          value={modalNoncashInput} 
          onChange={e => {inputHandler(e, setModalNoncashInput)}} 
        />

        <div className="paymentModal__buttons">
          <button className="paymentModal__button" onClick={modalCancelButtonHandler}>Отмена</button>
          <button className="paymentModal__button" onClick={modalPaymentButtonHandler}>Оплатить</button>
        </div>
      </div>
    </section>
  )
}

export default GuestsPaymentModal;
