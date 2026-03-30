import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { IndustryProvider } from './context/IndustryContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { DemoProvider } from './context/DemoContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <IndustryProvider>
        <DemoProvider>
          <App />
        </DemoProvider>
      </IndustryProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
