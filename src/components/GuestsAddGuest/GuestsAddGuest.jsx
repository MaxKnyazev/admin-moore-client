import './GuestsAddGuest.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
// import { createValidDate, createValidTime } from '../../utils/utils';
// import { addGuestAsync, toggleShowAddGroupModal } from '../../store/guests/guestsActionCreaters';

function GuestsAddGuest() {
  const dispatch = useDispatch();
  // const { user } = useSelector(state => state.authReducer);
  // const { currentShift } = useSelector(state => state.shiftsReducer);

  const buttonAddGuestHandler = () => {
    
  }

  // const buttonAddGroupHandler = () => {
  //   dispatch(toggleShowAddGroupModal());
  // }

  return (
    <button className="addGuest__button" onClick={buttonAddGuestHandler}>Добавить гостя</button>
  )
}

export default GuestsAddGuest;
