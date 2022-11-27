import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../utils/localStorage'

const AddEmployee = () => {
  const initiateValues = {firstName: "", lastName: "", emailId: ""}
  const [formValues, setFormValues] = useState(initiateValues)
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

  const cancelHandler = (e) => {
    e.preventDefault()
    setFormValues(initiateValues)
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post('/api/emp/employees', {first_name: formValues.firstName, last_name: formValues.lastName, email: formValues.emailId}, {
        headers: {
          'x-access-token': getToken()
        }
      })
      .then(function (response) {
        alert(response.data.message)
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
    if(!values.firstName) {
      errors.firstName = "First name is required!"
    }
    if(!values.lastName) {
      errors.lastName = "Last name is required!"
    }
    if(!values.emailId) {
        errors.emailId = "Email Id is required!"
    }else if(!regex.test(values.emailId)) {
        errors.emailId = "This is not a valid email format!"
    }
    return errors
  } 
  return (
    <div className="row">
      <div className="col-12 col-md-5 m-auto mt-5 p-3">
        <form action="" onSubmit={handleSubmit}>
          <fieldset className="form-group border p-3">
            <legend className="text-center h3">Add Employee</legend>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First Name" value={formValues.firstName} onChange={handleChange} />
              <span className="text-danger mt-2">{formErrors.firstName}</span>
            </div>
            <div className="form-group my-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Last Name" value={formValues.lastName} onChange={handleChange} />
              <span className="text-danger mt-2">{formErrors.lastName}</span>
            </div>
            <div className="form-group my-3">
              <label htmlFor="emailId" className="form-label">Email Id</label>
              <input type="text" className="form-control" name="emailId" id="emailId" placeholder="Email Id" value={formValues.emailId} onChange={handleChange} />
              <span className="text-danger mt-2">{formErrors.emailId}</span>
            </div>
            <button className="btn btn-success" type="submit">Save</button>
            <button className="btn btn-danger mx-2" type="button" onClick={cancelHandler}>Cancel</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default AddEmployee