const {askQuestion} = require('../user-interface')
const {getTracklist, searchAlbumData, checkAlbum} = require('../api')
const {readData, readUserData, updateData} = require('../file-handler')

// Check if an album is valid and allow the user to rate the album and, if required, its tracks
async function rateTracklist(album_name, artist, data, api_key) {

    album_name = album_name.toLowerCase()
    artist = artist.toLowerCase()
    
    const albumIndex = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

    if (albumIndex === -1) {
        console.log(`\n'${album_name}' by '${artist}' is not in your library\n`)
        return
    }

    const album = data.albums[albumIndex]

    let album_rate = await askQuestion('\nRate: ')
    album.rate = parseFloat(album_rate).toFixed(1)

    let custom_rates = await askQuestion('\nWould you like to give custom rates to the album?\n1 - Yes\n2 - No\n\n')
    if (custom_rates == 1) {
        let custom_rates = {
            "instrumental": -1,
            "aesthetic": -1,
            "cover": -1,
            "first_liten_impact": -1
        }
        let rate
        for (const custom_rate in custom_rates) {
            rate = await askQuestion(`${custom_rate}: `)
            custom_rates[custom_rate] = rate
        }
        album.custom_rates = custom_rates
    }

    let rate_tracks = await askQuestion(`\nWould you like to rate the tracks?\n1 - Yes\n2 - No\n\n`)
    if (rate_tracks == 1) {

        const tracklist = await getTracklist(album_name, artist, api_key)

        let total_rate = 0
        let total_tracks = 0

        console.log('')
        for (const track of tracklist) {
            let track_rate = await askQuestion(`${track.title}: `)
            track.track_rate = track_rate
            if (track_rate === '-' || isNaN(parseFloat(track_rate))) continue
            total_rate += parseFloat(track_rate)
            total_tracks++
        }

        let average_rate = total_rate / total_tracks

        album.tracklist = tracklist
        album.average_track_rate = average_rate.toFixed(1)

        console.log(`\nThe average track rate is ${average_rate.toFixed(1)}!\n`)
    }
    
    updateData(data, 'data')
}

module.exports = {rateTracklist}