import './Guests.scss';
import { getAllGuestsAsync, editGuestAsync, calculateMoneyAsync, calculateBreakAsync } from '../../store/guests/guestsActionCreaters';
import { calculateResultMoneyAsync } from '../../store/shifts/shiftsActionCreaters';
import { useSelector, useDispatch } from 'react-redux';
import { createValidTime } from '../../utils/utils';
import React from 'react';
import GuestsLoader from '../GuestsLoader';
import GuestsAdd from '../GuestsAdd';
import GuestsSearch from '../GuestsSearch';

function Guests() {
  const dispatch = useDispatch();
  const { guests, searchInput } = useSelector(state => state.guestsReducer);
  const guestsIsLoading = useSelector(state => state.guestsReducer.isLoading);

  const buttonHandler = () => {
    dispatch(getAllGuestsAsync());
    dispatch(calculateResultMoneyAsync('ff8ce162-537a-4b9e-8e78-d0aac137fa18'));
  }


  const calculateButtonHandler = async (guest) => {
    const stopDate = new Date();
    dispatch(calculateMoneyAsync({
      stopTime: createValidTime(stopDate),
      id: guest.id,
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
    <section className="guests">
      <button className="test__button" onClick={buttonHandler}>Reload guests</button>
      {
        guestsIsLoading && <GuestsLoader />
      }

      <GuestsAdd />

      <GuestsSearch />

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
  )
}

export default Guests;
