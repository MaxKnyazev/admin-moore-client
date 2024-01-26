import './GuestsAddGuestModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addGuestAsync, toggleShowAddGuestModal } from '../../store/guests/guestsActionCreaters';
import { createValidDate, createValidTime } from '../../utils/utils';

function GuestsAddGuestModal() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer);
  const { currentShift } = useSelector(state => state.shiftsReducer);
  const [ inputGuestName, setInputGuestName ] = useState('');
  const [ inputTariff, setInputTariff ] = useState('1');

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  const cancelButtonHandler = () => {
    dispatch(toggleShowAddGuestModal());
  }

  const addGuestButtonHandler = () => {
    if (inputGuestName) {
      const startDate = new Date();
      const guest = {
        date: createValidDate(startDate),
        users_id: user.id,
        users_name: user.name,
        name: `${inputGuestName}`,
        start_time: createValidTime(startDate),
        tariffs_id: inputTariff,
        shifts_id: currentShift.id,
      };
      dispatch(addGuestAsync(guest));
      dispatch(toggleShowAddGuestModal());
    }
  }

  const outsideClickhandler = (e) => {
    dispatch(toggleShowAddGuestModal());
  }

  return (
    <section onClick={outsideClickhandler} className="addGuestModal">
      <div onClick={(e) => {e.stopPropagation()}} className="addGuestModal__wrapper">
        <h2 className="addGuestModal__title">Добавить гостя</h2>

        <div className="addGuestModal__settings">
          <input className="addGuestModal__input" placeholder="Имя гостя..." type="text" value={inputGuestName} onChange={e => {inputHandler(e, setInputGuestName)}} />

          <select className="addGuestModal__tariff" defaultValue={inputTariff} name="tariff" onChange={e => {inputHandler(e, setInputTariff)}}>
            <option value="1">Взрослый</option>
            <option value="2">Детский</option>
          </select>
        </div>

        <div className="addGuestModal__buttons">
          <button className="addGuestModal__button addGuestModal__button--cancel" onClick={cancelButtonHandler}>Отмена X</button>
          <button className="addGuestModal__button addGuestModal__button--add" onClick={addGuestButtonHandler}>Добавить ✔</button> 
        </div>
      </div>
    </section>
  )
}

export default GuestsAddGuestModal;