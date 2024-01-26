import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.queryByTestId('operations')).toBeNull();
    });

  })

  it('Форма с пробелами', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const form = screen.getByTestId('form');
    const input = screen.getByRole('textbox', { type: 'text' });

    fireEvent.change(input, {
      target: {
        value: '   '
      }
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.queryByTestId('operations')).toBeNull();
    });
  });

  it('Форма с денежной операцией = 0', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const form = screen.getByTestId('form');
    const input = screen.getByRole('textbox', { type: 'number' });

    fireEvent.change(input, {
      target: {
        value: '0'
      }
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.queryByTestId('operations')).toBeNull();
    });
  });

  it('Форма с денежной операцией < 0', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const form = screen.getByTestId('form');
    const input = screen.getByRole('textbox', { type: 'number' });

    fireEvent.change(input, {
      target: {
        value: '-1'
      }
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.queryByTestId('operations')).toBeNull();
    });
  });

  it('Форма заполненная', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const form = screen.getByTestId('form');
    const input = screen.getByRole('textbox', { type: 'text' });
    const inputMoney = screen.getByRole('textbox', { type: 'number' });

    fireEvent.change(input, {
      target: {
        value: 'Операция'
      }
    });

    fireEvent.change(inputMoney, {
      target: {
        value: '500'
      }
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByTestId('operations')).toBeInTheDocument();
    });
  });

});
