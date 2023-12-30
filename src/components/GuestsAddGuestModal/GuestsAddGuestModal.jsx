import './GuestsAddGuestModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addGroupAsync, toggleShowAddGroupModal } from '../../store/guests/guestsActionCreaters';
import { createValidDate, createValidTime } from '../../utils/utils';

function GuestsAddGuestModal() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer);
  const { currentShift } = useSelector(state => state.shiftsReducer);
  const [ inputGroupName, setInputGroupName ] = useState('');
  const [ guestsList, setGuestsList ] = useState([]);

  // const inputHandler = (e, setInput) => {
  //   setInput(e.target.value);
  // }

  // const cancelButtonHandler = () => {
  //   dispatch(toggleShowAddGroupModal());
  // }

  // const addToGroupButtonHandler = () => {
  //   setGuestsList([...guestsList, {
  //     tariff: '1',
  //     id: Date.now()
  //   }])
  // }

  // const deleteGuestButtonHandler = (id) => {
  //   setGuestsList(guestsList.filter(elem => elem.id !== id))
  // }

  // const addGroupButtonHandler = () => {
  //   if (inputGroupName) {
  //     const startDate = new Date();
  //     const group = [];
  //     for (const guest of guestsList) {
  //       group.push({
  //         date: createValidDate(startDate),
  //         users_id: user.id,
  //         users_name: user.name,
  //         name: `${inputGroupName} +1`,
  //         group_name: inputGroupName,
  //         start_time: createValidTime(startDate),
  //         tariffs_id: guest.tariff,
  //         shifts_id: currentShift.id,
  //       })
  //     }
  //     dispatch(addGroupAsync(group));
  //     dispatch(toggleShowAddGroupModal());
  //   }
  // }

  // const itemTariffHandler = (e, id) => {
  //   setGuestsList(guestsList.map(elem => elem.id === id ? { ...elem, tariff: e.target.value } : elem))
  // }

  return (
    <section className="addGuestModal">
      <div className="addGuestModal__wrapper">

      </div>
    </section>
  )
}

export default GuestsAddGuestModal;