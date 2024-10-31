const rate_album_show = document.getElementById('rate-album-show')
const rate_album_hide = document.getElementById('rate-album-hide')

let track_counting = 0

const rate_album_container = document.getElementById('rate-album-container')

function showRateAlbum() {
    rate_album_container.style.display = 'flex'
}

function hideRateAlbum() {
    rate_album_container.style.display = 'none'
}

function loadRateAlbum(album_data) {

    const tracklist = album_data.tracklist
    const rate_album_tracklist = document.getElementById('rate-album-tracklist')

    tracklist.forEach(track => {
        rate_album_tracklist.innerHTML += `
            <div class="rate-album-track">
                <span 
                    class="rate-album-track-name" 
                    id="track-name-${track.number}" 
                    data-name="${track.title}"
                >
                    ${track.number}. ${track.title}
                </span>
                <hr>
                <input class="rate-album-track-rate" id="track-rate-${track.number}" type="text">
            </div>
        `

        track_counting++
    })


}

function submitRateAlbum() {

    const album_name = document.getElementById('album-title').innerText
    const album_artist = document.getElementById('album-artist').innerText

    let album_rate = document.getElementById('album-rate-input').value

    if (isNaN(album_rate) || album_rate.trim() == '') album_rate = -1

    const tracklist = []

    for (let i = 1; i<=track_counting; i++) {
        const track_name_html = document.getElementById(`track-name-${i}`)
        const track_rate_html = document.getElementById(`track-rate-${i}`)
        
        const track_name = track_name_html.dataset.name
        let track_rate = track_rate_html.value

        if (isNaN(track_rate) || track_rate.trim() == '') track_rate = -1

        tracklist.push({
            number: i,
            title: track_name,
            track_rate: Number(track_rate)
        })
    }
    
    putAlbumRate(album_rate, album_name, album_artist)
    putTracklistRate(tracklist, album_name, album_artist)
}