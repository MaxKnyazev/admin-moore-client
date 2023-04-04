import './App.scss';
import { getAllGuestsAsync, addGuestAsync, editGuestAsync, calculateMoneyAsync, calculateBreakAsync } from '../../store/guests/guestsActionCreaters';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { createValidDate, createValidTime } from '../../utils/utils';

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

  const buttonHandler = () => {
    dispatch(getAllGuestsAsync())
    console.log(guests);
  }

  const formInputHandler = e => {
    setGuestName(e.target.value);
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
      }))
  
      setGuestName('');
    }
  }

  const calculateButtonHandler = (id) => {
    const stopDate = new Date();
    dispatch(calculateMoneyAsync({
      stopTime: createValidTime(stopDate),
      id
    }))
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
          <input className="form__input" type="text" value={guestName} onChange={formInputHandler} />
          <button className="form__button" onClick={formButtonHandler}>Add guest</button>
        </div>

        <ul className="guests__list">
          {guests.map(guest => {
            return (
              <>
                <li className="guests__item item" key={`${guest.id}2`}>
                  {
                    guest.is_break 
                    ? <button className="item__button" onClick={() => {breakButtonHandler(guest.id, guest.is_break)}}>Продолжить</button>
                    : <button className="item__button" onClick={() => {breakButtonHandler(guest.id, guest.is_break)}}>Пауза</button> 
                  }
                  
                  <span className="item__time">
                    {guest.start_time} - {guest.stop_time || '...'}
                  </span>

                  <span className="item_name">{guest.name}</span>

                  <button className="item__button" onClick={() => {calculateButtonHandler(guest.id)}}>Рассчитать</button>
                </li>



                <li className="guests__description" key={guest.id}>
                  <span className="item__time">
                    time: {guest.minutes || '*'}
                  </span>

                  <span className="item__time">
                    money: {guest.for_payment || '*'}
                  </span>

                  <span>
                    description: {guest.payment_description || '*'}
                  </span>
                </li>
              </>
            )
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
