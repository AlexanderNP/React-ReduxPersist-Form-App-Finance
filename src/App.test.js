import { fireEvent, render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './store/themeSlice';
import App from './App';
import operationSlice from './store/operationSlice';
import balanceSlice from './store/balanceSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    operation: operationSlice,
    balance: balanceSlice
  }
});

describe('Отправка формы - появление операций', () => {

  it('Пустая форма', async () => {

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const form = screen.getByTestId('form');

    await act(async () => {
      fireEvent.submit(form);
    });

    expect(screen.queryByTestId('operations')).toBeNull();
  });

  it('Форма с пробелами', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const form = screen.getByTestId('form');
    const input = screen.getByTestId('inputTitle');

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: '   '
        }
      });
      fireEvent.submit(form);
    });

    expect(screen.queryByTestId('operations')).toBeNull();
  });

  it('Форма с денежной операцией = 0', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const form = screen.getByTestId('form');
    const inputMoney = screen.getByTestId('inputMoney');

    await act(async () => {
      fireEvent.change(inputMoney, {
        target: {
          value: '0'
        }
      });
      fireEvent.submit(form);
    });

    expect(screen.queryByTestId('operations')).toBeNull();
  });

  it('Форма с денежной операцией < 0', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const form = screen.getByTestId('form');
    const inputMoney = screen.getByTestId('inputMoney');

    await act(async () => {
      fireEvent.change(inputMoney, {
        target: {
          value: '-1'
        }
      });
      fireEvent.submit(form);
    });

    expect(screen.queryByTestId('operations')).toBeNull();
  });

  it('Форма заполненная', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const form = screen.getByTestId('form');
    const input = screen.getByTestId('inputTitle');
    const inputMoney = screen.getByTestId('inputMoney');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Операция' } });
      fireEvent.change(inputMoney, { target: { value: '500' } });
      fireEvent.submit(form);
    });

    expect(screen.getByTestId('operations')).toBeInTheDocument();

  });

});
