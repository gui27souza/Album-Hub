// Functions import
const { readData, readUserData, updateData, updateUserData } = require("./file-handler")

// Add album from front-end to data

    function addAlbum(album_data) {

        const data = readData()
        
        album_name = album_data.name.toLowerCase()
        artist = album_data.artist.toLowerCase()

        const albumIndex = data.albums.findIndex(album => album.name === album_name && album.artist === artist)
        if(albumIndex != -1) {
            console.log(`\n'${album_name}' by '${artist}' is already in your library!\n`)
            return false
        }

        const tracklist = formatTracklist(album_data.tracklist)
        
        const newAlbum = { 
            name: album_name,
            artist: artist,
            "rate": -1,
            "custom_rates": -1,
            tracklist: tracklist,
            "average_track_rate": -1 
        }    

        data.albums.push(newAlbum)
        updateData(data)
        return true
    }

// 

// Format tracklist sent from front-end to data format

    function formatTracklist(tracklist) {
        let formated_tracklist = []

        let i = 1
        tracklist.forEach(track => {
            
            let formated_track = {
                number: i,
                title: track.name,
                track_rate: -1
            }

            formated_tracklist.push(formated_track)
        i++
        })

        return formated_tracklist
    }

//

// Delete album on data

    function deleteAlbum(album_name, artist) {

        const data = readData()
        
        album_name = album_name.toLowerCase()
        artist = artist.toLowerCase()

        album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

        data.albums.splice(album_index, 1)

        updateData(data)

        return true
    }
    
// 

module.exports = {addAlbum, deleteAlbum}