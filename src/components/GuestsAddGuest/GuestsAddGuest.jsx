import './GuestsAddGuest.scss';
import { useDispatch } from 'react-redux';
import { toggleShowAddGuestModal } from '../../store/guests/guestsActionCreaters';

function GuestsAddGuest() {
  const dispatch = useDispatch();

  const buttonShowGuestModalHandler = () => {
    dispatch(toggleShowAddGuestModal());
  }

  return (
    <button className="addGuest__button" onClick={buttonShowGuestModalHandler}>Добавить гостя</button>
  )
}

export default GuestsAddGuest;
