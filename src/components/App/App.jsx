import './App.scss';
import { getAllGuestsAsync, addGuestAsync, editGuestAsync, calculateMoneyAsync } from '../../store/guests/guestsActionCreaters';
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

  const guestButtonHandler = (id) => {
    const stopDate = new Date();
    dispatch(calculateMoneyAsync({
      stopTime: createValidTime(stopDate),
      // stopTime: "16:51:04",
      id
    }))
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
                <li className="guests__item item" key={guest.id}>
                  <span className="item__time">
                    {guest.start_time} - {guest.stop_time || '...'}
                  </span>

                  <span className="item__time">
                    time: {guest.minutes || '*'}
                  </span>

                  <span className="item__time">
                    money: {guest.for_payment || '*'}
                  </span>

                  <span className="item_name">{guest.name}</span>
                  <button className="item__button" onClick={() => {guestButtonHandler(guest.id)}}>Рассчитать</button>
                </li>



                <li className="guests__description" key={guest.id}>
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
