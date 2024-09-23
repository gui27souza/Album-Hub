// Global var that will recieve the JSON data and LastFM API key
let data = []
let api_key

// Make sure that the data store happens once
document.addEventListener('DOMContentLoaded', () => {
    loadJSON()
})

// Get the data from the JSON file and use it

    async function loadJSON() {

        // Get the data of the JSON
        const response = await fetch('../../data/data.json')
        const response_user = await fetch('../../data/user-data.json')
        
        // Store data in global var
        data = await response.json()
        user_data = await response_user.json()
        api_key = user_data.api_key
        data = data.albums
        
        // Load all the albums in the home page
        data.forEach(album => {
            createAlbums(album.name, album.artist, album.rate, album.average_track_rate)
        })
    }

// 

// Create the album HTML element in the interface

    async function createAlbums(album_name, artist, rate, average_track_rate) {

        // Create and add classes and attributes to the item div
        const album_element = document.createElement("div")
        album_element.classList.add('album-item')
        album_element.setAttribute('onclick', `tracklist('${album_name}', '${artist}')`)
        album_element.setAttribute('data-album', `${album_name}`)
        album_element.setAttribute('data-artist', `${artist}`)
        album_element.setAttribute('data-rate', `${rate}`)

        // Get the actual album name and cover
        const album_object = await getAlbum(album_name, artist)
        const image_link = album_object.image[4]['#text']

        // In case is not rated yet
        if (rate == -1) rate = `&Oslash`
        if (average_track_rate == -1) average_track_rate = `&Oslash`

        // HTML element
        album_element.innerHTML = `
            <img src="${image_link}" alt="" class="album-image">
            <div class="album-text">
                <span class="album-name album-text-item">${album_object.name}</span>
                <span class="album-artist album-text-item">${album_object.artist}</span>
                <span class="album-rate album-text-item">Rate: ${rate} | Tracks rate: ${average_track_rate}</span>
            </div>
        `;

        // Append item to the container
        document.getElementById("album-container").appendChild(album_element)
    }

// 

// Get the actual album object

    async function getAlbum(album_name, artist) {

        try {
            const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api_key}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album_name)}&format=json`)
            
            const data = await response.json()

            return data.album
        } 
        
        catch (error) {
            console.error('Error fetching album', error)
            return {}
        }
    }

// 