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
      <button className="search__clear search__item" onClick={searchClearButtonHandler}>
        <svg className="search__svg" viewBox="0 0 1024 1024" t="1569683368540" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9723"><defs><style type="text/css"></style></defs><path d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z" p-id="9724"></path></svg>
      </button>

      <input className="search__input search__item" placeholder="Поиск..." type="text" value={searchInput} onChange={e => searchInputHandler(e)} />

      <button className="search__filter search__item">
        F
      </button>
    </div>
  )
}

export default GuestsSearch;
