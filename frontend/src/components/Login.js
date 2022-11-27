import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom"
import { setToken, setUser } from "../utils/localStorage"
import axios from 'axios'

const Login = () => {
  const initiateVales = {email: "", password: ""}
  const [formValues, setFormValues] = useState(initiateVales)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post('/api/user/login', formValues)
      .then(function (response) {
        alert(response.data.message)
        const jwt_token = response.data.jwt_token
        const username = response.data.username
        setToken(jwt_token)
        setUser(username)
        navigate('/')
      })
      .catch(function (error) {
        const err = error.response.data
        alert(err.message)
      });
    }
  }, [formErrors])
  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if(!values.email) {
      errors.email = "Email is required!"
    }else if(!regex.test(values.email)) {
      errors.email = "This is not a valid email format!"
    }
    if(!values.password) {
      errors.password = "Password is required!"
    }else if(values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!"
    }else if(values.password.length > 32) {
      errors.password = "Password must be less than 32 characters!"
    }
    return errors
  } 
  return (
    <div className="row">
      <div className="col-12 col-md-5 m-auto mt-5 p-3">
        <form action="" onSubmit={handleSubmit}>
          <fieldset className="form-group border p-3">
            <legend>Login</legend>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Id</label>
              <input type="text" className="form-control" name="email" id="email" placeholder="Email Id" value={formValues.email} onChange={handleChange} />
              <span className="text-danger mt-2">{formErrors.email}</span>
            </div>
            <div className="form-group my-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
              <span className="text-danger mt-2">{formErrors.password}</span>
            </div>
            <button className="btn btn-primary w-25" type="submit">Login</button>
            <p className="mt-3">Don't have an account? <Link to="/signup">Sign up</Link></p> 
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Login