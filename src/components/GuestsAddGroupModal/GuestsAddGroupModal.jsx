import './GuestsAddGroupModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editGuestAsync, toggleShowAddGroupModal } from '../../store/guests/guestsActionCreaters';

function GuestsAddGroupModal() {
  const dispatch = useDispatch();
  const [ group, setGroup ] = useState([
    { name: 'guest', id: '123' },
    { name: 'guest', id: '123' },
    { name: 'guest', id: '123' },
    { name: 'guest', id: '123' },
    { name: 'guest', id: '123' },
    { name: 'guest', id: '123' },
    { name: 'guest', id: '123' },
    { name: 'guest', id: '123' },
  ]);

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  const cancelButtonHandler = () => {
    dispatch(toggleShowAddGroupModal());
  }

  return (
    <section className="addGroupModal">
      <div className="addGroupModal__wrapper">
        <div className="addGroupModal__form form">
          <span className="form__title">Название группы:</span>
          <input className="form__input" placeholder="Group name..." type="text" value={() => {}} onChange={() => {}} />
          <button className="form__button">Добавить человека</button>
        </div>

        <ul className="addGroupModal__list">
          {group.map(elem => {
            return (
              <li key={elem.id} className="addGroupModal__item item">
                <select defaultValue="1" onChange={() => {}} className="item__tariff" name="tariff">
                  <option value="1">Взрослый</option>
                  <option value="2">Детский</option>
                </select>

                <span className="item__titel">+1</span>

                <button className="item__button">Удалить</button>
              </li>
            )
          })}
        </ul>

        <div className="addGroupModal__buttons">
          <button className="addGroupModal__button" onClick={cancelButtonHandler}>Отмена</button>
          <button className="addGroupModal__button" onClick={() => {}}>Добавить группу</button>
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