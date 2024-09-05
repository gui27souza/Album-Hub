const fs = require('fs')
const readline = require('readline')

const data = fs.readFileSync('./data.json')

const jsonData = JSON.parse(data)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let album_name, artist, rating

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
    rating = await askQuestion('Rating: ')

    rl.close()

    const tracklist = await getTrackList(album_name, artist)

    const newAlbum = { name: album_name, artist: artist, rating: rating, tracklist: tracklist, "average_track_rate": 0 }

    jsonData.albuns.push(newAlbum)

    const updatedData = JSON.stringify(jsonData, null, 3)
    fs.writeFileSync('./data.json', updatedData, 'utf8')
}

run()