// Functions import
const { readData, readSettings, updateData, updateSettings } = require("./file-handler")

// Verify if the album is in user data

    function getAlbumData(album_name, artist) {

        const data = readData()

        const album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)
        if (album_index == -1) return false

        return data.albums[album_index]
    }

// 

module.exports = { getAlbumData }