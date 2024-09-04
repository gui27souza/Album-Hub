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

const run = async () => {
    album_name = await askQuestion('Album Name: ')
    artist = await askQuestion('Artist: ')
    rating = await askQuestion('Rating: ')

    rl.close()

    const newAlbum = { name: album_name, artist: artist, rating: rating }

    jsonData.albuns.push(newAlbum)

    const updatedData = JSON.stringify(jsonData, null, 3)
    fs.writeFileSync('./data.json', updatedData, 'utf8')
}

run()