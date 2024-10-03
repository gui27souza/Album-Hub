const {readData, readUserData, updateData, updateUserData} = require('./file-handler')

// Get the actual album object

    async function searchAlbumAPI(album_name, artist) {

        const user_data = readUserData()
        const api_key = user_data.api_key

        try {
            const response = await fetch(`https://ws.audioscrobbler.com/2.0/?limit=1&method=album.search&album=${encodeURIComponent(artist)}+${encodeURIComponent(album_name)}&api_key=${api_key}&format=json`)
            
            const data = await response.json()

            return data.results.albummatches.album[0]
        } 
        
        catch (error) {
            console.error('Error fetching album', error)
            return false
        }
    }

// 

// Get the actual album object

    async function getAlbumAPI(album_name, artist) {

        const user_data = readUserData()
        const api_key = user_data.api_key

        try {
            const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api_key}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album_name)}&format=json`)

            const data = await response.json()

            return data.album
        } 
        
        catch (error) {
            console.error('Error fetching album', error)
            return false
        }
    }

// 

module.exports = {searchAlbumAPI, getAlbumAPI}