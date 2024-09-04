async function createAlbuns(album_name, artist, rating) {
            
    const album_element = document.createElement("div")
    const image_link = await getAlbumImageLink(album_name, artist)

    album_element.innerHTML = `
        <div class="album-item" data-name="${album_name}">
            <img src="${image_link}" alt="" class="album-image">
            <div class="album-text">
                <span class="album-name album-text-item">${album_name}</span>
                <span class="album-artist album-text-item">${artist}</span>
                <span class="album-rating album-text-item">${rating}</span>
            </div>
        </div>
    `;

    document.getElementById("album-container").appendChild(album_element)
}

async function getAlbumImageLink(album_name, artist) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=846d44d63f8f2e8a951c6e66b43a1a4c&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album_name)}&format=json`);
        const data = await response.json();
        return data.album.image[3]['#text'];
    } catch (error) {
        console.error('Error fetching album image:', error);
        return 'https://via.placeholder.com/150';
    }
}