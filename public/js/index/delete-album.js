// When the album-item is opened, the tracklist container will have a 'delete album' button, wich has tha album data in its HTML dataset. When clicked, it triggers the 'deleteAlbum()' function and deletes the album from user data

// Gather the album info that will be deleted

    function deleteAlbum(element) {

        // Album info
        let album_name = element.dataset.album
        let artist = element.dataset.artist

        // Send request to delete album
        postDeleteAlbum(album_name, artist)

        // Reload page
        location.reload()
    }
    
// 