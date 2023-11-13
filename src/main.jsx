import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartcontextProvider } from './context/Cart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <CartcontextProvider>
    <App />
    </CartcontextProvider>
)
