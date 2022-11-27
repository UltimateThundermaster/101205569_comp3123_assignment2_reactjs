import React, { useEffect } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Headers from './components/Headers'
import Dashboard from './components/Dashboard'
import AddEmployee from './components/AddEmployee'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import EmployeeDetails from './components/EmployeeDetails'
import UpdateEmployee from './components/UpdateEmployee'
const App = () => {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
          <Route exact path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route exact path="/employee/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route exact path="/employee/detail/:id" element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} />
          <Route exact path="/employee/update/:id" element={<ProtectedRoute><UpdateEmployee /></ProtectedRoute>} />
          <Route exact path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route exact path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
