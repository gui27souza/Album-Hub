// Global var that will recieve the JSON data
let data = []
let api_key

// Makes sure that the data store happens once
document.addEventListener('DOMContentLoaded', () => {
    loadJSON()
})

// Get th data from the JSON file and uses it

    async function loadJSON() {

        // Gets the data of the JSON
        const response = await fetch('../data.json')
        
        // Store data in global var
        data = await response.json()
        console.log(data)
        api_key = data.api_key
        data = data.albuns

        
        // Check the loaded data
        console.log(data)
        
        // Loads all the albuns in the home page
        data.forEach(album => {
            createAlbuns(album.name, album.artist, album.rating, album.average_track_rate)
        })
    }

// 

// Creates the album HTML element in the interface

    async function createAlbuns(album_name, artist, rating, average_track_rate) {

        // Creates and add classes and attributes to the item div
        const album_element = document.createElement("div")
        album_element.classList.add('album-item')
        album_element.setAttribute('onclick', `tracklist('${album_name}', '${artist}')`)
        album_element.setAttribute('data-album', `${album_name}`)
        album_element.setAttribute('data-artist', `${artist}`)
        album_element.setAttribute('data-rate', `${rating}`)

        // Gets the actual album name and cover
        const album_object = await getAlbum(album_name, artist)
        const image_link = album_object.image[4]['#text']

        // In case is not rated yet
        if (rating == -1) rating = `&Oslash`
        if (average_track_rate == -1) average_track_rate = `&Oslash`

        // HTML element
        album_element.innerHTML = `
            <img src="${image_link}" alt="" class="album-image">
            <div class="album-text">
                <span class="album-name album-text-item">${album_object.name}</span>
                <span class="album-artist album-text-item">${album_object.artist}</span>
                <span class="album-rating album-text-item">Rate: ${rating} | Tracks rate: ${average_track_rate}</span>
            </div>
        `;

        // Appends item to the container
        document.getElementById("album-container").appendChild(album_element)
    }

// 

// Gets the actual album object

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

// 