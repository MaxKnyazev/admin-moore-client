import './App.scss';
import { getAllGuestsAsync, addGuestAsync, editGuestAsync, calculateMoneyAsync, calculateBreakAsync } from '../../store/guests/guestsActionCreaters';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { createValidDate, createValidTime } from '../../utils/utils';
import React from 'react';

function App() {
  const dispatch = useDispatch();
  const { guests, currentGuest } = useSelector(state => state.guestsReducer);
  const guestsIsLoading = useSelector(state => state.guestsReducer.isLoading);
  const { user } = useSelector(state => state.authReducer);
  // const authIsLoading = useSelector(state => state.authReducer.isLoading);

  // useEffect(() => {
  //   dispatch(getAllGuestsAsync())
  // }, [dispatch])

  const [ guestName, setGuestName ] = useState('');
  const [ guestTariff, setGuestTariff ] = useState('1');
  // const [ currentGuest, setCurrentGuest ] = useState({});
  const [ showModal, setShowModal ] = useState(false);
  const [ modalCashInput, setModalCashInput ] = useState('');
  const [ modalNoncashInput, setModalNoncashInput ] = useState('');
  const [ cashboxCashInput, setCashboxCashInput ] = useState('');
  const [ cashboxCashComment, setCashboxCashComment ] = useState('');
  const [ cashboxNoncashInput, setCashboxNoncashInput ] = useState('');
  const [ cashboxNoncashComment, setCashboxNoncashComment ] = useState('');
  const [ searchInput, setSearchInput ] = useState('');
  
  const buttonHandler = () => {
    dispatch(getAllGuestsAsync())
  }

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  const formTariffHandler = e => {
    setGuestTariff(e.target.value);
  }

  const searchClearButtonHandler = () => {
    setSearchInput('');
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

  const calculateButtonHandler = async (guest) => {
    const stopDate = new Date();
    // setCurrentGuest(guest);
    dispatch(calculateMoneyAsync({
      stopTime: createValidTime(stopDate),
      id: guest.id,
    }))

    console.log(currentGuest)
    setShowModal(true);
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

    setCashboxNoncashInput('');
    setCashboxCashInput('');
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

    setCashboxNoncashInput('');
    setCashboxCashInput('');
    setShowModal(false);
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Admin Moore</h1>
      </header>
  
      <section className="guests">
        <button className="test__button" onClick={buttonHandler}>Reload guests</button>
        {
          guestsIsLoading && <span class="loader"></span>
        }

        <div className="guests__form form">
            <select defaultValue="1" onChange={formTariffHandler} className="form__tariff" name="tariff">
              <option value="1">Взрослый</option>
              <option value="2">Детский</option>
            </select>

          <input className="form__input" placeholder="Guest name..." type="text" value={guestName} onChange={e => inputHandler(e, setGuestName)} />
          <button className="form__button" onClick={formButtonHandler}>Add guest</button>
        </div>






        <div className="guests__form form">
          <input className="form__input" placeholder="Search..." type="text" value={searchInput} onChange={e => inputHandler(e, setSearchInput)} />
          <button className="form__button" onClick={searchClearButtonHandler}>Clear</button>
        </div>






        <ul className="guests__list">
          {guests.filter(guest => guest.name.includes(searchInput)).map(guest => {
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

                  {
                    guest.result_money
                    ? <span>Человек ушел...</span>
                    : <button className="item__button" onClick={() => {calculateButtonHandler(guest)}}>Рассчитать</button>
                  }
                </div>



                <div className="guests__item item--additional">
                  <span className="item__time">
                    time: {guest.minutes || '*'}
                  </span>

                  <span className="item__time">
                    money: {guest.for_payment || '*'}
                  </span>

                  <span className="item__time">
                    tariff: {guest.tariffs_id || '*'}
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
