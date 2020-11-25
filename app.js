require('dotenv').config()
const express = require('express')
const todoRoutes = require('./routes/todo.route')
const app = express()
// app.get("/", (req, res) => {
//     res.json("hello world")
// })

const db = require('./model')
db.sequelize.sync({force: false}).then(() => {
    console.log("Drop and re-sync db.");
});

app.use(express.json());
app.use("/todos", todoRoutes)
app.use((error, req, res, next) => {
    res.status(500).json({message: error.message})
})
module.exports = app
