export const createValidDate = date => {
  let years = date.getFullYear();
  let months = date.getMonth() + 1;
  months = String(months).length === 1 ? `0${months}` : String(months);
  let days = date.getDate();
  days = String(days).length === 1 ? `0${days}` : String(days);

  return `${years}-${months}-${days}`;
}

export const createValidTime = date => {
  let hours = date.getHours();
  hours = String(hours).length === 1 ? `0${hours}` : String(hours);
  let minutes = date.getMinutes();
  minutes = String(minutes).length === 1 ? `0${minutes}` : String(minutes);
  let seconds = date.getSeconds();
  seconds = String(seconds).length === 1 ? `0${seconds}` : String(seconds);

  return `${hours}:${minutes}:${seconds}`;
}

export const sortGuests = guests => {
  let activeGuests = [];
  let inactiveGuests = [];

  for (let guest of guests) {
    if (guest.stop_time !== null) {
      inactiveGuests.push(guest)
    } else {
      activeGuests.push(guest)
    }
  }

  return [
    ...activeGuests.sort(sortGuestsByTime),
    ...inactiveGuests.sort(sortGuestsByTime)
  ]
}

const sortGuestsByTime = (firstGuest, secondGuest) => {
  if (firstGuest.start_time === secondGuest.start_time) {
    return 0
  }

  if (firstGuest.start_time < secondGuest.start_time) {
    return -1
  } else {
    return 1
  }
}