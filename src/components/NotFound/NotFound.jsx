import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  const navigate = useNavigate();
  console.log(navigate);

  const homePageButtonHandler = () => {
    navigate('/');
  }

  return (
    <div className='notfound'>
      <h1 className='notfound__text'>Страница не найдена</h1>
      <span className='notfound__smile' role="img" aria-label="sheep">404 🤔</span>
        <button className='notfound__button' onClick={homePageButtonHandler}>HomePage</button>
    </div>
  );
}

export default NotFound;