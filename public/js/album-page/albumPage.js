let data = []
let album_name
let artist
let api_key


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
        console.log(data)
        return data.album;
    } catch (error) {
        console.error('Error fetching album', error);
        return {};
    }
}

async function loadJSON() {

    // Gets the data of the JSON
    const response = await fetch('../../data/data.json')
    const response_user = await fetch('../../data/user-data.json')
    
    // Store data in global var
    data = await response.json()
    user_data = await response_user.json()
    api_key = user_data.api_key
    data = data.albums

    await loadAlbumPage()
}

async function loadAlbumPage() {
    
    const album = await getAlbum(album_name, artist)

    const album_title = document.getElementById('album-title')
    const album_artist = document.getElementById('album-artist')
    const album_cover = document.getElementById('album-cover')

    album_title.innerHTML = album.name
    album_artist.innerHTML = album.artist
    album_cover.src = album.image[4]['#text']

    getTracklistHTML(album_name, artist)
    getAlbumInfoHTML(album)

    await getAlbumColors()
}

function getTracklistHTML(album_name, artist) {

    const tracklist_div = document.getElementById('tracklist-items')
    
    const albumIndex = data.findIndex(album => album.name == album_name && album.artist == artist)

    const album_rate = document.getElementById('album-rate')
    let rating, average_track_rate
    if (data[albumIndex].rating == -1) rating = '&Oslash'
    else rating = data[albumIndex].rating
    if (data[albumIndex].average_track_rate == -1) average_track_rate = '&Oslash'
    else average_track_rate = data[albumIndex].average_track_rate
    album_rate.innerHTML = `${rating} | ${average_track_rate}`

    const tracklist = data[albumIndex].tracklist
    let i = 0

    if (tracklist[0].track_rating == -1) unrated = `&Oslash`

    tracklist.forEach(track => {
        tracklist_div.innerHTML += `<span>${++i}. ${track.title} ${(track.track_rating == -1)? '' : '| ' + track.track_rating}</span>`
    })
}

function getAlbumInfoHTML(album) {
    
    const album_info_tags = document.getElementById('album-info-tags')
    
    let i = 0
    album.tags.tag.forEach(tag => {
        if (i%2 == 0) {album_info_tags.innerHTML += `<span>• ${tag.name}</span>`}
        if (i%2 == 1) {album_info_tags.innerHTML += `<span>${tag.name} •</span>`}  
        i++      
    });

    const album_info_summary = document.getElementById('album-info-summary')

    if (album.wiki != undefined) album_info_summary.innerHTML = album.wiki.summary
    else album_info_summary.innerHTML = 'No wiki for this album'
}