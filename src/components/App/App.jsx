import { Routes, Route } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { actionConfirmUserAsync } from '../../store/storeThunk/actionCreaters';
import Layout from '../Layout';
import HomePage from '../../pages/HomePage';
// import LoginPage from '../../pages/LoginPage';
// import RegistrationPage from '../../pages/RegistrationPage';
// import AdminPage from '../../pages/AdminPage';
import NotFoundPage from '../../pages/NotFoundPage';
// import TodosPage from '../../pages/TodosPage';
import './App.scss';

const App = () => {
  // let { isAuth } = useSelector(state => state.userReducer);
  // const dispatch = useDispatch();
  
  //************************************************************ для теста */
  let isAuth = false;
  //************************************************************ для теста */

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        { !isAuth && <Route index element={<HomePage />}/> }
        {/* { isAuth && <Route index element={<TodosPage />}/> } */}
        {/* <Route path='/auth/login' element={<LoginPage />}/> */}
        {/* <Route path='/auth/registration' element={<RegistrationPage />}/> */}
        {/* <Route path='/todos' element={<TodosPage />}/> */}
        {/* <Route path='/admin' element={<AdminPage />}/> */}
        <Route path='*' element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
}


export default App;
