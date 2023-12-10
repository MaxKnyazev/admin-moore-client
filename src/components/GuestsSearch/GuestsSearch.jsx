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
    <div className="guests__search search">
      <input className="search__input search__item" placeholder="Поиск..." type="text" value={searchInput} onChange={e => searchInputHandler(e)} />
    </div>
  )
}

export default GuestsSearch;
