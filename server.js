const express = require('express')

const app = express()
const PORT = process.env.PORT || 3018


// express middleware to parse incoming data
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


// Middleware to test connection
app.use((req, res) => {
    res.send('Testing')
})

// Setting the server to listen on the selected PORT and return a confirmation.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} at http://localhost:${PORT}`)
})