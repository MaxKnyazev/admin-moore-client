import './GuestsNav.scss';
import GuestsSearch from '../GuestsSearch';
import GuestsAddGuest from '../GuestsAddGuest';
import GuestsAddGroup from '../GuestsAddGroup';
import GuestsCashboxShow from '../GuestsCashboxShow/GuestsCashboxShow';

function GuestsNav() {

  return (
    <div className="guests__nav">
      <GuestsSearch />
      <GuestsCashboxShow />
      <GuestsAddGuest />
      <GuestsAddGroup />
    </div>
  )
}

export default GuestsNav;
