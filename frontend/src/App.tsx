import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import  Calculator  from './components/Calculator'
import './App.css'
import dotenv from 'dotenv';

const App: React.FC = () => {
  return (
    <div className="App">
      <Calculator />
    </div>
  )
}

export default App
