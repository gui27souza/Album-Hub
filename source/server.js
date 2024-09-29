// Module Imports

    // Express
    const express = require('express')
    const app = express()

    // Node Modules
    const path = require('path')

    // Functions
    const {readData, readUserData, updateData, updateUserData} = require('./file-handler')
    const {addAlbum, deleteAlbum} = require('./modify-data')
    const {searchAlbum} = require('./lastfm-api')
// 

// Public setup
app.use(express.static(path.join(__dirname, '../public')))

// Express dealing with json
app.use(express.json())

// Server setup
    const PORT = 2727
    app.listen(PORT, () => {
        console.log('Server running on http://localhost:2727/views/index.html\n')
    })
// 

// Get user data
    app.get('/user-data', (req, res) => {
        const user_data = readUserData()
        res.status(200).json(user_data)
    })
// 

// Get data
    app.get('/data', (req, res) => {
        const data = readData()
        res.status(200).json(data)
    })
// 

// Get album
    app.get('/search/album', async (req, res) => {

        console.log(req.query.album_name, req.query.artist)
        
        const album = await searchAlbum(req.query.album_name, req.query.artist)

        if (!album || album.tracks == undefined) {
            return res.status(404).json({
                message: 'album not found or album is incompatible'
            })
        }

        console.log(album)

        res.status(200).json(album)
    })
// 

// Add album
    app.post('/data/addAlbum', (req, res) => {

        const album_data = req.body

        const albumAdded = addAlbum(album_data)

        if (!albumAdded) {

        }

        res.status(200)
    })
// 

// Delete album
    app.get('/data/deleteAlbum/album', (req, res) => {

        const album_name = req.query.album_name
        const artist = req.query.artist
        deleteAlbum(album_name, artist)

        res.status(200)
    })
// 