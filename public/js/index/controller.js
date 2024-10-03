// Main functions that talks to the server, with data interchange

// Global var that will recieve the JSON data and LastFM API key
let data = []
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

    async function postAddAlbum(album_name, artist) {

        try {
                    
            // Send album to be added to the server
            const response = await fetch(`/data/addAlbum/album?album_name=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`, {method: 'POST'})

            if (!response.ok) {
                if (response.status === 409) {
                    window.alert('Album is already in the library!')
                } else if (response.status === 501) {
                    window.alert('Album without tracklist!')
                } else {
                    window.alert('An error occurred while adding the album!')
                }
                return
            }

            if (response.status === 200) {
                location.reload()
            }

        } 
        
        catch (error) {
            console.error('Fetch error:', error)
            window.alert('An unexpected error occurred.')
        }
    }


// 

// Send request to server to delete album

    async function getDeleteAlbum(album_name, artist) {

        try{

            await fetch(`/data/deleteAlbum/album?album_name=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`)

            return
        }

        catch (error) {
            console.error('Erro ao deletar álbum:', error)
            return false
        }
    }

// 