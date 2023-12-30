import './Guests.scss';
import React from 'react';
import { getGuestsByShiftsIdAsync } from '../../store/guests/guestsActionCreaters';
import { calculateResultMoneyAsync } from '../../store/shifts/shiftsActionCreaters';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import GuestsLoader from '../GuestsLoader';
import GuestsPaymentModal from '../GuestsPaymentModal';
import GuestsAddGroupModal from '../GuestsAddGroupModal';
import GuestsAddGuestModal from '../GuestsAddGuestModal';
import GuestsPaymentGroupModal from '../GuestsPaymentGroupModal';
import GuestsList from '../GuestsList';
import GuestsNav from '../GuestsNav';

function Guests() {
  const dispatch = useDispatch();
  const { showPaymentModal, showAddGroupModal, showAddGuestModal, showPaymentGroupModal, isLoading } = useSelector(state => state.guestsReducer);
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
      {/* <button className="test__button" onClick={buttonHandler}>Reload guests</button> */}
      {
        isLoading && <GuestsLoader />
      }

      <GuestsNav />

      {/* <GuestsSearch /> */}
      <GuestsList />

      { showPaymentModal && <GuestsPaymentModal /> }
      { showAddGroupModal && <GuestsAddGroupModal /> }
      { showAddGuestModal && <GuestsAddGuestModal /> }
      { showPaymentGroupModal && <GuestsPaymentGroupModal /> }
    </section>
  )
}

export default Guests;
