const path = require('path')

const express = require('express')
const app = express()

const {readData, readUserData, updateData} = require('./file-handler')
const {userHasAlbum} = require('./fetch-data')
const {addAlbum, removeAlbum} = require('./modify-data')

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())

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

app.post('/data/deleteAlbum', (req, res) => {

    const album_data = req.body

    const albumRemoved = removeAlbum(album_data)

    if (!albumRemoved) {

    }

    res.status(200)
})