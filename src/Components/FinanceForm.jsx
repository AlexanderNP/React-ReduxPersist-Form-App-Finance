import { useDispatch } from 'react-redux';
import styles from './FinanceForm.module.css';
import { addOperation } from '../store/operationSlice';
import { useForm } from 'react-hook-form';
import { addBalance, addExpenses, addIncome } from '../store/balanceSlice';

export function FinanceForm() {
  
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField } = useForm();

  const noSpaceValidator = (value) => value.trim().length > 0;

  const onSubmit = (data) => {
    dispatch(addOperation({ text: data.nameOperation, money: data.money, status: data.selectOperations }));
    dispatch(addBalance({ money: data.money, status: data.selectOperations }));
    if (data.selectOperations === 'Доходы') {
      dispatch(addIncome({ money: data.money }));
    } else {
      dispatch(addExpenses({ money: data.money }));
    }
    resetField('nameOperation');
    resetField('money');
  };


  return (
    <form data-testid="form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>

      <p>Операция</p>

      <input data-testid="inputTitle" placeholder="Название операции" {...register('nameOperation',
        {
          validate: noSpaceValidator
        })} />

      {errors?.nameOperation && <p style={{ color: 'red' }}>Введите корректное название</p>}

      <input data-testid="inputMoney" type="number" placeholder="0" {...register('money', {
        validate: (value) => value > 0
      })} />

      {errors?.money && <p style={{ color: 'red' }}>Число должно быть больше 0</p>}

      <select {...register('selectOperations')}>
        <option value="Расходы">Расходы</option>
        <option value="Доходы">Доходы</option>
      </select>

      <div className={styles.buttonContain}>
        <button>Добавить</button>
      </div>
    </form>
  );
}