import './GuestsNav.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { toggleShowAddGuestModal, toggleShowAddGroupModal, changeSearchInput } from '../../store/guests/guestsActionCreaters';
import { toggleShowCashboxModal } from '../../store/cashboxLogs/cashboxLogsActionCreaters';

function GuestsNav() {
  const dispatch = useDispatch();
  const { searchInput } = useSelector(state => state.guestsReducer);
  const [ isSearchInputFocus, setIsSearchInputFocus ] = useState(false);
  const searchInputRef = useRef(null);

  const buttonShowGuestModalHandler = () => {
    dispatch(toggleShowAddGuestModal());
  }

  const buttonCashboxShow = () => {
    dispatch(toggleShowCashboxModal());
  }

  const buttonShowGroupModalHandler = () => {
    dispatch(toggleShowAddGroupModal());
  }

  const searchClearButtonHandler = e => {
    e.stopPropagation();
    dispatch(changeSearchInput(''))
  }

  const searchInputHandler = e => {
    dispatch(changeSearchInput(e.target.value))
  }

  const searchInputToggleFocusHandler = () => {
    setIsSearchInputFocus(!isSearchInputFocus);
  }

  const searchBlockClickHandler = () => {
    searchInputRef.current.focus();
  }

  return (
    <div className="guestsNav">
      <div className={`guestsNav__search${isSearchInputFocus ? ' guestsNav--focus' : ''}`} onClick={searchBlockClickHandler} >
        <svg className="guestsNav__svg svg" viewBox="0 0 24 24" fill="none">
          <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />
        </svg>
        <input className="guestsNav__input" ref={searchInputRef} placeholder="Поиск..." type="text" value={searchInput} onFocus={searchInputToggleFocusHandler} onBlur={searchInputToggleFocusHandler} onChange={e => searchInputHandler(e)} />
        <button className={`guestsNav__clear${isSearchInputFocus ? ' guestsNav--focus' : ''}`} onClick={(e) => {searchClearButtonHandler(e)}}>
          <svg className="svg" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18"/>
          </svg>
        </button>
      </div>

      <button className="guestsNav__item" onClick={buttonCashboxShow}>
        <svg className="guestsNav__svg svg" viewBox="0 0 24 24" fill="none">
          <path d="M21 18L20.1703 11.7771C20.0391 10.7932 19.9735 10.3012 19.7392 9.93082C19.5327 9.60444 19.2362 9.34481 18.8854 9.1833C18.4873 9 17.991 9 16.9983 9H7.00165C6.00904 9 5.51274 9 5.11461 9.1833C4.76381 9.34481 4.46727 9.60444 4.26081 9.93082C4.0265 10.3012 3.96091 10.7932 3.82972 11.7771L3 18M21 18H3M21 18V19.4C21 19.9601 21 20.2401 20.891 20.454C20.7951 20.6422 20.6422 20.7951 20.454 20.891C20.2401 21 19.9601 21 19.4 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V18M7.5 12V12.01M10.5 12V12.01M9 15V15.01M12 15V15.01M15 15V15.01M13.5 12V12.01M16.5 12V12.01M9 9V6M5.8 6H12.2C12.48 6 12.62 6 12.727 5.9455C12.8211 5.89757 12.8976 5.82108 12.9455 5.727C13 5.62004 13 5.48003 13 5.2V3.8C13 3.51997 13 3.37996 12.9455 3.273C12.8976 3.17892 12.8211 3.10243 12.727 3.0545C12.62 3 12.48 3 12.2 3H5.8C5.51997 3 5.37996 3 5.273 3.0545C5.17892 3.10243 5.10243 3.17892 5.0545 3.273C5 3.37996 5 3.51997 5 3.8V5.2C5 5.48003 5 5.62004 5.0545 5.727C5.10243 5.82108 5.17892 5.89757 5.273 5.9455C5.37996 6 5.51997 6 5.8 6Z" />
        </svg>
        Касса
      </button>

      <button className="guestsNav__item" onClick={buttonShowGuestModalHandler}>
        <svg className="guestsNav__svg svg" viewBox="0 0 24 24" fill="none">
          <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
          <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
        </svg>
        Добавить гостя
      </button>

      <button className="guestsNav__item" onClick={buttonShowGroupModalHandler}>
        <svg className="guestsNav__svg svg" viewBox="0 0 24 24" fill="none">
          <path d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z" />
        </svg>
        Добавить группу
      </button>
    </div>
  )
}

export default GuestsNav;
