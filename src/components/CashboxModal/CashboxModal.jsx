import './CashboxModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createValidDate, createValidTime } from '../../utils/utils';
import { addCashboxLogAsync, toggleShowCashboxModal } from '../../store/cashboxLogs/cashboxLogsActionCreaters';
import CashboxRadio from '../CashboxRadio';
import InputNumber from '../InputNumber';

function CashboxModal() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer);
  const { currentShift } = useSelector(state => state.shiftsReducer);

  const [ cashboxMoneyInput, setCashboxMoneyInput ] = useState('0');
  const [ cashboxCommentInput, setCashboxCommentInput ] = useState('');
  const [ moneyType, setMoneyType ] = useState('cash');
  const [ operationType, setOperationType ] = useState('add');

  const inputHandler = (e, setInput) => {
    setInput(e.target.value);
  };

  const cancelButtonHandler = () => {
    dispatch(toggleShowCashboxModal());
  }

  const cashboxButtonHandler = () => {
    const options = {
      input_cash: operationType === 'add' && moneyType === 'cash' ? +cashboxMoneyInput : null,
      output_cash: operationType === 'remove' && moneyType === 'cash' ? +cashboxMoneyInput : null,
      input_non_cash: operationType === 'add' && moneyType === 'nonCash' ? +cashboxMoneyInput : null,
      output_non_cash: operationType === 'remove' && moneyType === 'nonCash' ? +cashboxMoneyInput : null,
    }

    console.log(operationType);
    console.log(moneyType);
    console.log(cashboxMoneyInput);
    console.log(options);

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

  const cashboxRadioButtonHandler = (inputType, setInputState) => {
    setInputState(inputType);
  }

  const outsideClickhandler = () => {
    dispatch(toggleShowCashboxModal());
  }

  return (
    <section onClick={outsideClickhandler} className="cashboxModal">
      <div onClick={(e) => {e.stopPropagation()}} className="cashboxModal__wrapper">
        <h2 className="cashboxModal__title">Касса</h2>

        <div className="cashboxModal__money">
          <div>Сумма:</div>
          <InputNumber inputNumber={cashboxMoneyInput} setInputNumber={setCashboxMoneyInput} />

          <label htmlFor="comment">Комментарий:</label>
          <input
            id="comment"
            className="cashboxModal__input"
            placeholder="Комментарий..."
            type="text"
            value={cashboxCommentInput}
            onChange={(e) => inputHandler(e, setCashboxCommentInput)}
          />

          <div className="cashboxModal__type">
            <CashboxRadio title={'Наличные'} isActive={moneyType === 'cash'} buttonHandler={() => {cashboxRadioButtonHandler('cash', setMoneyType)}} />
            <CashboxRadio title={'По карте'} isActive={moneyType !== 'cash'} buttonHandler={() => {cashboxRadioButtonHandler('nonCash', setMoneyType)}} />
            <CashboxRadio title={'Доход'} isActive={operationType === 'add'} buttonHandler={() => {cashboxRadioButtonHandler('add', setOperationType)}} />
            <CashboxRadio title={'Расход'} isActive={operationType !== 'add'} buttonHandler={() => {cashboxRadioButtonHandler('remove', setOperationType)}} />
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
