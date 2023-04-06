import './App.scss';
import { getAllGuestsAsync, addGuestAsync, editGuestAsync, calculateMoneyAsync, calculateBreakAsync } from '../../store/guests/guestsActionCreaters';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { createValidDate, createValidTime } from '../../utils/utils';
import React from 'react';

function App() {
  const dispatch = useDispatch();
  const { guests } = useSelector(state => state.guestsReducer);
  const guestsIsLoading = useSelector(state => state.guestsReducer.isLoading);
  const { user } = useSelector(state => state.authReducer);
  // const authIsLoading = useSelector(state => state.authReducer.isLoading);

  // useEffect(() => {
  //   dispatch(getAllGuestsAsync())
  // }, [dispatch])

  const [ guestName, setGuestName ] = useState('');
  const [ guestTariff, setGuestTariff ] = useState('1');
  const [ currentGuest, setCurrentGuest ] = useState({});
  const [ showModal, setShowModal ] = useState(true);
  const [ modalCashInput, setModalCashInput ] = useState(0);
  const [ modalNoncashInput, setModalNoncashInput ] = useState(0);

  const buttonHandler = () => {
    dispatch(getAllGuestsAsync())
    console.log(guests);
  }

  const formInputHandler = e => {
    setGuestName(e.target.value);
  }

  const formTariffHandler = e => {
    setGuestTariff(e.target.value);
  }

  const formButtonHandler = () => {
    if (guestName) {
      const startDate = new Date();
      dispatch(addGuestAsync({
        date: createValidDate(startDate),
        users_id: user.id,
        users_name: user.name,
        name: guestName,
        start_time: createValidTime(startDate),
        tariffs_id: guestTariff,
      }))
  
      setGuestName('');
    }
  }

  const calculateButtonHandler = (guest) => {
    const stopDate = new Date();
    dispatch(calculateMoneyAsync({
      stopTime: createValidTime(stopDate),
      id: guest.id,
    }))

    setShowModal(true);
    setCurrentGuest(guest);
  }

  const breakButtonHandler = (id, isBreak) => {
    if (isBreak) {
      const breakStopDate = new Date();
      dispatch(calculateBreakAsync({
        id,
        breakStopTime: createValidTime(breakStopDate)
      }))
    } else {
      const breakStartDate = new Date();
      dispatch(editGuestAsync({
        id, 
        options: {
          break_start_time: createValidTime(breakStartDate),
          is_break: true,
        }}
      ))
    }
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

    setShowModal(false);
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

    setShowModal(false);
  }

  const modalInputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Admin Moore</h1>
      </header>
  
      <section className="guests">
        <button className="test__button" onClick={buttonHandler}>Reload guests</button>
        {
          // guestsIsLoading && <span className="test__loader">Loading...</span>
          // guestsIsLoading && <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          guestsIsLoading && <span class="loader"></span>
        }

        <div className="guests__form form">
            <select defaultValue="1" onChange={formTariffHandler} className="form__tariff" name="tariff">
              <option value="1">Взрослый</option>
              <option value="2">Детский</option>
            </select>

          <input className="form__input" type="text" value={guestName} onChange={formInputHandler} />
          <button className="form__button" onClick={formButtonHandler}>Add guest</button>
        </div>

        <ul className="guests__list">
          {guests.sort((firstGuest, secondGuest) => {
            if (firstGuest.result_money == secondGuest.result_money) {
              if (firstGuest.start_time > secondGuest.start_time) {
                return 1;
              } else {
                return -1;
              }
            }

            if (firstGuest.result_money > secondGuest.result_money) {
              return 1;
            } else {
              return -1;
            }
          }).map(guest => {
            return (
              <li key={guest.id} className={guest.stop_time ? 'guests__wrapper opacity' : 'guests__wrapper'}>
                <div className="guests__item item">
                  {
                    guest.is_break 
                    ? <button className="item__button" onClick={() => {breakButtonHandler(guest.id, guest.is_break)}}>Продолжить</button>
                    : <button className="item__button" onClick={() => {breakButtonHandler(guest.id, guest.is_break)}}>Пауза</button> 
                  }

                  <span className="item_name">{guest.name}</span>
                  
                  <span className="item__time">
                    {guest.start_time} - {guest.stop_time || '...'}
                  </span>


                  <button className="item__button" onClick={() => {calculateButtonHandler(guest)}}>Рассчитать</button>
                </div>



                <div className="guests__item item--additional">
                  <span className="item__time">
                    time: {guest.minutes || '*'}
                  </span>

                  <span className="item__time">
                    money: {guest.for_payment || '*'}
                  </span>
                </div>


                
                <div className="guests__description">
                  <span>
                    {guest.payment_description || '*'}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="cashbox">
          
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
            <input type="number" className="paymentModal__input" value={modalCashInput} onChange={e => {modalInputHandler(e, setModalCashInput)}} />

            <label htmlFor="">Безналичные:</label>
            <input type="number" className="paymentModal__input" value={modalNoncashInput} onChange={e => {modalInputHandler(e, setModalNoncashInput)}} />


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
