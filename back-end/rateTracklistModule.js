const fs = require('fs')
const readline = require('readline')

const data = fs.readFileSync('./data.json')
const jsonData = JSON.parse(data)

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
                "track_rating": 0
            })
        })
        return tracklist
    } catch (error) {
        console.log('Error fetching album tracklist')
        return []
    }
}

const run = async () => {
    album_name = await askQuestion('Album Name: ')
    artist = await askQuestion('Artist: ')

    const albumIndex = jsonData.albuns.findIndex(album => album.name === album_name && album.artist === artist)

    if (albumIndex === -1) {
        console.log('This album is not in your library')
        rl.close()
        return
    }

    const album = jsonData.albuns[albumIndex]

    const tracklist = await getTrackList(album_name, artist)

    let total_rate = 0
    let total_tracks = 0

    for (const track of tracklist) {
        const rating = await askQuestion(`${track.title}: `)
        track.track_rating = rating
        total_rate += rating
        total_tracks = track.number
    }

    rl.close()

    let average_rating = total_rate / total_tracks

    jsonData.albuns[albumIndex].tracklist = tracklist
    jsonData.albuns[albumIndex].average_track_rate = average_rating.toFixed(1)

    console.log(`The average track rate is ${average_rating.toFixed(1)}`)

    const updatedData = JSON.stringify(jsonData, null, 3)
    fs.writeFileSync('./data.json', updatedData, 'utf8')
}

run()