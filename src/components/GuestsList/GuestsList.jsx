import './GuestsList.scss';
import { useSelector } from 'react-redux';
import React from 'react';
import GuestsItem from '../GuestsItem';
import GuestsGroupItem from '../GuestsGroupItem';

function GuestsList() {
  const { guests, searchInput } = useSelector(state => state.guestsReducer);

  return (
    <ul className="guests__list">
      {guests.filter(guest => guest.name.includes(searchInput)).map(guest => 
          guest.group_id
            ? <GuestsGroupItem guest={guest} key={guest.id} /> 
            : <GuestsItem guest={guest} key={guest.id} />
      )}
    </ul>
  )
}

export default GuestsList;
