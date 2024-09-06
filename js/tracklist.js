let tracklist_is_on = 0

function hideTracklist(album_name, artist) {
    const tracklist_container = document.getElementById('tracklist-container')
    const tracklist_div = document.getElementById('tracklist')

    if (tracklist_is_on) {
        tracklist_container.style.display = 'none'
        tracklist_is_on = 0
        tracklist_div.innerHTML = ''
    } else {
        tracklist_container.style.display = 'flex'
        tracklist_is_on = 1
        getTracklistHTML(album_name, artist)
    }
}

function getTracklistHTML(album_name, artist) {

    const tracklist_div = document.getElementById('tracklist')
    
    const albumIndex = data.albuns.findIndex(album => album.name == album_name && album.artist == artist)

    const tracklist = data.albuns[albumIndex].tracklist
    let i = 0

    if (tracklist[0].track_rating == -1)
    unrated = `&Oslash`

    tracklist.forEach(track => {
        tracklist_div.innerHTML += `<span>${++i}. ${track.title} ${(track.track_rating == -1)? '' : '| ' + track.track_rating}</span>`
    })
}