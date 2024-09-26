// Global variables
    let data = []
    let album_name
    let artist
    let api_key
// 

// Gets the data

    async function loadJSON() {

        // Get the data of the JSON
        const response = await fetch('/data')
        
        // Store data in global var
        data = await response.json()
        data = data.albums

        await loadAlbumPage()
    }

// 

async function getUserApiKey() {
    const user_data_response = await fetch('/user-data')
    user_data = await user_data_response.json()
    api_key = user_data.api_key
}