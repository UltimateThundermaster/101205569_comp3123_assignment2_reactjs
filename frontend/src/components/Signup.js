import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom"
import axios from 'axios'

const Signup = () => {
  const initiateVales = {username: "", email: "", password: ""}
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
      axios.post('/api/user/signup', formValues)
      .then(function (response) {
        alert(response.data.message)
        navigate('/login')
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
    if(!values.username){
        errors.username = "Username is required!"
    }
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
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group border p-3">
            <legend>Sign Up</legend>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" name="username" id="username" placeholder="Username" value={formValues.username} onChange={handleChange} />
              <span className="text-danger mt-2">{formErrors.username}</span>
            </div>
            <div className="form-group my-3">
              <label htmlFor="email" className="form-label">Email Id</label>
              <input type="text" className="form-control" name="email" id="email" placeholder="Email Id" value={formValues.email} onChange={handleChange} />
              <span className="text-danger mt-2">{formErrors.email}</span>
            </div>
            <div className="form-group my-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
              <span className="text-danger mt-2">{formErrors.password}</span>
            </div>
            <button className="btn btn-primary w-25" type="submit">Signup</button>
            <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p> 
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Signup