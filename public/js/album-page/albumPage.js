

// 
document.addEventListener('DOMContentLoaded', () => {

    getUserData()
    loadJSON()

    const params = new URLSearchParams(window.location.search)
    album_name = params.get('album')
    artist = params.get('artist')
})

// Get the album data from LastFM API
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



// Put the album data in the HTML elements
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

// Put the album tracklist and tracklist data in the HTML elements
function getTracklistHTML(album_name, artist) {

    // HTML elements
    const tracklist_div = document.getElementById('tracklist-items')
    const album_rate = document.getElementById('album-rate')
    
    // Find album index in the data
    const albumIndex = data.findIndex(album => album.name == album_name && album.artist == artist)

    // Get album rate
    let rate, average_track_rate
    if (data[albumIndex].rate == -1) rate = '&Oslash'
    else rate = data[albumIndex].rate
    if (data[albumIndex].average_track_rate == -1) average_track_rate = '&Oslash'
    else average_track_rate = data[albumIndex].average_track_rate
    album_rate.innerHTML = `${rate} | ${average_track_rate}`

    // Get tracklist, and if there is, rate
    const tracklist = data[albumIndex].tracklist
    let i = 0
    if (tracklist[0].track_rate == -1) unrated = `&Oslash`
    tracklist.forEach(track => {
        tracklist_div.innerHTML += `<span>${++i}. ${track.title} ${(track.track_rate == -1)? '' : '| ' + track.track_rate}</span>`
    })

}

// Put the album infor in the HTML
function getAlbumInfoHTML(album) {
    
    // HTML elements
    const album_info_tags = document.getElementById('album-info-tags')
    
    // Album tags
    let i = 0
    album.tags.tag.forEach(tag => {
        if (i%2 == 0) {album_info_tags.innerHTML += `<span>• ${tag.name}</span>`}
        if (i%2 == 1) {album_info_tags.innerHTML += `<span>${tag.name} •</span>`}  
        i++      
    });

    // Album wiki
    const album_info_summary = document.getElementById('album-info-summary')
    if (album.wiki != undefined) album_info_summary.innerHTML = album.wiki.summary
    else album_info_summary.innerHTML = 'No wiki for this album'
}