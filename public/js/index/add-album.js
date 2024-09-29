// Manages the visibility of the add-album section, in wich is possible to search an album and add it to your library

// Manage addAlbum section visibility
let isVisible = false

// Open the addAlbum section

    function openAddAlbum() {

        const add_album = document.getElementById('add-album')
        
        // Close
        if (isVisible) {
            add_album.style.display = 'none'
            isVisible = false
        } 
        
        // Open
        else {
            add_album.style.display = 'flex'
            isVisible = true
        }
    }

// 

// Search album to be added

    async function addAlbum() {

        // Visibility manage
        const not_found = document.getElementById('add-album-not-found')
        not_found.style.display = 'none'
        const main_item = document.getElementById('add-album-main-item')
        main_item.style.display = 'none'

        // Gets the album name and artist to be searched
        const album_name = document.getElementById('add-album-name').value
        const artist = document.getElementById('add-album-artist').value

        // Get the album data
        const album = await getAlbum(album_name, artist)

        // If album data is invalid, display album-not-found
        if (!album) {
            not_found.style.display = 'flex'
            return
        }

        // If album data is valid, display album
        displayAlbum(album)
    }

// 

// Display the album searched if found

    function displayAlbum(album) {

        // Visibility manage
        const main_item = document.getElementById('add-album-main-item')
        main_item.style.display = 'flex'

        // HTML elements
        const album_cover = document.getElementById('main-item-album-cover')
        album_cover.src = album.image[4]['#text']
        const album_name = document.getElementById('main-item-album-name')
        album_name.innerHTML = album.name
        const artist = document.getElementById('main-item-album-artist')
        artist.innerHTML = album.artist

        // Puts the dat in a var that will be used if the user confirms addAlbum
        album_data = album
    }

//