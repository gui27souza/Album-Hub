// Modules import 
    const fs = require('fs')
    const readline = require('readline')
    const path = require('path')
// 

// Creation of an object with the data
    const dataPath = path.join(__dirname, 'data.json')
    const data = fs.readFileSync(dataPath)
    const jsonData = JSON.parse(data)
// 


// Creation of an input interface on Node

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const askQuestion = (question) => {
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer)
            })
        })
    }

// 

// Gets an album tracklist by LastFM API

    async function getTrackList(album_name, artist) {

        try {
            
            const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=846d44d63f8f2e8a951c6e66b43a1a4c&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album_name)}&format=json`)

            const data = await response.json()
            let tracklist = []
            let i = 0

            data.album.tracks.track.forEach(track => {
                tracklist.push({
                    "number": ++i,
                    "title": track.name,
                    "track_rating": -1
                })
            })

            return tracklist

        } catch (error) {
            console.log('Error fetching album tracklist')
            return []
        }

    }

// 

// Adds an album to the data object

    async function addAlbum(album_name, artist) {

        album_name = album_name.toLowerCase()
        artist = artist.toLowerCase()

        const albumIndex = jsonData.albuns.findIndex(album => album.name === album_name && album.artist === artist)
        if(albumIndex != -1) {
            console.log(`\n'${album_name}' by '${artist}' is already in your library!\n`)
            return -1
        }

        const tracklist = await getTrackList(album_name, artist)
        if (tracklist == []) {
            return -1
        }

        const newAlbum = { name: album_name, artist: artist, "rating": -1, tracklist: tracklist, "average_track_rate": -1 }

        jsonData.albuns.push(newAlbum)

        const updatedData = JSON.stringify(jsonData, null, 3)
        fs.writeFileSync('./data.json', updatedData, 'utf8')

        return 1
    }

// 

// Removes an album in the data object

    function removeAlbum(album_name, artist) {

        album_name = album_name.toLowerCase()
        artist = artist.toLowerCase()

        album_index = jsonData.albuns.findIndex(album => album.name === album_name && album.artist === artist)

        if (album_index == -1) {
            console.log(`'${album_name}' by '${artist}' is not in your library\n`)
            return
        }

        jsonData.albuns.splice(album_index, 1)
        console.log(`\n'${album_name}' by '${artist}' was removed from your library!\n`)

        const updatedData = JSON.stringify(jsonData, null, 3)
        fs.writeFileSync('./data.json', updatedData, 'utf8')
    }

// 

// Rates tracklist track by track

    async function rateTracklist(album_name, artist, rating) {

        album_name = album_name.toLowerCase()
        artist = artist.toLowerCase()
        
        const albumIndex = jsonData.albuns.findIndex(album => album.name === album_name && album.artist === artist)

        if (albumIndex === -1) {
            console.log('This album is not in your library')
            return
        }

        const album = jsonData.albuns[albumIndex]

        album.rating = parseFloat(rating).toFixed(1)
        if (rating == 10) album.rating = 10

        let rate_tracks = await askQuestion(`\nWould you like to rate the tracks?\n1 - Yes\n2 - No\n\n`)
        if (rate_tracks != 1) {
        
            const updatedData = JSON.stringify(jsonData, null, 3)
            fs.writeFileSync('./data.json', updatedData, 'utf8')

            return
        }

        const tracklist = await getTrackList(album_name, artist)

        let total_rate = 0
        let total_tracks = 0

        console.log('')
        for (const track of tracklist) {
            let track_rating = await askQuestion(`${track.title}: `)
            track.track_rating = track_rating
            total_rate += parseFloat(track_rating)
            total_tracks++
        }

        let average_rating = total_rate / total_tracks

        album.tracklist = tracklist
        album.average_track_rate = average_rating.toFixed(1)

        console.log(`\nThe average track rating is ${average_rating.toFixed(1)}!\n`)

        const updatedData = JSON.stringify(jsonData, null, 3)
        fs.writeFileSync('./data.json', updatedData, 'utf8')
    }

// 

// Main function

    const main = async () => {

        let kill_program = 0

        while (!kill_program) {

            console.log('\n\t-----Album Hub-----\n')
            
            let command = await askQuestion('1 - Add album\n2 - See my library\n3 - Remove album\n4 - Rate Album\\Tracklist\n\n0 - End program\n\n')

            if (command == 1) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                let album_added = await addAlbum(album_name, artist)
                if (album_added == -1) {rl.close(); return}
                console.log('\nAlbum added to you library!\n')
                let sub_command = await askQuestion('Would you like to rate it?\n1 - Yes\n2 - No\n\n')
                if (sub_command == 1) {
                    let rating = await askQuestion('\nRating: ')
                    await rateTracklist(album_name, artist, rating)
                }
            }

            if (command == 2) {
                const data = require("./data.json")

                console.log('')
                data.albuns.forEach(album => {
                    console.log("Name:\t", album.name)
                    console.log("Artist:\t", album.artist)
                    console.log("Rating:\t", album.rating, '\n')
                })
            }

            if (command == 3) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                removeAlbum(album_name, artist)
            }

            if (command == 4) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                let rating = await askQuestion('Rating: ')
                await rateTracklist(album_name, artist, rating)
            }

            if (command == 0) {
                kill_program = 1
            }
        }

        rl.close()
    }

    main()

// 