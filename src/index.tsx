import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore, Store } from 'redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';

const store:Store<InitialState, ReduxAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))
export type IRootState = ReturnType<typeof store.getState>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
