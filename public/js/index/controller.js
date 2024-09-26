// Global var that will recieve the JSON data and LastFM API key
let data = []
let api_key
let album_data

// Get the data from the JSON file and use it

    async function loadJSON() {

        // Get the data of the JSON
        const response = await fetch('/data')
        
        // Store data in global var
        data = await response.json()
        data = data.albums

        document.getElementById('album-container').innerHTML = ''

        // Load all the albums in the home page
        data.forEach(album => {
            createAlbums(album.name, album.artist, album.rate, album.average_track_rate)
        })
    }

// 

async function getUserApiKey() {
    const user_data_response = await fetch('/user-data')
    user_data = await user_data_response.json()
    api_key = user_data.api_key
}

function sendAddAlbum(album_data) {
    fetch('/data/addAlbum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: album_data.name,
            artist: album_data.artist,
            tracklist: album_data.tracks.track
        })
    })
    location.reload()
}

function deleteAlbum(element) {
    let album_name = element.dataset.album
    let artist = element.dataset.artist

    sendDeleteAlbum(album_name, artist)

    location.reload()
}

function sendDeleteAlbum(album_name, artist) {

    fetch('/data/deleteAlbum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            album_name,
            artist
        })
    })
}