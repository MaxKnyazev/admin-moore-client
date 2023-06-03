import './GuestsAdd.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createValidDate, createValidTime } from '../../utils/utils';
import { addGuestAsync, toggleShowAddGroupModal } from '../../store/guests/guestsActionCreaters';

function GuestsAdd() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer);
  const { currentShift } = useSelector(state => state.shiftsReducer);

  const [ guestName, setGuestName ] = useState('');
  const [ guestTariff, setGuestTariff ] = useState('1');

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  const formTariffHandler = e => {
    setGuestTariff(e.target.value);
  }

  const buttonAddGuestHandler = () => {
    if (guestName) {
      const startDate = new Date();
      dispatch(addGuestAsync({
        date: createValidDate(startDate),
        users_id: user.id,
        users_name: user.name,
        name: guestName,
        start_time: createValidTime(startDate),
        tariffs_id: guestTariff,
        shifts_id: currentShift.id,
      }))
  
      setGuestName('');
    }
  }

  const buttonAddGroupHandler = () => {
    dispatch(toggleShowAddGroupModal());
  }

  return (
    <div className="guests__form form">
      <select defaultValue="1" onChange={formTariffHandler} className="form__tariff" name="tariff">
        <option value="1">Взрослый</option>
        <option value="2">Детский</option>
      </select>

      <input className="form__input" placeholder="Guest name..." type="text" value={guestName} onChange={e => inputHandler(e, setGuestName)} />
      <button className="form__button" onClick={buttonAddGuestHandler}>Add guest</button>
      <button className="form__button form__button--group" onClick={buttonAddGroupHandler}>Add group</button>
    </div>
  )
}

export default GuestsAdd;
