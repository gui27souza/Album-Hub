const {serverSetup} = require('./server')
const {readData, readUserData, updateData} = require('./file-handler')
const {askQuestion} = require('./user-interface')
const {getTracklist, searchAlbumData, checkAlbum} = require('./api')



async function main() {

    const user_data = readUserData()
    const data = readData()
    
    await checkUserData(user_data)

    await serverSetup()

    console.log(`\nWelcome, ${user_data.username} !`)

    while (true) {

        console.log('\n\t-----Album Hub-----\n')
            
        let command = await askQuestion('1 - Add album\n2 - Rate Album\\Tracklist\n3 - Remove album\n4 - Search album\n5 - Search album tracklist\n\nctrl + c - End program\n\n')

        if (command == 1) {
            let album_name = await askQuestion('\nAlbum Name: ')
            let artist = await askQuestion('Artist: ')
            await addAlbum(album_name, artist, data, user_data.api_key)
        }

        if (command == 2) {
            let album_name = await askQuestion('\nAlbum Name: ')
            let artist = await askQuestion('Artist: ')
            await rateTracklist(album_name, artist, data, user_data.api_key, true)
        }

        if (command == 3) {
            let album_name = await askQuestion('\nAlbum Name: ')
            let artist = await askQuestion('Artist: ')
            removeAlbum(album_name, artist, data)
        }

        if (command == 4) {
            let search = await askQuestion('\nSearch terms: ')
            await searchTerms(search, data, user_data.api_key)
        }

        if (command == 5) {
            let album_name = await askQuestion('\nAlbum Name: ')
            let artist = await askQuestion('Artist: ')
            await searchTracklist(album_name, artist, user_data.api_key)
        }
    }
}

main()

async function checkUserData(user_data) {

    if (user_data.username == -1) {
        username = await askQuestion('Insert an username: ')
        user_data.username = username
        updateData(user_data, 'user-data')
    }

    if (user_data.api_key == -1) {
        api_key = await askQuestion('Insert your LastFM API key: ')
        user_data.api_key = api_key
        updateData(user_data, 'user-data')
    }  
}

async function addAlbum(album_name, artist, data, api_key) {
    
    album_name = album_name.toLowerCase()
    artist = artist.toLowerCase()

    const albumIndex = data.albums.findIndex(album => album.name === album_name && album.artist === artist)
    if(albumIndex != -1) {
        console.log(`\n'${album_name}' by '${artist}' is already in your library!\n`)
        return -1
    }

    const check = await checkAlbum(album_name, artist, api_key)
    if (check == -1) return
    if (check.length == 2) {
        await addAlbum(check[0], check[1], data, api_key)
        return
    }

    const tracklist = await getTracklist(album_name, artist, api_key)
    const newAlbum = { 
        name: album_name,
        artist: artist,
        "rating": -1,
        tracklist: tracklist,
        "average_track_rate": -1 
    }    

    data.albums.push(newAlbum)

    let command = await askQuestion('\nWould you like to rate it?\n1 - Yes\n2 - No\n\n')
    if (command == 1) await rateTracklist(album_name, artist, data, api_key)

    updateData(data, 'data')
    console.log('\nAlbum added to you library!\n')

    return 1
}

function removeAlbum(album_name, artist, data) {

    album_name = album_name.toLowerCase()
    artist = artist.toLowerCase()

    album_index = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

    if (album_index == -1) {
        console.log(`\n'${album_name}' by '${artist}' is not in your library\n`)
        return
    }

    data.albums.splice(album_index, 1)
    console.log(`\n'${album_name}' by '${artist}' was removed from your library!\n`)

    updateData(data, 'data')
}

async function searchTerms(search, data, api_key) {

    let search_results = await searchAlbumData(search, api_key)

    if (search_results.length == 0) {
        console.log('No items found\n')
        return
    }

    console.log('')
    let i = 0
    search_results.forEach(album => {
        console.log(`${++i} - ${album.name} by ${album.artist}`)
    })

    let command = await askQuestion('\nWould you like to add any to your library?\n1 - Yes\n2 - No\n\n')
    if (command == 1) {
        let album_index = await askQuestion('\nType the value of the album in the list: ')
        album_add = search_results[album_index-1]
        await addAlbum(album_add.name, album_add.artist, data, api_key)
    }
}

async function searchTracklist(album_name, artist, api_key) {
    
    let check = await checkAlbum(album_name, artist, api_key)
    if (check.length == 2) {
        album_name = check[0]
        artist = check[1]
    }

    let tracklist = await getTracklist(album_name, artist, api_key)
    if (tracklist == -1) return
    
    console.log('')
    let i = 0
    tracklist.forEach(track => {
        console.log(++i,'-',track.title)
    })
}

async function rateTracklist(album_name, artist, data, api_key) {

    album_name = album_name.toLowerCase()
    artist = artist.toLowerCase()
    
    const albumIndex = data.albums.findIndex(album => album.name === album_name && album.artist === artist)

    if (albumIndex === -1) {
        console.log(`\n'${album_name}' by '${artist}' is not in your library\n`)
        return
    }

    const album = data.albums[albumIndex]

    let album_rating = await askQuestion('\nRating: ')
    album.rating = parseFloat(album_rating).toFixed(1)

    let rate_tracks = await askQuestion(`\nWould you like to rate the tracks?\n1 - Yes\n2 - No\n\n`)
    if (rate_tracks == 1) {

        const tracklist = await getTracklist(album_name, artist, api_key)

        let total_rate = 0
        let total_tracks = 0

        console.log('')
        for (const track of tracklist) {
            let track_rating = await askQuestion(`${track.title}: `)
            track.track_rating = track_rating
            if (track_rating === '-' || isNaN(parseFloat(track_rating))) continue
            total_rate += parseFloat(track_rating)
            total_tracks++
        }

        let average_rating = total_rate / total_tracks

        album.tracklist = tracklist
        album.average_track_rate = average_rating.toFixed(1)

        console.log(`\nThe average track rating is ${average_rating.toFixed(1)}!\n`)
    }
    
    updateData(data, 'data')
}