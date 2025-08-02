// Gets the album data from server to load page

    async function getAlbumData(album_name, artist) {

        try {

            // Send request to find album in user album data
            const response = await fetch(`/data/album/?album_name=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`)

            // Programed errors dealing
            if (response.status != 200) {
                
                // 404 - album not found in user album data, return generic album
                if (response.status == 404) {
                    const album_data = {
                        name: "name",
                        artist: "artist",
                        cover: "../../images/album-cover-not-found.png",
                        palette: {
                           Vibrant: {
                                color: "#2C2C2E",
                                population: 200
                            },
                            DarkVibrant: {
                                color: "#000000",
                                population: 0
                            },
                            LightVibrant: {
                                color: "#000000",
                                population: 0
                            },
                            "Muted": {
                                color: "#000000",
                                population: 0
                            },
                            "DarkMuted": {
                                color: "#1A1A1D",
                                population: 200
                            },
                            "LightMuted": {
                                "color": "#000000",
                                population: 0
                            }
                        },
                        rate: -1,
                        custom_rates: -1,
                        tracklist: [
                           {
                              number: 0,
                              title: "title",
                              track_rate: -1
                           }
                        ],
                        average_track_rate: -1,
                        tags: ["tag", "tag", "tag", "tag", "tag"],
                        wiki: -1
                    }
                    return album_data
                }

            }

            // Got album succesfully
            const album_data = await response.json()
            return album_data
        }

        // Unexpected Error
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