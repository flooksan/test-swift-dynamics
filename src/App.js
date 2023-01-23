import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegisterData from './components/RegisterData/RegisterData'
import DataTable from './components/DataTable/DataTable'

function App() {
  return (
    <Routes>
            <Route path='/' element={<RegisterData/>} />
            <Route path='/data' element={<DataTable/>} />
    </Routes>
    
  )
}

export default App