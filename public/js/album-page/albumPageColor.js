// Use node-vibrant to get a palette
async function getAlbumColors() {

    // Get the image
    const img = document.getElementById('album-cover')

    // node-vibrant
    img.onload = () => {

        Vibrant.from(img)
        .maxColorCount(4)
        .quality(50)
        .getPalette()

        .then((palette) => {
            console.log(palette)
            albumColors(palette)
        })

        .catch((err) => {
            console.error('Erro ao extrair a paleta:', err)
        })
        
    }

}

// Use the palette in the album page
function albumColors(palette) {
    
    // Checks the best option for light color
    let light_background = [palette.Vibrant, palette.Muted, palette.LightVibrant, palette.LightMuted]
    light_background = light_background.reduce((maior, atual) => {
        return (atual.population > maior.population) ? atual : maior
    })
    light_background = `rgb(${light_background.rgb[0]}, ${light_background.rgb[1]}, ${light_background.rgb[2]})`

    // Checks the best option for dark color
    let dark_background = [palette.DarkVibrant, palette.DarkMuted]
    dark_background = dark_background.reduce((maior, atual) => {
        return (atual.population > maior.population) ? atual : maior
    })
    dark_background = `rgb(${dark_background.rgb[0]}, ${dark_background.rgb[1]}, ${dark_background.rgb[2]})`

    // Use the selected colors
    document.documentElement.style.setProperty('--album-background-light', light_background)
    document.documentElement.style.setProperty('--album-background-dark', dark_background)
}