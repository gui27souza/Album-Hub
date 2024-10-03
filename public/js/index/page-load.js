// Uses the user data to load his library

// Make sure that the data store happens once
document.addEventListener('DOMContentLoaded', async () => {
    await getData()
    loadPage()
    order('random')
})

// Get the data from the JSON file and use it

    function loadPage() {

        document.getElementById('album-container').innerHTML = ''

        // Load all the albums in the home page
        data.forEach(album => {
            createAlbums(album.name, album.artist, album.cover, album.rate, album.average_track_rate)
        })
    }

//

// Create the album HTML element in the interface

    function createAlbums(album_name, artist, cover, rate, average_track_rate) {

        // Create and add classes and attributes to the item div
        const album_element = document.createElement("div")
        album_element.classList.add('album-item')
        album_element.setAttribute('onclick', `tracklist('${album_name}', '${artist}')`)
        album_element.setAttribute('data-album', `${album_name}`)
        album_element.setAttribute('data-artist', `${artist}`)
        album_element.setAttribute('data-rate', `${rate}`)

        if (cover == "") cover = "../images/album-cover-not-found.png"

        // In case is not rated yet
        if (rate == -1) rate = `&Oslash`
        if (average_track_rate == -1) average_track_rate = `&Oslash`

        // HTML element
        album_element.innerHTML = `
            <img src="${cover}" alt="" class="album-image">
            <div class="album-text">
                <span class="album-name album-text-item">${album_name}</span>
                <span class="album-artist album-text-item">${artist}</span>
                <span class="album-rate album-text-item">Rate: ${rate} | Tracks rate: ${average_track_rate}</span>
            </div>
        `;

        // Append item to the container
        document.getElementById("album-container").appendChild(album_element)
    }

// 
