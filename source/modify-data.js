// Functions import
const { readData, readSettings, updateData, updateSettings } = require("./file-handler")

// Add album from front-end to data

    function addAlbum(album_data) {

        const data = readData()
        
        const album_name = album_data.name
        const artist = album_data.artist
        
        const cover = album_data.image[4]['#text']
        
        if (!album_data.tracks) return -1
        const tracklist = formatTracklist(album_data.tracks.track)
        
        const tags = formatTags(album_data.tags.tag)
        const wiki = album_data.wiki? album_data.wiki.content : -1
        
        const newAlbum = { 
            name: album_name,
            artist: artist,
            cover: cover,
            "rate": -1,
            "custom_rates": -1,
            tracklist: tracklist,
            "average_track_rate": -1,
            tags: tags,
            wiki: wiki
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
        if (album_index == -1) return false

        data.albums.splice(album_index, 1)

        updateData(data)

        return true
    }
    
// 

module.exports = {addAlbum, deleteAlbum}