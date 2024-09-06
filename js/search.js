// Variables

    var searchbar = document.getElementById("searchbar")
        
    var all_albums = document.getElementsByClassName("album-item")

    var there_is_item = 0

    const margin_bottom_actions = document.getElementById('actions-container').style.marginBottom
    const padding_bottom_actions = document.getElementById('actions-container').style.paddingBottom

// 

// Event listener that changes the display according the search progress

    searchbar.addEventListener("input", function() {

        there_is_item = 0

        // Gets the value
        const input_value = searchbar.value.trim().toLowerCase()

        for (let item of all_albums) {

            let album_name = item.getAttribute('data-album')
            let artist = item.getAttribute('data-artist')

            if (album_name.includes(input_value) || artist.includes(input_value) ||
            (album_name + ' ' + artist).includes(input_value) || (artist + ' ' + album_name).includes(input_value)) {
                item.style.display = 'flex'

                there_is_item = 1
            } else {
                item.style.display = 'none'
            }
        }

        noItemsFound(there_is_item)

    })

// 



// no-items-found manager

    function noItemsFound(there_is_item) {
        
        // Gets HTML elements
            const container = document.getElementById('album-container')
            const actions = document.getElementById('actions-container')
            const no_items_found = document.getElementById('no-items-found')
        // 

        if (!there_is_item) {
                
            no_items_found.style.display = "block"
            
            actions.style.marginBottom = 0
            actions.style.paddingBottom = 0
            actions.style.borderRadius = '.5rem .5rem 0 0'

            container.style.visibility = 'hidden'
        } else {

            no_items_found.style.display = "none"
            
            actions.style.marginBottom = margin_bottom_actions
            actions.style.paddingBottom = padding_bottom_actions
            actions.style.borderRadius = '.5rem'

            container.style.visibility = 'visible'
        }
    }

// 