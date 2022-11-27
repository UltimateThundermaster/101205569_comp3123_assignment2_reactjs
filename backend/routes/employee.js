const router = require("express").Router()
const Employee = require("../model/Employee")

router.get('/employees', async (req, res) => {
    try {
        const employee = await Employee.find({})
        res.status(200).json(employee)
    }catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
})

router.post('/employees', async (req, res) => {
    const {first_name, last_name, email, gender, salary} = req.body
    try {
        const employee = new Employee({first_name, last_name, email, gender, salary})
        const savedEmployee = await employee.save()
        res.status(201).json({status: true, message: "Employee created successfully"})
    }catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
})

router.get('/employees/:id', async (req, res) => {
    const id = req.params.id
    try {
        const employee = await Employee.findById(id)
        res.status(200).json(employee)
    }catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
})

router.put('/employees/:id', async (req, res) => {
    const {first_name, last_name, email, gender, salary} = req.body
    const id = req.params.id
    try {
        const employee = await Employee.findById(id)
        employee.first_name = first_name
        employee.last_name = last_name
        employee.email = email
        employee.gender = gender
        employee.salary = salary
        await employee.save()
        res.status(201).json({status: true, message: "Employee updated successfully"})
    }catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
})

router.delete('/employees', async (req, res) => {
    const _id = req.query.eid
    try {
        const employee = await Employee.findByIdAndDelete(_id)
        if(!employee) {
            return res.status(400).json({status: false, message: "Employee not found. Unable to delete employee"})
        }
        res.status(200).json({status: true, message: "Employee deleted successfully"})
    }catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
})

module.exports = router