async function createAlbuns(album_name, artist, rating, average_track_rate) {
            
    const album_element = document.createElement("div")
    album_element.classList.add('album-item')
    album_element.setAttribute('onclick', `hideTracklist('${album_name}', '${artist}')`)
    album_element.setAttribute('data-album', `${album_name}`)
    album_element.setAttribute('data-artist', `${artist}`)

    const album_object = await getAlbum(album_name, artist)
    const image_link = album_object.image[3]['#text']

    if (rating == -1) rating = `&Oslash`
    if (average_track_rate == -1) average_track_rate = `&Oslash`

    album_element.innerHTML = `
        <img src="${image_link}" alt="" class="album-image">
        <div class="album-text">
            <span class="album-name album-text-item">${album_object.name}</span>
            <span class="album-artist album-text-item">${album_object.artist}</span>
            <span class="album-rating album-text-item">Rate: ${rating} | Tracks rate: ${average_track_rate}</span>
        </div>
    `;

    document.getElementById("album-container").appendChild(album_element)
}

async function getAlbum(album_name, artist) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=846d44d63f8f2e8a951c6e66b43a1a4c&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album_name)}&format=json`);
        const data = await response.json();
        return data.album;
    } catch (error) {
        console.error('Error fetching album', error);
        return {};
    }
}