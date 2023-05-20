import './GuestsAddGroupModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editGuestAsync, toggleShowAddGroupModal } from '../../store/guests/guestsActionCreaters';

function GuestsAddGroupModal() {
  const dispatch = useDispatch();
  const [ inputGroupName, setInputGroupName ] = useState('');
  const [ group, setGroup ] = useState([]);

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  const cancelButtonHandler = () => {
    dispatch(toggleShowAddGroupModal());
  }

  const addToGroupButtonHandler = () => {
    setGroup([...group, {
      tariff: '1',
      id: Date.now()
    }])
  }

  const deleteGuestButtonHandler = (id) => {
    setGroup(group.filter(elem => elem.id !== id))
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
          {group.map(elem => {
            count += 1;
            return (
              <li key={elem.id} className="addGroupModal__item item">
                <select className="item__tariff" defaultValue={elem.tariff} onChange={() => {}} name="tariff">
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