import './GuestsCashboxShow.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
// import { createValidDate, createValidTime } from '../../utils/utils';
import { toggleShowCashboxModal } from '../../store/cashboxLogs/cashboxLogsActionCreaters';

function GuestsCashboxShow() {
  const dispatch = useDispatch();
  // const { user } = useSelector(state => state.authReducer);
  // const { currentShift } = useSelector(state => state.shiftsReducer);

  const buttonCashboxShow = () => {
    dispatch(toggleShowCashboxModal());
  }

  return (
    <button className="addGuest__button" onClick={buttonCashboxShow}>Касса</button>
  )
}

export default GuestsCashboxShow;
