import { useMemo, useState } from 'react';
import styles from './App.module.css';
import { FinanceForm } from './Components/FinanceForm';
import { FinanceGeneral } from './Components/FinanceGeneral';
import FinanceList from './Components/FinanceList';
import { useTheme } from './Hooks/useTheme';
import { useSelector } from 'react-redux';

function App() {

  const [status, setStatus] = useState('all');
  const [theme, setTheme] = useTheme();

  const operationList = useSelector((state) => state.operation['operation']);

  const operationListFiltered = useMemo(() => operationList.filter((element) => {
    return status === 'all' ? true :
      element.status === status ? true : false;
  }), [operationList, status]);


  return (
    <div className={theme === 'light' ? styles.app : `${styles.app} ${styles.dark}`}>

      <FinanceGeneral />

      <FinanceForm />

      <div className={styles.buttonContain}>
        <button className={status === 'all' ? styles.active : ''} onClick={() => setStatus('all')}>Все операции</button>
        <button className={status === 'Доходы' ? styles.active : ''} onClick={() => setStatus('Доходы')}>Доходы</button>
        <button className={status === 'Расходы' ? styles.active : ''} onClick={() => setStatus('Расходы')}>Расходы</button>
      </div>

      <FinanceList operations={operationListFiltered} />

      <button className={styles.themeButton} onClick={setTheme}>cменить тему</button>

    </div>
  )
}

export default App

