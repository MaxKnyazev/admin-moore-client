import './GuestsSearch.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

function GuestsSearch() {
  const [ searchInput, setSearchInput ] = useState('');
  
  const searchClearButtonHandler = () => {
    setSearchInput('');
  }

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  }

  return (
    <div className="guests__form form">
      <input className="form__input" placeholder="Search..." type="text" value={searchInput} onChange={e => inputHandler(e, setSearchInput)} />
      <button className="form__button" onClick={searchClearButtonHandler}>Clear</button>
    </div>
  )
}

export default GuestsSearch;
