async function getAlbumColors() {

    const img = document.getElementById('album-cover')
  
    img.onload = () => {

        Vibrant.from(img).getPalette()

        .then((palette) => {
            console.log(palette)
            albumColors(palette)
        })

        .catch((err) => {
            console.error('Erro ao extrair a paleta:', err)
        })
    }
}

function albumColors(palette) {
    
    const vibrant = `rgb(${palette.Vibrant.rgb[0]}, ${palette.Vibrant.rgb[1]}, ${palette.Vibrant.rgb[2]})`
    const vibrant_light = `rgb(${palette.LightVibrant.rgb[0]}, ${palette.LightVibrant.rgb[1]}, ${palette.LightVibrant.rgb[2]})`
    const vibrant_dark = `rgb(${palette.DarkVibrant.rgb[0]}, ${palette.DarkVibrant.rgb[1]}, ${palette.DarkVibrant.rgb[2]})`
    
    document.documentElement.style.setProperty('--vibrant', vibrant)
    document.documentElement.style.setProperty('--light-vibrant', vibrant_light)
    document.documentElement.style.setProperty('--dark-vibrant', vibrant_dark)
}