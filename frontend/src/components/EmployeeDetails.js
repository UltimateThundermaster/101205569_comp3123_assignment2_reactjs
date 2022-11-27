import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { getToken } from '../utils/localStorage'
const EmployeeDetails = () => {
    const [employeeData, setEmployeeData] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const id = params.id
        axios.get(`/api/emp/employees/${id}`, {
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
    }
        , [])
    return (
        <div className="row border w-50 m-auto my-5 p-3">
            <h3 className='text-center'>View Employee Details</h3>
            <div className="col-12">
                <div className="row">
                    <div className="col-4">Employee First Name: </div>
                    <div className="col-2">{employeeData.first_name}</div>
                </div>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-4">Employee Last Name: </div>
                    <div className="col-2">{employeeData.last_name}</div>
                </div>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-3">Employee Email: </div>
                    <div className="col-2">{employeeData.email}</div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails