// API fetch functions
const fetch = require('node-fetch')
const {askQuestion, closeInterface} = require('./user-interface')

async function getTracklist(album_name, artist, api_key) {

    try {
        
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api_key}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album_name)}&format=json`)

        const data = await response.json()
        let tracklist = []
        let i = 0

        data.album.tracks.track.forEach(track => {
            tracklist.push({
                "number": ++i,
                "title": track.name,
                "track_rating": -1
            })
        })

        return tracklist

    } catch (error) {
        console.log('\nError fetching album tracklist')
        return -1
    }

}


async function searchAlbumData(search, api_key) {

    try {
        
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(search)}&limit=5&api_key=${api_key}&format=json`)

        const data = await response.json()

        return data.results.albummatches.album

    } catch (error) {
        console.log('Error fetching album search', error)
        return -1
    }

}

async function checkAlbum(album_name, artist, api_key) {

    const tracklist = await getTracklist(album_name, artist, api_key)

    if (tracklist == -1) {
        
        const search = await searchAlbumData(album_name+' '+artist, api_key)
        if (search == -1 || search[0] == undefined) {
            console.log('Album not found\n')
            return -1
        }

        const answer1 = await askQuestion(`Did you meant ${search[0].name} by ${search[0].artist}?\n1 - Yes\n2 - No\n`)

        if (answer1 == 1) {
            album_name = search[0].name
            artist = search[0].artist
            return [album_name, artist]
        } 
        
        else if (search[1] != undefined) {

            const answer2 = await askQuestion(`\nDid you meant ${search[1].name} by ${search[1].artist}?\n1 - Yes\n2 - No\n`)

            if (answer2 == 1) {
                album_name = search[1].name
                artist = search[1].artist
                return [album_name, artist]
            }

            else {
                console.log('Album not found\n')
                return -1
            }
        } 
        
        else {
            console.log('Album not found\n')
            return -1
        }

    } else return 1

}

module.exports = {getTracklist, searchAlbumData, checkAlbum}