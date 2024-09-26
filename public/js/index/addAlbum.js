let isVisible = false

function openAddAlbum() {
    const add_album = document.getElementById('add-album')
    
    if (isVisible) {
        add_album.style.display = 'none'
        isVisible = false
    } 
    
    else {
        add_album.style.display = 'flex'
        isVisible = true
    }
}