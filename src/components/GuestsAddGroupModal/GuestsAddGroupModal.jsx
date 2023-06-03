import './GuestsAddGroupModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addGroupAsync, toggleShowAddGroupModal } from '../../store/guests/guestsActionCreaters';
import { createValidDate, createValidTime } from '../../utils/utils';

function GuestsAddGroupModal() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer);
  const { currentShift } = useSelector(state => state.shiftsReducer);
  const [ inputGroupName, setInputGroupName ] = useState('');
  const [ guestsList, setGuestsList ] = useState([]);

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  const cancelButtonHandler = () => {
    dispatch(toggleShowAddGroupModal());
  }

  const addToGroupButtonHandler = () => {
    setGuestsList([...guestsList, {
      tariff: '1',
      id: Date.now()
    }])
  }

  const deleteGuestButtonHandler = (id) => {
    setGuestsList(guestsList.filter(elem => elem.id !== id))
  }

  const addGroupButtonHandler = () => {
    if (inputGroupName) {
      const startDate = new Date();
      const group = [];
      for (const guest of guestsList) {
        group.push({
          date: createValidDate(startDate),
          users_id: user.id,
          users_name: user.name,
          name: `${inputGroupName} +1`,
          group_name: inputGroupName,
          start_time: createValidTime(startDate),
          tariffs_id: guest.tariff,
          shifts_id: currentShift.id,
        })
      }
      dispatch(addGroupAsync(group));
      dispatch(toggleShowAddGroupModal());
    }
  }

  const itemTariffHandler = (e, id) => {
    setGuestsList(guestsList.map(elem => elem.id === id ? { ...elem, tariff: e.target.value } : elem))
  }

  let count = 0;

  return (
    <section className="addGroupModal">
      <div className="addGroupModal__wrapper">
        <div className="addGroupModal__form form">
          <span className="form__title">Название группы:</span>
          <input className="form__input" placeholder="Group name..." type="text" value={inputGroupName} onChange={e => {inputHandler(e, setInputGroupName)}} />
          <button className="form__button" onClick={addToGroupButtonHandler}>Добавить человека</button>
        </div>

        <ul className="addGroupModal__list">
          {guestsList.map(elem => {
            count += 1;
            return (
              <li key={elem.id} className="addGroupModal__item item">
                <select className="item__tariff" defaultValue={elem.tariff} onChange={e => {itemTariffHandler(e, elem.id)}} name="tariff">
                  <option value="1">Взрослый</option>
                  <option value="2">Детский</option>
                </select>

                <span className="item__titel">+{count}</span>

                <button className="item__button" onClick={() => {deleteGuestButtonHandler(elem.id)}}>Удалить</button>
              </li>
            )
          })}
        </ul>

        <div className="addGroupModal__buttons">
          <button className="addGroupModal__button" onClick={cancelButtonHandler}>Отмена</button>
          <button className="addGroupModal__button" onClick={addGroupButtonHandler}>Добавить группу</button>
        </div>
      </div>
    </section>
  )
}

export default GuestsAddGroupModal;


// <div className="guests__form form">
// <select defaultValue="1" onChange={() => {}} className="form__tariff" name="tariff">
//   <option value="1">Взрослый</option>
//   <option value="2">Детский</option>
// </select>

// <input className="form__input" placeholder="Guest name..." type="text" value={() => {}} onChange={() => {}} />
// <button className="form__button" onClick={() => {}}>Add guest</button>
// <button className="form__button form__button--group" onClick={() => {}}>Add group</button>
// </div>