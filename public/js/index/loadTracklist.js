// Visibility management
let tracklist_is_on = false

// Get and display the album tracklist

    function tracklist(album_name, artist) {

        // HTML elements
        const tracklist_container = document.getElementById('tracklist-container')
        const tracklist_div = document.getElementById('tracklist-items')
        const go_to_album = document.getElementById('go-to-album')

        // Visibility management
        if (tracklist_is_on) {
            
            // Reset the element
            tracklist_container.style.display = 'none'
            go_to_album.setAttribute('data-album', "")
            go_to_album.setAttribute('data-artist', "")
            tracklist_div.innerHTML = ''

            tracklist_is_on = false
            
        } else {

            // Adjust the element for the album
            tracklist_container.style.display = 'flex'
            go_to_album.href = `./album.html?album=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`            
            getTracklistHTML(album_name, artist)

            tracklist_is_on = true
        }

    }

// 

// Load the actual album tracklist

    function getTracklistHTML(album_name, artist) {

        // HTML elements
        const tracklist_div = document.getElementById('tracklist-items')
        const go_to_album = document.getElementById('go-to-album')

        // Data for other functions use
        go_to_album.setAttribute('data-album', `${album_name}`)
        go_to_album.setAttribute('data-artist', `${artist}`)
        
        // Find the album the the data
        const albumIndex = data.findIndex(album => album.name == album_name && album.artist == artist)

        // Get the album tracklist
        const tracklist = data[albumIndex].tracklist
        
        // Create each track element
        let i = 0
        tracklist.forEach(track => {
            tracklist_div.innerHTML += `<span>${++i}. ${track.title} ${(track.track_rate == -1)? '' : '| ' + track.track_rate}</span>`
        })
    }

// 