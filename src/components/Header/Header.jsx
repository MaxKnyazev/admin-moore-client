import './Header.scss';
import { useSelector } from 'react-redux';

function Header() {
  const { cashbox } = useSelector(state => state.shiftsReducer);
  const { guests } = useSelector(state => state.guestsReducer);

  let activeGuests = 0;
  for (const guest of guests) {
    if (guest.result_money === null) {
      activeGuests += 1;
    }
  }

  return (
      <header className="header">
        <h1 className="header__title">Admin Moore</h1>
        <div className="header__span">Cashbox: {cashbox}</div>
        <div className="header__guests">
          <div className="header__span">Гостей в зале: {activeGuests}</div>
          <div className="header__span">Гостей прошло за день: {guests.length}</div>
        </div>
      </header>
  )
}

export default Header;
