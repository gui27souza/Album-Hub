const {readData, readUserData, updateData} = require('./file-handler')

function userHasAlbum(album_name, artist) {
    
    const data = readData()

    const albumIndex = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

    if(albumIndex == -1) return -1

    return data.albums[albumIndex]
}

module.exports = {userHasAlbum}