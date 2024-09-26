const express = require('express')
const app = express()

const path = require('path')

const {readData, readUserData, updateData} = require('./file-handler')
const {addAlbum, deleteAlbum} = require('./modify-data')

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())

// Server setup
const PORT = 2727
app.listen(PORT, () => {
    console.log('Server running on http://localhost:2727/views/index.html\n')
})

// Get user data
app.get('/user-data', (req, res) => {
    const user_data = readUserData()
    res.status(200).json(user_data)
})

// Get data
app.get('/data', (req, res) => {
    const data = readData()
    res.status(200).json(data)
})

// Add album
app.post('/data/addAlbum', (req, res) => {

    const album_data = req.body

    const albumAdded = addAlbum(album_data)

    if (!albumAdded) {

    }

    res.status(200)
})

// Delete album
app.post('/data/deleteAlbum', (req, res) => {

    const album_data = req.body
    deleteAlbum(album_data)

    res.status(200)
})