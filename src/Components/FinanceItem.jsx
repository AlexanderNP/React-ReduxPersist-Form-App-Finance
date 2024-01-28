import styles from './FinanceItem.module.css';

export function FinanceItem({title, money, status}){
  return(
    <div className={styles.item} data-testid="operations">
      <p>{title}</p>
      {status === 'Доходы' ? 
      <span style={{ color: 'blue' }}>+{money}</span>: 
      <span style={{ color: 'red' }}>-{money}</span>}
    </div>
  );
}