import './GuestsPaymentGroupModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editGuestAsync, toggleShowPaymentGroupModal } from '../../store/guests/guestsActionCreaters';
import GroupModalList from '../GroupModalList';

function GuestsPaymentGroupModal() {
  const dispatch = useDispatch();
  // const { currentGroup } = useSelector(state => state.guestsReducer);

  const modalCancelButtonHandler = () => {
    dispatch(toggleShowPaymentGroupModal())
  }

  const modalPaymentButtonHandler = () => {


  }

  return (
    <section className="paymentGroupModal">
      <div className="paymentGroupModal__wrapper">
        <GroupModalList />

        <div className="paymentGroupModal__buttons">
          <button className="paymentGroupModal__button" onClick={modalCancelButtonHandler}>Отмена</button>
          <button className="paymentGroupModal__button" onClick={modalPaymentButtonHandler}>Оплатить</button>
        </div>
      </div>
    </section>
  )
}

export default GuestsPaymentGroupModal;
