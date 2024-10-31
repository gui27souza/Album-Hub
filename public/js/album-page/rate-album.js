const rate_album_show = document.getElementById('rate-album-show')
const rate_album_hide = document.getElementById('rate-album-hide')

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
    })

}