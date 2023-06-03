import './GroupModalList.scss';
import { useSelector } from 'react-redux';
import React from 'react';
import GroupModalItem from '../GroupModalItem';

function GroupModalList() {
  const { currentGroup } = useSelector(state => state.guestsReducer);

  return (
    <ul className="group__list">
      {currentGroup.map(guest => <GroupModalItem guest={guest} key={guest.id} /> )}
    </ul>
  )
}

export default GroupModalList;
