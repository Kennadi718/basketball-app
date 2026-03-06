require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const authRoutes = require('./routes/auth')
const playerRoutes = require('./routes/players')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'KenKen5!',
    database: 'basketball'
})

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err)
        return
    }
    console.log("Connected to MySQL")
})

// Make DB available to routes
app.use((req,res,next)=>{
    req.db = db
    next()
})

// Routes
app.use('/auth', authRoutes)
app.use('/players', playerRoutes)

// Test route
app.get('/', (req,res)=>{
    res.send("Basketball API Running")
})

// Start server
const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
