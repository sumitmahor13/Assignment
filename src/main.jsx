import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./output.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AppContextProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContextProvider>
  </StrictMode>,
)
