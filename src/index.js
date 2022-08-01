import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import './styles/reset.css'
import GlobalStyles from './components/Global'
import { Provider } from 'react-redux'
import store from './stores'
import 'react-toastify/dist/ReactToastify.css'

console.log(process.env.REACT_APP_BACKEND_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles>
        <Provider store={store}>
          <App />
        </Provider>
      </GlobalStyles>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
