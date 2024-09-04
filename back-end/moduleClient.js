const data = require("./data.json")

data.albuns.forEach(album => {
    console.log("Name:\t", album.name)
    console.log("Artist:\t", album.artist)
    console.log("Rating:\t", album.rating, '\n')
})