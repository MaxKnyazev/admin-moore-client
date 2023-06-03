import './GuestsGroupItem.scss';
import { toggleShowPaymentGroupModal, setCurrentGroupAsync } from '../../store/guests/guestsActionCreaters';
import { useDispatch } from 'react-redux';
// import { createValidTime } from '../../utils/utils';
import React from 'react';

function GuestsGroupItem({group}) {
  const dispatch = useDispatch();

  const groupButtonHandler = async () => {
    dispatch(setCurrentGroupAsync(group.group_id));
    dispatch(toggleShowPaymentGroupModal());
  }

  return (
    <li className={group.stop_time ? 'guests__wrapper opacity' : 'guests__wrapper'}>
      <div className="guests__group group">
        <span className="group__time">
          {group.start_time} - {group.stop_time || '...'}
        </span>
      
        <span className="group__name">{group.group_name}</span>
        
        {
          group.result_money
          ? <span>Группа рассчитана...</span>
          : <button className="group__button" onClick={groupButtonHandler}>Подробнее</button>
        }
      </div>

      <div className="guests__group group--additional">
        <span className="group__time">
          money: {group.for_payment || '*'}
        </span>
      </div>
    </li>
  )
}

export default GuestsGroupItem;
