// Visibility management
let tracklist_is_on = 0

// Gets and displays the album tracklist

    function tracklist(album_name, artist) {

        // HTML elements
        const tracklist_container = document.getElementById('tracklist-container')
        const tracklist_div = document.getElementById('tracklist-items')
        const go_to_album = document.getElementById('go-to-album')

        // Visibility management
        if (tracklist_is_on) {
            
            tracklist_container.style.display = 'none'
            go_to_album.setAttribute('data-album', "")
            go_to_album.setAttribute('data-artist', "")

            tracklist_is_on = 0
            tracklist_div.innerHTML = ''

            
        } else {

            tracklist_container.style.display = 'flex'

            tracklist_is_on = 1

            go_to_album.href = `./album.html?album=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`

            getTracklistHTML(album_name, artist)
        }

    }

// 

// Loads the actual album tracklist

    function getTracklistHTML(album_name, artist) {

        const tracklist_div = document.getElementById('tracklist-items')
        const go_to_album = document.getElementById('go-to-album')

        go_to_album.setAttribute('data-album', `${album_name}`)
        go_to_album.setAttribute('data-artist', `${artist}`)
        
        const albumIndex = data.findIndex(album => album.name == album_name && album.artist == artist)

        const tracklist = data[albumIndex].tracklist
        let i = 0

        if (tracklist[0].track_rating == -1) unrated = `&Oslash`

        tracklist.forEach(track => {
            tracklist_div.innerHTML += `<span>${++i}. ${track.title} ${(track.track_rating == -1)? '' : '| ' + track.track_rating}</span>`
        })
    }

// 