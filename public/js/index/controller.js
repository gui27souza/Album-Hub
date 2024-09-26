// Global var that will recieve the JSON data and LastFM API key
let data = []
let api_key

// Get the data from the JSON file and use it

    async function loadJSON() {

        // Get the data of the JSON
        const response = await fetch('/api/data')
        const response_user = await fetch('/api/user-data')
        
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