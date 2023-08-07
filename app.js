const express = require('express')
const app = express()
const moment = require('moment');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require("dotenv").config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const errorHandler = require('./middleware/error')

//Import routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

//Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database connection established'))
    .catch((err) => console.error(err))


//Middleware
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: "5mb" }))
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}))
app.use(cookieParser())
app.use(cors())

//Routes Middleware
app.use('/api', authRoutes);
app.use('/api', appointmentRoutes);

//Error Middleware
app.use(errorHandler);

//port 
const port = process.env.PORT || 9000

app.listen(port, () => { console.log(`Server start on port ${port}`) })
