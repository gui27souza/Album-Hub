// Functions import
const { readData, readSettings, updateData, updateSettings } = require("./file-handler")

// Add album from front-end to data

    function addAlbum(album_data) {

        // Albums without tracklist are not supported
        if (!album_data.tracks) return -1

        const data = readData()
        
        // Organize data
        const album_name = album_data.name
        const artist = album_data.artist        
        const cover = album_data.image[4]['#text']
        const tracklist = formatTracklist(album_data.tracks.track)
        const tags = formatTags(album_data.tags.tag)
        const wiki = album_data.wiki? album_data.wiki.content : -1
        
        // Create album object with data
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

        // Album added successfully
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
        if (tags == undefined) return []
        const tags_lenght = tags.length
        let formated_tags = []
        for (let i = 0; i < tags_lenght; i++) {
            formated_tags.push(tags[i].name)
        }
        return formated_tags
    }

//

// Delete album on data

    function deleteAlbum(album_name, artist) {

        const data = readData()
        
        const album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)
        
        // Album is not in the library
        if (album_index == -1) return false
        
        // Album deleted successfully
        data.albums.splice(album_index, 1)
        updateData(data)
        return true
    }
    
// 

// Update album rate

    function updateAlbumRate(album_name, artist, rate) {
        
        const data = readData()

        const album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

        // Error - album not in the library
        if (album_index == -1) return false

        data.albums[album_index].rate = Number(rate)

        // Album rate updated successfully
        updateData(data)
        return true
    }

// 

// Update tracklist rate

    function updateTracklistRate(album_name, artist, tracklist) {

        const data = readData()

        const album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

        // Error - album not in the library
        if (album_index == -1) return false

        // Update tracklist
        data.albums[album_index].tracklist = tracklist

        // Calculate the average track rate
        let rate_sum = 0
        let track_counting = 0
        data.albums[album_index].tracklist.forEach(track => {
            if (track.track_rate != -1){
                rate_sum += track.track_rate
                track_counting++
            }
        })
        data.albums[album_index].average_track_rate = Number((rate_sum/track_counting).toFixed(1))

        // Tracklist rate updated successfully
        updateData(data)
        return true
    }

// 

module.exports = {addAlbum, deleteAlbum, updateAlbumRate, updateTracklistRate}