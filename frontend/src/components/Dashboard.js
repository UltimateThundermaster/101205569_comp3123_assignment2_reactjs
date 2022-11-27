import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from "../utils/localStorage"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('/api/emp/employees', {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(function (response) {
        const data = response.data
        setEmployeeData(data)
      })
      .catch(function (error) {
        alert(error.response.data.message)
        navigate('/login')
      });
  }, [employeeData])

  const deleteHandler = (e, id) => {
    axios.delete(`/api/emp/employees?eid=${id}`, {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(function (response) {
        const data = response.data
        alert(data.message)
        navigate('/')
      })
      .catch(function (error) {
        alert(error.response.data.message)
      });
  }

  return (
    <div className='row my-5'>
      <div className="col-8 m-auto">
        <h2 className='text-center mb-2'>Employees List</h2>
        <Link to="/employee/add" className="btn btn-primary mb-3">Add Employee</Link>
        <table class="table table-striped table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">Employee First Name</th>
              <th scope="col">Employee Last Name</th>
              <th scope="col">Employee Email Id</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              employeeData && employeeData.map((employee) => (
                <tr>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.email}</td>
                  <td>
                    <div className="row">
                    <div className="col">
                        <button className="btn btn-primary" onClick={() => navigate(`/employee/detail/${employee._id}`)}>View</button>
                      </div>
                      <div className="col">
                        <button className="btn btn-dark" onClick={() => navigate(`/employee/update/${employee._id}`)}>Update</button>
                      </div>
                      <div className="col">
                        <button className="btn btn-danger" onClick={(e) => deleteHandler(e, employee._id)}>Delete</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard