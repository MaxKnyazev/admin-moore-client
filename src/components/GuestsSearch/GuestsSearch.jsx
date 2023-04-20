import './GuestsSearch.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchInput } from '../../store/guests/guestsActionCreaters';

function GuestsSearch() {
  // const [ searchInput, setSearchInput ] = useState('');
  const dispatch = useDispatch();
  const { searchInput } = useSelector(state => state.guestsReducer);
  
  const searchClearButtonHandler = () => {
    dispatch(changeSearchInput(''))
  }

  const searchInputHandler = e => {
    dispatch(changeSearchInput(e.target.value))
  }

  return (
    <div className="guests__form form">
      <input className="form__input" placeholder="Search..." type="text" value={searchInput} onChange={e => searchInputHandler(e)} />
      <button className="form__button" onClick={searchClearButtonHandler}>Clear</button>
    </div>
  )
}

export default GuestsSearch;
