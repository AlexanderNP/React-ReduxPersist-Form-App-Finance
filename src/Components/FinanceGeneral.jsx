import { useSelector } from 'react-redux';
import styles from './FinanceGeneral.module.css';

export function FinanceGeneral(){

  const balance = useSelector((state) => state.balance['balance']);
  const income = useSelector((state) => state.balance['income']);
  const expenses = useSelector((state) => state.balance['expenses']);

  return(
    <div className={styles.general}>
      <p>Баланс: {balance}</p>
      <p className={styles.income}>Доходы: {income}</p>
      <p className={styles.expenses}>Расходы: {expenses}</p>
    </div>
  );
}