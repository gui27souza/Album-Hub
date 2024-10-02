async function getAlbumData(album_name, artist) {
    
    try {
        const response = await fetch(`/data/album/?album_name=${encodeURIComponent(album_name)}&artist=${encodeURIComponent(artist)}`)

        const album_data = await response.json()

        return album_data
    }

    catch(error) {
        console.error('ERROR: error fetching the album', error)
        return false
    }
}