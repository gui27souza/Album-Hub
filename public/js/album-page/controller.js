// Global variables
    let data = []
    let album_name
    let artist
    let api_key
// 

// Gets the data
    async function loadJSON() {

        // Gets the data of the JSON
        const response = await fetch('/api/data')
        const response_user = await fetch('/api/user-data')
        
        // Store data in global var
        data = await response.json()
        user_data = await response_user.json()
        api_key = user_data.api_key
        data = data.albums

        // Load album page
        await loadAlbumPage()
    }