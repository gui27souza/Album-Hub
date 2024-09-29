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

// Send request to server to get an album Object

    async function getAlbum(album_name, artist) {
        
        try{
            const response = await fetch(`/search/album?album_name=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`)

            if (response.status === 404) {
                return false
            }
            
            const album = await response.json()
            return album
        }

        catch (error) {
            console.error('Erro ao buscar álbum:', error)
            return false
        }
    }

// 

// Send request to server to add album

    function postAddAlbum(album_data) {

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

// 

// Send request to server to delete album

    function postDeleteAlbum(album_name, artist) {

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

// 