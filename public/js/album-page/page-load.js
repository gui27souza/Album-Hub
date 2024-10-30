// Page load

    document.addEventListener('DOMContentLoaded', async () => {

        const params = new URLSearchParams(window.location.search)
        album_name = params.get('album')
        artist = params.get('artist')

        const album_data = await getAlbumData(album_name, artist)
        
        loadAlbumPage(album_data)
        loadRateAlbum(album_data)
    })

// 

// Put the album data in the HTML elements

    async function loadAlbumPage(album_data) {

        const album_title = document.getElementById('album-title')
        album_title.innerHTML = album_data.name

        const album_artist = document.getElementById('album-artist')
        album_artist.innerHTML = album_data.artist
        
        const album_cover = document.getElementById('album-cover')
        album_cover.src = album_data.cover

        await getAlbumColors()

        // Rate and Tracklist

            const tracklist_div = document.getElementById('tracklist-items')
            const album_rate = document.getElementById('album-rate')

            if (album_data.rate == -1) album_data.rate = '&Oslash'
            if (album_data.average_track_rate == -1) album_data.average_track_rate = '&Oslash'

            album_rate.innerHTML = `${album_data.rate} | ${album_data.average_track_rate}`

            let i = 0
            album_data.tracklist.forEach(track => {
                tracklist_div.innerHTML += `<span>${++i}. ${track.title} ${(track.track_rate == -1)? '' : '| ' + track.track_rate}</span>`
            })

        // 

        // Tags
        
            const album_info_tags = document.getElementById('album-info-tags')

            i = 0
            album_data.tags.forEach(tag => {
                if (i%2 == 0) {album_info_tags.innerHTML += `<span>• ${tag}</span>`}
                if (i%2 == 1) {album_info_tags.innerHTML += `<span>${tag} •</span>`}  
                i++      
            })
        
        // 

        // Wiki

            const album_info_summary = document.getElementById('album-info-summary')

            if (album_data.wiki == -1) album_info_summary.innerHTML ='No wiki for this album'
            else album_info_summary.innerHTML = album_data.wiki

        // 
    }

// 