// Visibility management
let tracklist_is_on = 0

// Gets and displays the album tracklist

    function tracklist(album_name, artist) {

        // HTML elements
        const tracklist_container = document.getElementById('tracklist-container')
        const tracklist_div = document.getElementById('tracklist')

        // Visibility management
        if (tracklist_is_on) {
            tracklist_container.style.display = 'none'
            tracklist_is_on = 0
            tracklist_div.innerHTML = ''
        } else {
            tracklist_container.style.display = 'flex'
            tracklist_is_on = 1
            getTracklistHTML(album_name, artist)
        }

    }

// 

// Loads the actual album tracklist

    function getTracklistHTML(album_name, artist) {

        const tracklist_div = document.getElementById('tracklist')
        
        const albumIndex = data.findIndex(album => album.name == album_name && album.artist == artist)

        const tracklist = data[albumIndex].tracklist
        let i = 0

        if (tracklist[0].track_rating == -1) unrated = `&Oslash`

        tracklist.forEach(track => {
            tracklist_div.innerHTML += `<span>${++i}. ${track.title} ${(track.track_rating == -1)? '' : '| ' + track.track_rating}</span>`
        })
    }

// 