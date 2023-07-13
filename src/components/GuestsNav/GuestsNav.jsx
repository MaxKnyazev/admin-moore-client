import GuestsSearch from '../GuestsSearch';
import './GuestsNav.scss';
// import { useSelector, useDispatch } from 'react-redux';
// import { changeSearchInput } from '../../store/guests/guestsActionCreaters';

function GuestsNav() {
  // const [ searchInput, setSearchInput ] = useState('');
  // const dispatch = useDispatch();
  // const { searchInput } = useSelector(state => state.guestsReducer);
  
  // const searchClearButtonHandler = () => {
  //   dispatch(changeSearchInput(''))
  // }

  // const searchInputHandler = e => {
  //   dispatch(changeSearchInput(e.target.value))
  // }

  return (
    <div className="guests__nav">
      <GuestsSearch />
    </div>
  )
}

export default GuestsNav;
