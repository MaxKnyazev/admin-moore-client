import './GuestsAddGroup.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
// import { createValidDate, createValidTime } from '../../utils/utils';
import { addGuestAsync, toggleShowAddGroupModal } from '../../store/guests/guestsActionCreaters';

function GuestsAddGroup() {
  const dispatch = useDispatch();
  // const { user } = useSelector(state => state.authReducer);
  // const { currentShift } = useSelector(state => state.shiftsReducer);

  const buttonShowGroupModalHandler = () => {
    dispatch(toggleShowAddGroupModal());
  }

  return (
    <button className="addGuest__button" onClick={buttonShowGroupModalHandler}>Добавить группу</button>
  )
}

export default GuestsAddGroup;
