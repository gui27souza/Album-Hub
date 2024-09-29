// Global var that will recieve the JSON data and LastFM API key
let data = []
let api_key
let album_data

// Send request to server to get data

    async function getData() {
        
        // Get the data of the JSON
        const response = await fetch('/data')
            
        // Store data in global var
        data = await response.json()
        data = data.albums
    }

// 

// Send request to server to get user data

    async function getUserData() {
        const user_data_response = await fetch('/user-data')
        user_data = await user_data_response.json()
        api_key = user_data.api_key
    }

// 


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