import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { IndustryProvider } from './context/IndustryContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { DemoProvider } from './context/DemoContext.jsx'

import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <IndustryProvider>
          <DemoProvider>
            <App />
          </DemoProvider>
        </IndustryProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
)
