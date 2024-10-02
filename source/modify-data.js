// Functions import
const { readData, readUserData, updateData, updateUserData } = require("./file-handler")

// Add album from front-end to data

    function addAlbum(album_data) {

        const data = readData()
        
        album_name = album_data.name
        artist = album_data.artist

        const albumIndex = data.albums.findIndex(album => album.name === album_name && album.artist === artist)
        if(albumIndex != -1) {
            return false
        }

        const tracklist = formatTracklist(album_data.tracklist)
        const tags = formatTags(album_data.tags.tag)
        
        const newAlbum = { 
            name: album_name,
            artist: artist,
            cover: album_data.cover,
            "rate": -1,
            "custom_rates": -1,
            tracklist: tracklist,
            "average_track_rate": -1,
            tags: tags,
            wiki: album_data.wiki
        }    

        data.albums.push(newAlbum)
        updateData(data)
        return true
    }

// 

// Format tracklist and tags sent from front-end to data format

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

    function formatTags(tags) {

        let formated_tags = []

        for (let i = 0; i < 5; i++) {
            formated_tags.push(tags[i].name)
        }
    
        return formated_tags
    }

//

// Delete album on data

    function deleteAlbum(album_name, artist) {

        const data = readData()
        
        album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

        data.albums.splice(album_index, 1)

        updateData(data)

        return true
    }
    
// 

module.exports = {addAlbum, deleteAlbum}