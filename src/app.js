// Module import

    const {addAlbum, removeAlbum} = require('./app-modules/items-manage')
    const {searchTerms, searchTracklist} = require('./app-modules/items-search')
    const {rateTracklist} = require('./app-modules/items-rate')
// 



// Main function
    
    async function main() {

        
        // Check user data
        await checkUserData(user_data)


        // Keeps the program on until the user close it
        while (true) {

            // Add album
            if (command == 1) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                await addAlbum(album_name, artist, data, user_data.api_key)
                await wait(2000)
            }

            // Rate album/tracklist
            if (command == 2) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                await rateTracklist(album_name, artist, data, user_data.api_key, true)
                await wait(2000)
            }

            // Remove album
            if (command == 3) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                removeAlbum(album_name, artist, data)
                await wait(2000)
            }

            // Search album
            if (command == 4) {
                let search = await askQuestion('\nSearch terms: ')
                await searchTerms(search, data, user_data.api_key)
                await wait(3000)
            }

            // Search album tracklist
            if (command == 5) {
                let album_name = await askQuestion('\nAlbum Name: ')
                let artist = await askQuestion('Artist: ')
                await searchTracklist(album_name, artist, user_data.api_key)
                await wait(5000)
            }

            if (command == 0) {
                console.log('')
                process.exit(0)
            }

        }

    }
    
    main()

// 

// Check if the user already has a username and a LastFM API key
async function checkUserData(user_data) {

    if (user_data.username == -1) {
        username = await askQuestion('Insert an username: ')
        user_data.username = username
        updateData(user_data, 'user-data')
    }

    if (user_data.api_key == -1) {
        api_key = await askQuestion('Insert your LastFM API key: ')
        user_data.api_key = api_key
        updateData(user_data, 'user-data')
    }  
}