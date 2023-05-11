import './Header.scss';
import { useSelector } from 'react-redux';

function Header() {
  const { cashbox } = useSelector(state => state.shiftsReducer);
  return (
      <header className="header">
        <h1 className="header__title">Admin Moore</h1>
        <div className="header__cashbox">Cashbox: {cashbox}</div>
      </header>
  )
}

export default Header;
