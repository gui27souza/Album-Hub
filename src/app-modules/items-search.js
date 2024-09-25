const {askQuestion} = require('../user-interface')
const {getTracklist, searchAlbumData, checkAlbum} = require('../api')

const {addAlbum, removeAlbum} = require('./items-manage')

// Search for terms and return 5 possible albums, and if required, call the function to add album to library
async function searchTerms(search, data, api_key) {

    let search_results = await searchAlbumData(search, api_key)

    if (search_results.length == 0) {
        console.log('No items found\n')
        return
    }

    console.log('')
    let i = 0
    search_results.forEach(album => {
        console.log(`${++i} - ${album.name} by ${album.artist}`)
    })

    let command = await askQuestion('\nWould you like to add any to your library?\n1 - Yes\n2 - No\n\n')
    if (command == 1) {
        let album_index = await askQuestion('\nType the value of the album in the list: ')
        album_add = search_results[album_index-1]
        await addAlbum(album_add.name, album_add.artist, data, api_key)
    }
}

// Check if an album is valid and get its tracklist
async function searchTracklist(album_name, artist, api_key) {
    
    let check = await checkAlbum(album_name, artist, api_key)
    if (check.length == 2) {
        album_name = check[0]
        artist = check[1]
    }

    let tracklist = await getTracklist(album_name, artist, api_key)
    if (tracklist == -1) return
    
    console.log('')
    let i = 0
    tracklist.forEach(track => {
        console.log(++i,'-',track.title)
    })
}

module.exports = {searchTerms, searchTracklist}