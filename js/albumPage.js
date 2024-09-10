let data = []
let album_name
let artist

document.addEventListener('DOMContentLoaded', () => {

    loadJSON()

    const params = new URLSearchParams(window.location.search)

    album_name = params.get('album')
    artist = params.get('artist')
})

async function getAlbum(album_name, artist) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api_key}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album_name)}&format=json`);
        const data = await response.json();
        return data.album;
    } catch (error) {
        console.error('Error fetching album', error);
        return {};
    }
}

async function loadJSON() {

    // Gets the data of the JSON
    const response = await fetch('../data.json')
    
    // Store data in global var
    data = await response.json()
    console.log(data)
    api_key = data.api_key
    data = data.albuns
    
    const album = await getAlbum(album_name, artist)

    const album_title = document.getElementById('album-title')
    const album_artist = document.getElementById('album-artist')
    const album_cover = document.getElementById('album-cover')

    album_title.innerHTML = album.name
    album_artist.innerHTML = album.artist
    album_cover.src = album.image[3]['#text']

    console.log(album)

    // const tracklist = await 
}