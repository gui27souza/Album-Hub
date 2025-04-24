// Use the palette in the album page

    function albumColors(palette) {
        
        // Checks the best option for light color
        let light_background = [palette.Vibrant, palette.Muted, palette.LightVibrant, palette.LightMuted]
        light_background = light_background.reduce((max, current) => {
            return (current.population > max.population) ? current : max
        }).color

        // Checks the best option for dark color
        let dark_background = [palette.DarkVibrant, palette.DarkMuted]
        dark_background = dark_background.reduce((max, current) => {
            return (current.population > max.population) ? current : max
        }).color

        // Use the selected colors
        document.documentElement.style.setProperty('--album-background-light', light_background)
        document.documentElement.style.setProperty('--album-background-dark', dark_background)
    }

// 