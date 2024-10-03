// Module Imports

    // Express
    const express = require('express')
    const app = express()

    // Node Modules
    const path = require('path')

    // Functions
    const {readData, readUserData, updateData, updateUserData} = require('./file-handler')
    const {getAlbumData} = require('./read-data')
    const {addAlbum, deleteAlbum} = require('./modify-data')
    const {searchAlbumAPI, getAlbumAPI} = require('./lastfm-api')
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
        console.log('Got user data\n')
        return res.status(200).json(user_data)
    })

// 

// Get data

    app.get('/data', (req, res) => {
        const data = readData()
        console.log('Got data\n')
        return res.status(200).json(data)
    })

// 

// Get album from user data

    app.get('/data/album', (req, res) => {

        const album_name = req.query.album_name
        const artist = req.query.artist

        const album_data = getAlbumData(album_name, artist)

        if (album_data == false) return res.status(404)

        return res.status(200).json(album_data)
    })

// 

// Search album

    app.get('/search/album', async (req, res) => {

        const album = await searchAlbumAPI(req.query.album_name, req.query.artist)

        if (!album) {
            console.log('Album not found or album is incompatible')
            console.log(req.query.album_name, req.query.artist, '\n')
            return res.status(404).json({
                message: 'album not found or album is incompatible'
            })
        }

        console.log('Album found')
        console.log(album.name, album.artist, '\n')
        return res.status(200).json(album)
    })

// 

// Add album

    app.post('/data/addAlbum/album', async (req, res) => {

        const album_name = req.query.album_name
        const artist = req.query.artist

        if (getAlbumData(album_name, artist) != false) {
            console.log(album_name, 'by', artist, 'is already in the library\n')
            return res.status(409).send('Album is already in the library')
        }

        const album_api = await getAlbumAPI(album_name, artist)
        const albumAdded = addAlbum(album_api)

        if (albumAdded == -1) return res.status(501).send('Album without tracklist!')
        if (!albumAdded) {
            return res.status(505).send('Internal server error')
        }

        console.log(album_name, 'by', artist, 'added to the library\n')
        return res.status(200).send('Album added successfully')
    })

// 

// Delete album

    app.get('/data/deleteAlbum/album', (req, res) => {

        const album_name = req.query.album_name
        const artist = req.query.artist
        deleteAlbum(album_name, artist)

        console.log(album_name, 'by', artist, 'deleted from the library\n')
        return res.status(200)
    })

// 