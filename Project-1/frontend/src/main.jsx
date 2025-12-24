import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './CartContext.jsx'  // ← This line must be correct!
import { AuthProvider } from './AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>

)
