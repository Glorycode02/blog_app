require("dotenv").config()
const mongoose = require('mongoose')
const express = require("express")
const app = express()
const PORT = process.env.PORT || 4000
const methodOverride = require("method-override")

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open",() => console.log("Connected "))



app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride("_method"))

app.use(express.static("public"))



app.set("view engine", "ejs")
app.use("", require("./routes/routes"))

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})