import './GuestsGroupItem.scss';
import { editGuestAsync, calculateMoneyAsync, calculateBreakAsync } from '../../store/guests/guestsActionCreaters';
import { useDispatch } from 'react-redux';
import { createValidTime } from '../../utils/utils';
import React from 'react';

function GuestsGroupItem(props) {
  const dispatch = useDispatch();
  const guest = props.guest;

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
    <li className={guest.stop_time ? 'guests__wrapper opacity' : 'guests__wrapper'}>
      <div className="guests__item guests__item--group item">
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
    </li>
  )
}

export default GuestsGroupItem;
