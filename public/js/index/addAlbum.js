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

async function addAlbum() {

    const album_name = document.getElementById('add-album-name').value
    const artist = document.getElementById('add-album-artist').value

    const album = await getAlbum(album_name, artist)

    console.log(album)

    if (album == undefined) {
        
        return
    }

    displayAlbum(album)
}

function displayAlbum(album) {

    const album_cover = document.getElementById('main-item-album-cover')
    const album_name = document.getElementById('main-item-album-name')
    const artist = document.getElementById('main-item-album-artist')

    album_cover.src = album.image[4]['#text']

    album_name.innerHTML = album.name
    artist.innerHTML = album.artist

    document.getElementById('add-album-output').style.display = 'flex'
    album_data = album
}