import './GuestsItem.scss';
import { editGuestAsync, calculateMoneyAsync, calculateBreakAsync } from '../../store/guests/guestsActionCreaters';
import { useDispatch } from 'react-redux';
import { createValidTime } from '../../utils/utils';
import React from 'react';

function GuestsItem({guest}) {
  const dispatch = useDispatch();

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

  const deleteButtonHandler = (id) => {
    dispatch(calculateBreakAsync({
    }))
  }

  return (
    <li className={guest.stop_time ? 'guests__wrapper opacity' : 'guests__wrapper'}>
      <div className="guests__item item">
        
        <span className="item__time">
        {
          guest.is_break 
          ? <button className="item__button item__button--blue" onClick={() => {breakButtonHandler(guest.id, guest.is_break)}}>П</button>
          : <button className="item__button item__button--blue" onClick={() => {breakButtonHandler(guest.id, guest.is_break)}}>П</button> 
        }

          {guest.start_time} - {guest.stop_time || '...'}
        </span>

        <span className="item__name">{guest.name}</span>
        {
          guest.result_money
          ? <div className="guests__buttons">
              <button className="item__button item__button--yellow" onClick={() => {calculateButtonHandler(guest)}}>К</button>
              <button className="item__button item__button--red" onClick={() => {calculateButtonHandler(guest)}}>У</button>
              <button className="item__button item__button--blue" onClick={() => {calculateButtonHandler(guest)}}>Р</button>
            </div>
          : <div className="guests__buttons">
              <button className="item__button item__button--yellow" onClick={() => {calculateButtonHandler(guest)}}>К</button>
              <button className="item__button item__button--green" onClick={() => {calculateButtonHandler(guest)}}>П</button>
              <button className="item__button item__button--red" onClick={() => {deleteButtonHandler(guest)}}>У</button>
              <button className="item__button item__button--blue" onClick={() => {calculateButtonHandler(guest)}}>Р</button>
            </div>
        }
      </div>
    </li>
  )
}

export default GuestsItem;
