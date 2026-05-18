import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css'
import App from './App.tsx'
import { MsalProvider } from '@azure/msal-react'

import { msalInstance } from "./msalInstance.ts";

  await msalInstance.initialize()

  const response = await msalInstance.handleRedirectPromise()



  if (response?.account) {
    msalInstance.setActiveAccount(response.account);
  } else {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }
  }



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
