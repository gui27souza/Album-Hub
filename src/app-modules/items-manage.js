const {askQuestion} = require('../user-interface')
const {getTracklist, searchAlbumData, checkAlbum} = require('../api')
const {readData, readUserData, updateData} = require('../file-handler')

const {rateTracklist} = require('./items-rate')

// Check if an album is valid and add it to the library and, if required, call rateTracklist
async function addAlbum(album_name, artist, data, api_key) {
    
    album_name = album_name.toLowerCase()
    artist = artist.toLowerCase()

    const albumIndex = data.albums.findIndex(album => album.name === album_name && album.artist === artist)
    if(albumIndex != -1) {
        console.log(`\n'${album_name}' by '${artist}' is already in your library!\n`)
        return -1
    }

    const check = await checkAlbum(album_name, artist, api_key)
    if (check == -1) return
    if (check.length == 2) {
        await addAlbum(check[0], check[1], data, api_key)
        return
    }

    const tracklist = await getTracklist(album_name, artist, api_key)
    const newAlbum = { 
        name: album_name,
        artist: artist,
        "rate": -1,
        "custom_rates": -1,
        tracklist: tracklist,
        "average_track_rate": -1 
    }    

    data.albums.push(newAlbum)

    let command = await askQuestion('\nWould you like to rate it?\n1 - Yes\n2 - No\n\n')
    if (command == 1) await rateTracklist(album_name, artist, data, api_key)

    updateData(data, 'data')
    console.log('\nAlbum added to you library!\n')

    return 1
}

// Remove an album from the library
function removeAlbum(album_name, artist, data) {

    album_name = album_name.toLowerCase()
    artist = artist.toLowerCase()

    album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

    if (album_index == -1) {
        console.log(`\n'${album_name}' by '${artist}' is not in your library\n`)
        return
    }

    data.albums.splice(album_index, 1)
    console.log(`\n'${album_name}' by '${artist}' was removed from your library!\n`)

    updateData(data, 'data')
}

module.exports = {addAlbum, removeAlbum}