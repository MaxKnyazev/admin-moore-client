import './CashboxModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createValidDate, createValidTime } from '../../utils/utils';
import { addCashboxLogAsync, toggleShowCashboxModal } from '../../store/cashboxLogs/cashboxLogsActionCreaters';
import React from 'react';
import CashboxRadio from '../CashboxRadio';

function CashboxModal() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer);
  const { currentShift } = useSelector(state => state.shiftsReducer);

  const [ cashboxMoneyInput, setCashboxMoneyInput ] = useState('');
  const [ cashboxCommentInput, setCashboxCommentInput ] = useState('');
  const [ moneyType, setMoneyType ] = useState('сash');

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  };

  const cancelButtonHandler = () => {
    dispatch(toggleShowCashboxModal());
  }

  const cashboxButtonHandler = (operationType) => {
    const options = {
      input_cash: operationType === 'add' && moneyType === 'cash' ? +cashboxMoneyInput : null,
      output_cash: operationType === 'remove' && moneyType === 'cash' ? +cashboxMoneyInput : null,
      input_non_cash: operationType === 'add' && moneyType === 'nonCash' ? +cashboxMoneyInput : null,
      output_non_cash: operationType === 'remove' && moneyType === 'nonCash' ? +cashboxMoneyInput : null,
    }

    const date = new Date();

    dispatch(addCashboxLogAsync({
      ...options,
      users_id: user.id,
      users_name: user.name,
      description: cashboxCommentInput,
      time: createValidTime(date),
      shifts_id: currentShift.id,
    }))
    setCashboxCommentInput('');
    setCashboxMoneyInput('');
    dispatch(toggleShowCashboxModal());
  }

  const cashboxRadioButtonHandler = (inputType) => {
    setMoneyType(inputType);
  }

  return (
    <section className="cashboxModal">
      <div className="cashboxModal__wrapper">
        <h2 className="cashboxModal__title">Касса</h2>

        <div className="cashboxModal__labels">
          <label htmlFor="money">Сумма:</label>
          <input
            id="money"
            className="cashboxModal__input"
            placeholder="0"
            type="number"
            value={cashboxMoneyInput}
            onChange={(e) => inputHandler(e, setCashboxMoneyInput)}
          />

          <label htmlFor="comment">Комментарий:</label>
          <input
            id="comment"
            className="cashboxModal__input"
            placeholder="Comment..."
            type="text"
            value={cashboxCommentInput}
            onChange={(e) => inputHandler(e, setCashboxCommentInput)}
          />

          <div className="cashboxModal__money">
            <CashboxRadio title={'Наличные'} isActive={moneyType === 'cash'} inputType="cash" buttonHandler={cashboxRadioButtonHandler} />
            <CashboxRadio title={'По карте'} isActive={moneyType !== 'cash'} inputType="nonCash" buttonHandler={cashboxRadioButtonHandler} />
          </div>
        </div>

        <div className="cashboxModal__buttons">
          <button className="cashboxModal__button cashboxModal__button--cancel" onClick={cancelButtonHandler}>Отмена X</button>
          <button className="cashboxModal__button cashboxModal__button--add" onClick={cashboxButtonHandler}>Добавить ✔</button> 
        </div>
      </div>
    </section>
  );
}

export default CashboxModal;
