import React from 'react'
import {getToken, getUser} from '../utils/localStorage'
import { useNavigate } from "react-router-dom"
const Headers = () => {
  const navigate = useNavigate()
  const logout = () => {
    if(getToken()) {
      localStorage.removeItem('jwt')
    }
    if(getUser()) {
      localStorage.removeItem('user')
    }
    navigate('/login')
  }
  return (
    <div className="row bg-dark text-white p-3">
      <div className="col-md-10 h4">
        Employee Management App
      </div>
      <div className="col-md-2 d-flex justify-content-around align-items-center">
        <p className="mb-0">{getToken() !== null && getUser()}</p>
        {getToken() !== null && <button type="button" class="btn btn-danger btn-sm" onClick={logout}>Logout</button>}
      </div>
    </div>
  )
}

export default Headers