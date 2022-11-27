const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/user")
const employeeRouter = require("./routes/employee")
const auth = require("./middleware/auth")
const path = require('path')
const app = express()

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build')) 
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  }) 
}

const mongoAtlasUri = "mongodb+srv://ThunderMaster:vz_G3URks-S.2km@cluster0.phfivi1.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/emp', auth, employeeRouter)

const port = process.env.PORT || 8000

app.listen(port, () => {
    try {
         mongoose.connect(
          mongoAtlasUri,
          { useNewUrlParser: true, useUnifiedTopology: true },
          () => console.log("Mongoose is connected")
        );
      } catch (e) {
        console.log("could not connect");
      }
    console.log(`Server is up at port ${port}`)
})