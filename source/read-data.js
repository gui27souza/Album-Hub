// Functions import
const { readData } = require("./file-handler")

// Verify if the album is in user data

    function getAlbumData(album_name, artist) {

        // Get user album data
        const data = readData()

        // Find Index of album
        const album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

        // 404 - Album not found in user album data
        if (album_index == -1) return 404

        // Album found
        return data.albums[album_index]
    }

// 

// Functions export
module.exports = { getAlbumData }