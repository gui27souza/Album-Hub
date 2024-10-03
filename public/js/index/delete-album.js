// When the album-item is opened, the tracklist container will have a 'delete album' button, wich has tha album data in its HTML dataset. When clicked, it triggers the 'deleteAlbum()' function and deletes the album from library

// Gather the album info that will be deleted

    async function deleteAlbum(element) {

        // Album info
        let album_name = element.dataset.album
        let artist = element.dataset.artist

        // Send request to delete album
        getDeleteAlbum(album_name, artist)
        
        // Reload page
        location.reload()
    }
    
// 