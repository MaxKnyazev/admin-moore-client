import './GuestsList.scss';
import { useSelector } from 'react-redux';
import React from 'react';
import GuestsItem from '../GuestsItem';
import GuestsGroupItem from '../GuestsGroupItem';

function GuestsList() {
  const { guests, searchInput } = useSelector(state => state.guestsReducer);
  let groupsIdSet = new Set();

  return (
    <ul className="guests__list">
      {guests.filter(guest => guest.name.includes(searchInput)).map(guest => {
        if (guest.group_id) {
          if (!groupsIdSet.has(guest.group_id)) {
            groupsIdSet.add(guest.group_id);
            return <GuestsGroupItem group={guest} key={guest.id} />
          }
        } else {
          return <GuestsItem guest={guest} key={guest.id} />
        }
        return null;
      })}
    </ul>
  )
}

export default GuestsList;
