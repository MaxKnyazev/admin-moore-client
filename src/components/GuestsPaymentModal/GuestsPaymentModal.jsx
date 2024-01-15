import './GuestsPaymentModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editGuestAsync, setCurrentGroupAsync, notShowPaymentModal} from '../../store/guests/guestsActionCreaters';

function GuestsPaymentModal() {
  const dispatch = useDispatch();
  const [ modalCashInput, setModalCashInput ] = useState('');
  const [ modalNoncashInput, setModalNoncashInput ] = useState('');
  const { currentGuest } = useSelector(state => state.guestsReducer);

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  const modalCancelButtonHandler = () => {
    dispatch(notShowPaymentModal({
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
    ));

    setModalCashInput('');
    setModalNoncashInput('');
  }

  const modalPaymentButtonHandler = () => {
    dispatch(editGuestAsync({
      id: currentGuest.id, 
      options: {

//************************************************ */
        stop_time: currentGuest.stop_time,
        minutes: currentGuest.minutes,
        for_payment: currentGuest.for_payment,
        payment_description: currentGuest.payment_description,
//************************************************ */

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
        <h2 className="paymentModal__title">Рассчитать гостя</h2>

        <div className="paymentModal__description">
          <span>Время: <b>{currentGuest.start_time} - {currentGuest.stop_time}</b></span>
          <span>Количество минут: <b>{currentGuest.minutes}</b></span>
          <span>Тариф: <b>{currentGuest.tariffs_id}</b></span>
          <span>К оплате: <b>{currentGuest.for_payment}</b></span>
        </div>

        <div className="paymentModal__calculation">
          <div className="paymentModal__box">
            <label htmlFor="paymentCash">Наличные:</label>
            <input
              id="paymentCash" 
              type="number" 
              placeholder="Cash..." 
              className="paymentModal__input" 
              value={modalCashInput} 
              onChange={e => {inputHandler(e, setModalCashInput)}} 
            />
          </div>

          <div className="paymentModal__box">
            <label htmlFor="paymentNoncash">Безналичные:</label>
            <input
              id="paymentNoncash"
              type="number" 
              placeholder="Non-cash..." 
              className="paymentModal__input" 
              value={modalNoncashInput} 
              onChange={e => {inputHandler(e, setModalNoncashInput)}} 
            />
          </div>
        </div>

        <div className="paymentModal__buttons">
          <button className="paymentModal__button paymentModal__button--cancel" onClick={modalCancelButtonHandler}>Отмена X</button>
          <button className="paymentModal__button paymentModal__button--accept" onClick={modalPaymentButtonHandler}>Оплатить ✔</button>
        </div>
      </div>
    </section>
  )
}

export default GuestsPaymentModal;
