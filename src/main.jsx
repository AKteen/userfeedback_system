import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './features/store/store.js'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>   {/* Redux Provider */}
      <BrowserRouter>          {/* React Router wrapper */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
