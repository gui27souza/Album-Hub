// Modules import 
    const express = require('express')
    const path = require('path')
    const fs = require('fs')
    const readline = require('readline')
// 



// Server setup
    async function serverSetup() {
        const app = express()
        app.use(express.static(path.join(__dirname, 'public')))
        app.listen(2727, function () {
            console.log('Gate 2727')
            console.log('link: http://localhost:2727/views/index.html')
        })
    }
// 


// Creation of an object with the data
    const data = fs.readFileSync('./public/data/data.json')
    const jsonData = JSON.parse(data)
    let api_key = jsonData.api_key
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
            
            const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api_key}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album_name)}&format=json`)

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
            console.log('\nError fetching album tracklist')
            return -1
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

        const check =  await checkAlbum(album_name, artist)
        if (check == -1) return
        if (check.lenght == 2) {
            await addAlbum(check[0], check[1])
            return
        }

        const tracklist = await getTrackList(album_name, artist)
        const newAlbum = { name: album_name, artist: artist, "rating": -1, tracklist: tracklist, "average_track_rate": -1 }

        jsonData.albuns.push(newAlbum)

        const updatedData = JSON.stringify(jsonData, null, 3)
        fs.writeFileSync('./data.json', updatedData, 'utf8')

        console.log('\nAlbum added to you library!\n')

        let sub_command = await askQuestion('Would you like to rate it?\n1 - Yes\n2 - No\n\n')
        if (sub_command == 1) {
            let rating = await askQuestion('\nRating: ')
            await rateTracklist(album_name, artist, rating)
        }

        return 1
    }

// 

// Removes an album in the data object

    function removeAlbum(album_name, artist) {

        album_name = album_name.toLowerCase()
        artist = artist.toLowerCase()

        album_index = jsonData.albuns.findIndex(album => album.name === album_name && album.artist === artist)

        if (album_index == -1) {
            console.log(`\n'${album_name}' by '${artist}' is not in your library\n`)
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
            console.log(`\n'${album_name}' by '${artist}' is not in your library\n`)
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
            if (track_rating === '-' || isNaN(parseFloat(track_rating))) continue
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

// Search for an album

    async function searchAlbumData(search) {

        try {
            
            const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(search)}&limit=5&api_key=${api_key}&format=json`)

            const data = await response.json()

            return data.results.albummatches.album

        } catch (error) {
            console.log('Error fetching album search', error)
            return -1
        }

    }

// 

    async function checkAlbum(album_name, artist) {

        const tracklist = await getTrackList(album_name, artist)

        if (tracklist == -1) {
            
            const search = await searchAlbumData(album_name+' '+artist)
            if (search == -1 || search[0] == undefined) {
                console.log('Album not found\n')
                return -1
            }

            const answer1 = await askQuestion(`Did you meant ${search[0].name} by ${search[0].artist}?\n1 - Yes\n2 - No\n`)

            if (answer1 == 1) {
                album_name = search[0].name
                artist = search[0].artist
                return [album_name, artist]
            } else if (search[1] != undefined) {
                const answer2 = await askQuestion(`\nDid you meant ${search[1].name} by ${search[1].artist}?\n1 - Yes\n2 - No\n`)
                if (answer2 == 1) {
                    album_name = search[1].name
                    artist = search[1].artist
                    return [album_name, artist]
                }
            } else {
                console.log('Album not found\n')
                return -1
            }

        } else return 1

    }

// Main function

    const main = async () => {

        await serverSetup()

        if (jsonData.api_key == 0) {
            api_key = await askQuestion('Insert your LastFM API key: ')
            jsonData.api_key = api_key
            fs.writeFileSync('./data.json', JSON.stringify(jsonData, null, 2), 'utf8')
        }

        while (true) {

            console.log('\n\t-----Album Hub-----\n')
            
            let command = await askQuestion('1 - Add album\n2 - Rate Album\\Tracklist\n3 - Remove album\n4 - See my library\n5 - Search album\n6 - Search album tracklist\n\nctrl + c - End program\n\n')

            if (command == 1) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                await addAlbum(album_name, artist)
            }

            if (command == 2) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                let rating = await askQuestion('Rating: ')
                await rateTracklist(album_name, artist, rating)
            }

            if (command == 3) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                removeAlbum(album_name, artist)
            }

            if (command == 4) {
                console.log('')
                jsonData.albuns.forEach(album => {
                    console.log("Name:\t", album.name)
                    console.log("Artist:\t", album.artist)
                    console.log("Rating:\t", album.rating, '\n')
                })
            }

            if (command == 5) {
                
                let search = await askQuestion('\nSearch terms: ')
                let search_results = await searchAlbumData(search)

                console.log('')
                let i = 0
                search_results.forEach(album => {
                    console.log(`${++i} - ${album.name} by ${album.artist}`)
                })

                let sub_command1 = await askQuestion('\nWould you like to add any to your library?\n1 - Yes\n2 - No\n\n')
                if (sub_command1 == 1) {
                    let album_index = await askQuestion('\nType the value of the album in the list: ')
                    album_add = search_results[album_index-1]
                    await addAlbum(album_add.name, album_add.artist)
                }
            }

            if (command == 6) {

                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')

                console.log('')
                let tracklist = await getTrackList(album_name, artist)

                let i = 0
                tracklist.forEach(track => {
                    console.log(++i,'-',track.title)
                })

            }

        }

    }

    main()

// 