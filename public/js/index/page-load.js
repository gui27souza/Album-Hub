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
            createAlbums(album.name, album.artist, album.cover, album.palette, album.rate, album.average_track_rate)
        })

        const album_item_list = document.querySelectorAll('.album-item');

        album_item_list.forEach((element) => {
            
            element.style.filter = `drop-shadow(0 0 0 #00000000)`

            element.addEventListener('mouseenter', () => {
                element.style.filter = `
                    drop-shadow(0 0 2rem ${element.dataset.color})
                    drop-shadow(0 0 1rem ${element.dataset.color})
                    drop-shadow(0 0 1rem ${element.dataset.color})
                `
            })

            element.addEventListener('mouseleave', () => {
                element.style.filter = `drop-shadow(0 0 0 #00000000)`
            })
        })
    }

//

// Create the album HTML element in the interface

    function createAlbums(album_name, artist, cover, palette, rate, average_track_rate) {

        // Create and add classes and attributes to the item div
        const album_element = document.createElement("div")
        album_element.classList.add('album-item')
        album_element.setAttribute('onclick', `tracklist('${album_name}', '${artist}')`)
        album_element.setAttribute('data-album', `${album_name}`)
        album_element.setAttribute('data-artist', `${artist}`)
        album_element.setAttribute('data-rate', `${rate}`)
        album_element.setAttribute('data-color', `${palette.Vibrant.color}`)

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
