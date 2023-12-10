import './GuestsGroupItem.scss';
import { toggleShowPaymentGroupModal, setCurrentGroupAsync, editGuestAsync, calculateMoneyAsync, calculateBreakAsync } from '../../store/guests/guestsActionCreaters';
import { useDispatch } from 'react-redux';
import { createValidTime } from '../../utils/utils';
// import { createValidTime } from '../../utils/utils';
import React from 'react';

function GuestsGroupItem({group}) {
  const dispatch = useDispatch();

  const groupButtonHandler = async () => {
    dispatch(setCurrentGroupAsync(group.group_id));
    dispatch(toggleShowPaymentGroupModal());
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
    <li className={group.stop_time ? 'guests__wrapper opacity' : 'guests__wrapper'}>
      <div className="guests__item item">

        <span className="item__time">
        {
          group.is_break 
          ? <button className="item__button item__button--blue" onClick={() => {breakButtonHandler(group.id, group.is_break)}}>П</button>
          : <button className="item__button item__button--blue" onClick={() => {breakButtonHandler(group.id, group.is_break)}}>П</button> 
        }

          {group.start_time} - {group.stop_time || '...'}
        </span>

        <span className="item__name">Группа: {group.name}</span>

        {
          group.result_money
          ? <div className="guests__buttons">
              <button className="item__button item__button--yellow" onClick={() => {calculateButtonHandler(group)}}>К</button>
              <button className="item__button item__button--red" onClick={() => {calculateButtonHandler(group)}}>У</button>
              <button className="item__button item__button--blue" onClick={() => {calculateButtonHandler(group)}}>Р</button>
            </div>
          : <div className="guests__buttons">
              <button className="item__button item__button--yellow" onClick={() => {calculateButtonHandler(group)}}>К</button>
              <button className="item__button item__button--green" onClick={() => {calculateButtonHandler(group)}}>П</button>
              <button className="item__button item__button--red" onClick={() => {calculateButtonHandler(group)}}>У</button>
              <button className="item__button item__button--blue" onClick={() => {calculateButtonHandler(group)}}>Р</button>
            </div>
        }
      </div>
    </li>
  )
}

export default GuestsGroupItem;
