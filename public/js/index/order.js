previous_order_type = ''

function order(order_type) {

    if (previous_order_type == 'unrated') {
        document.getElementById('album-container').innerHTML = ''
        data.forEach(album => {
            createAlbuns(album.name, album.artist, album.rating, album.average_track_rate)
        })
    }

    let all_items = Array.from(document.getElementsByClassName('album-item'))

    let all_items_ordered = sortBy(all_items, order_type)

    document.getElementById('album-container').innerHTML = ''

    all_items_ordered.forEach(item => document.getElementById('album-container').appendChild(item))

    inputSelect(order_type)
    
    previous_order_type = order_type
}

function sortBy(all_items, order_type) {
    
    switch (order_type) {
        
        case 'random':
            all_items.sort(() => Math.random() - 0.5)
        break
        
        case 'name_des':
            
            all_items.sort((a, b) => {
                const nameA = a.getAttribute('data-album').toUpperCase()
                const nameB = b.getAttribute('data-album').toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })
            
        break
        
        case 'name_asc':

            all_items.sort((a, b) => {
                const nameA = a.getAttribute('data-album').toUpperCase()
                const nameB = b.getAttribute('data-album').toUpperCase()
                if (nameA > nameB) {
                    return -1
                }
                if (nameA < nameB) {
                    return 1
                }
                return 0
            })

        break

        case 'artist_des':

            all_items.sort((a, b) => {
                const nameA = a.getAttribute('data-album').toUpperCase()
                const nameB = b.getAttribute('data-album').toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })
        
            all_items.sort((a, b) => {
                const nameA = a.getAttribute('data-artist').toUpperCase()
                const nameB = b.getAttribute('data-artist').toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })

        break
        
        case 'artist_asc':

            all_items.sort((a, b) => {
                const nameA = a.getAttribute('data-album').toUpperCase()
                const nameB = b.getAttribute('data-album').toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })
        
            all_items.sort((a, b) => {
                const nameA = a.getAttribute('data-artist').toUpperCase()
                const nameB = b.getAttribute('data-artist').toUpperCase()
                if (nameA > nameB) {
                    return -1
                }
                if (nameA < nameB) {
                    return 1
                }
                return 0
            })

        break
        
        case 'rate_des':
            
            all_items.sort((a, b) => {
                const nameA = a.getAttribute('data-album').toUpperCase()
                const nameB = b.getAttribute('data-album').toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })

            all_items.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-rate'))
                const priceB = parseFloat(b.getAttribute('data-rate'))
                return priceB - priceA
            })
        break
        
        case 'rate_asc':

            all_items.sort((a, b) => {
                const nameA = a.getAttribute('data-album').toUpperCase()
                const nameB = b.getAttribute('data-album').toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })

            all_items.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-rate'))
                const priceB = parseFloat(b.getAttribute('data-rate'))
                return priceA - priceB
            })
        break
        
        case 'unrated':

            all_items.sort((a, b) => {
                const nameA = a.getAttribute('data-album').toUpperCase()
                const nameB = b.getAttribute('data-album').toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })

            all_items = all_items.filter(item => item.getAttribute('data-rate') == '-1')

        break

    }

    return all_items
}

function inputSelect(order_type) {

    const input_select = document.getElementsByClassName('order-option')
    
    switch (order_type) {
        
        case 'random':
            input_select[1].style.display = 'block'
            input_select[1].innerHTML = 'Name'
            input_select[2].style.display = 'none'
            
            input_select[3].style.display = 'block'
            input_select[3].innerHTML = 'Artist'
            input_select[4].style.display = 'none'

            input_select[5].style.display = 'block'
            input_select[5].innerHTML = 'Rate'
            input_select[6].style.display = 'none'
        break
        
        case 'name_des':
            input_select[1].style.display = 'none'
            input_select[1].innerHTML = 'Name &#8595;'
            input_select[2].innerHTML = 'Name &#8595;'
            input_select[2].style.display = 'block'
            
            input_select[3].style.display = 'block'
            input_select[3].innerHTML = 'Artist'
            input_select[4].style.display = 'none'

            input_select[5].style.display = 'block'
            input_select[5].innerHTML = 'Rate'
            input_select[6].style.display = 'none'
        break
        
        case 'name_asc':
            input_select[1].style.display = 'block'
            input_select[1].innerHTML = 'Name &#8593;'
            input_select[2].innerHTML = 'Name &#8593;'
            input_select[2].style.display = 'none'
            
            input_select[3].style.display = 'block'
            input_select[3].innerHTML = 'Artist'
            input_select[4].style.display = 'none'

            input_select[5].style.display = 'block'
            input_select[5].innerHTML = 'Rate'
            input_select[6].style.display = 'none'
        break

        case 'artist_des':
            input_select[1].style.display = 'block'
            input_select[1].innerHTML = 'Name'
            input_select[2].style.display = 'none'
            
            input_select[3].style.display = 'none'
            input_select[3].innerHTML = 'Artist &#8595;'
            input_select[4].innerHTML = 'Artist &#8595;'
            input_select[4].style.display = 'block'

            input_select[5].style.display = 'block'
            input_select[5].innerHTML = 'Rate'
            input_select[6].style.display = 'none'
        break
        
        case 'artist_asc':
            input_select[1].style.display = 'block'
            input_select[1].innerHTML = 'Name'
            input_select[2].style.display = 'none'
            
            input_select[3].style.display = 'block'
            input_select[3].innerHTML = 'Artist &#8593;'
            input_select[4].innerHTML = 'Artist &#8593;'
            input_select[4].style.display = 'none'

            input_select[5].style.display = 'block'
            input_select[5].innerHTML = 'Rate'
            input_select[6].style.display = 'none'
        break
        
        case 'rate_des':
            input_select[1].style.display = 'block'
            input_select[1].innerHTML = 'Name'
            input_select[2].style.display = 'none'
            
            input_select[3].style.display = 'block'
            input_select[3].innerHTML = 'Artist'
            input_select[4].style.display = 'none'

            input_select[5].style.display = 'none'
            input_select[5].innerHTML = 'Rate &#8595;'
            input_select[6].innerHTML = 'Rate &#8595;'
            input_select[6].style.display = 'block'
        break
        
        case 'rate_asc':
            input_select[1].style.display = 'block'
            input_select[1].innerHTML = 'Name'
            input_select[2].style.display = 'none'
            
            input_select[3].style.display = 'block'
            input_select[3].innerHTML = 'Artist'
            input_select[4].style.display = 'none'

            input_select[5].style.display = 'block'
            input_select[5].innerHTML = 'Rate &#8593;'
            input_select[6].innerHTML = 'Rate &#8593;'
            input_select[6].style.display = 'none'
        break

        case 'unrated':
            input_select[1].style.display = 'block'
            input_select[1].innerHTML = 'Name'
            input_select[2].style.display = 'none'
            
            input_select[3].style.display = 'block'
            input_select[3].innerHTML = 'Artist'
            input_select[4].style.display = 'none'

            input_select[5].style.display = 'block'
            input_select[5].innerHTML = 'Rate'
            input_select[6].style.display = 'none'
        break
    }
}