import './Guests.scss';
import React from 'react';
import { getGuestsByShiftsIdAsync } from '../../store/guests/guestsActionCreaters';
import { calculateResultMoneyAsync } from '../../store/shifts/shiftsActionCreaters';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import GuestsLoader from '../GuestsLoader';
import GuestsAdd from '../GuestsAdd';
import GuestsSearch from '../GuestsSearch';
import GuestsPaymentModal from '../GuestsPaymentModal';
import GuestsAddGroupModal from '../GuestsAddGroupModal';
import GuestsList from '../GuestsList';

function Guests() {
  const dispatch = useDispatch();
  const { showPaymentModal, showAddGroupModal, isLoading } = useSelector(state => state.guestsReducer);
  const { currentShift } = useSelector(state => state.shiftsReducer);


// *********************************************************** 2023-05-12
const preloadData = useCallback(async () => {
  dispatch(getGuestsByShiftsIdAsync(currentShift.id));
  dispatch(calculateResultMoneyAsync(currentShift.id));
}, [dispatch, currentShift.id])

useEffect(() => {
  preloadData()
    .catch(console.error);;
}, [preloadData])
// *********************************************************** 2023-05-12

  const buttonHandler = () => {
    dispatch(getGuestsByShiftsIdAsync(currentShift.id));
    dispatch(calculateResultMoneyAsync(currentShift.id));
  }

  return (
    <section className="guests">
      <button className="test__button" onClick={buttonHandler}>Reload guests</button>
      {
        isLoading && <GuestsLoader />
      }

      <GuestsAdd />

      <GuestsSearch />

      <GuestsList />

      { showPaymentModal && <GuestsPaymentModal /> }
      { showAddGroupModal && <GuestsAddGroupModal /> }
    </section>
  )
}

export default Guests;
