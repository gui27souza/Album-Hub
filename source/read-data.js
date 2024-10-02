// Functions import
const { readData, readUserData, updateData, updateUserData } = require("./file-handler")

function getAlbumData(album_name, artist) {

    const data = readData()

    const album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)
    if(album_index == -1) return false

    return data.albums[album_index]
}

module.exports = { getAlbumData }