import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from '../Routes/AppRoutes.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { TodoProvider } from './TodoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoProvider>
        <Router>
      <AppRoutes />
    </Router>
    </TodoProvider>
  
  </StrictMode>,
)
