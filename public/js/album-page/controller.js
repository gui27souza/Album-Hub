// Gets the album data from server to load page

    async function getAlbumData(album_name, artist) {
        
        try {
            const response = await fetch(`/data/album/?album_name=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`)

            const album_data = await response.json()

            return album_data
        }

        catch(error) {
            console.error('ERROR: error fetching the album', error)
            return false
        }
    }

// 

// Send the album rating to the server

    async function putAlbumRate(album_rate, album_name, artist) {

        try {
            const response = await fetch(`/data/updateAlbum/album/albumRate/?album_name=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({rate: album_rate})
            })

            return
        } 
        
        catch(error) {
            console.error('ERROR: error updating album rate', error)
            return
        }
    }

// 

// Send the tracklist rating to the server

    async function putTracklistRate(tracklist, album_name, artist) {

        try {
            const response = await fetch(`/data/updateAlbum/album/tracklistRate/?album_name=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({tracklist: tracklist})
            })

            return
        } 
        
        catch(error) {
            console.error('ERROR: error updating album tracklist rate', error)
            return
        }
    }

// 