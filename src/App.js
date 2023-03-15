import './App.scss';
import { getAllGuestsAsync  } from './store/guests/guestsActionCreaters';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  const buttonHandler = () => {
    dispatch(getAllGuestsAsync())
    // console.log(getAllGuestsAsync());
    // dispatch({
    //   type: 'GET_ALL_GUESTS_PENDING',
    // })
  }

  return (
    <div className="App">
      <h1>Hello world</h1>
      <button onClick={buttonHandler}>click me</button>
    </div>
  );
}

export default App;
