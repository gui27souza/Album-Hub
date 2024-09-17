async function getAlbumColors() {

    const img = document.getElementById('album-cover')
  
    img.onload = () => {

        Vibrant.from(img)
        .maxColorCount(3)
        .getPalette()

        .then((palette) => {
            console.log(palette)
            albumColors(palette)
            paletteTester(palette)
        })

        .catch((err) => {
            console.error('Erro ao extrair a paleta:', err)
        })
        
    }
}

function albumColors(palette) {
    
    const vibrant = `rgb(${palette.Vibrant.rgb[0]}, ${palette.Vibrant.rgb[1]}, ${palette.Vibrant.rgb[2]})`
    const vibrant_population = palette.Vibrant.population

    const vibrant_dark = `rgb(${palette.DarkVibrant.rgb[0]}, ${palette.DarkVibrant.rgb[1]}, ${palette.DarkVibrant.rgb[2]})`
    const vibrant_dark_population = palette.DarkVibrant.population

    const vibrant_light = `rgb(${palette.LightVibrant.rgb[0]}, ${palette.LightVibrant.rgb[1]}, ${palette.LightVibrant.rgb[2]})`
    const vibrant_light_population = palette.LightVibrant.population

    const muted = `rgb(${palette.Muted.rgb[0]}, ${palette.Muted.rgb[1]}, ${palette.Muted.rgb[2]})`
    const muted_population = palette.Muted.population

    const muted_dark = `rgb(${palette.DarkMuted.rgb[0]}, ${palette.DarkMuted.rgb[1]}, ${palette.DarkMuted.rgb[2]})`
    const muted_dark_population = palette.DarkMuted.population

    const muted_light = `rgb(${palette.LightMuted.rgb[0]}, ${palette.LightMuted.rgb[1]}, ${palette.LightMuted.rgb[2]})`
    const muted_light_population = palette.LightMuted.population
    
    document.documentElement.style.setProperty('--vibrant', vibrant)
    document.documentElement.style.setProperty('--dark-vibrant', vibrant_dark)
    document.documentElement.style.setProperty('--light-vibrant', vibrant_light)
    
    document.documentElement.style.setProperty('--muted', muted)
    document.documentElement.style.setProperty('--dark-muted', muted_dark)
    document.documentElement.style.setProperty('--light-muted', muted_light)

    if (muted_light_population > vibrant_light_population) document.documentElement.style.setProperty('--album-sub-items', muted_light)
    else document.documentElement.style.setProperty('--album-sub-items', vibrant_light)
    
    
    document.documentElement.style.setProperty('--album-background-dark', 1)
    document.documentElement.style.setProperty('--album-background-light', 1)
    document.documentElement.style.setProperty('--album-container', 1)
    document.documentElement.style.setProperty('--album-sub-items', 1)
}

function paletteTester(palette) {

    for (const color in palette) {
        const HTML_element = document.getElementById(`${color}`);
        HTML_element.innerHTML = `${palette[color].population}`;
    }

}