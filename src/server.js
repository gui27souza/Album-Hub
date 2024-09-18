// Module imports
const path = require('path')
const express = require('express')
const {askQuestion} = require('./user-interface')

// Setup the server by express
async function serverSetup() {
    
    // Creates a localhost server with the gate 2727
    const app = express()
    app.use(express.static(path.join(__dirname, '../public')))
    await new Promise((resolve) => {
        app.listen(2727, function () {
            console.log('\nGate 2727')
            console.log('link: http://localhost:2727/views/index.html\n')
            resolve()
        })
    })

    // Open the browser interface if required
    let open_browser_interface = await askQuestion('Would you like to open the interface in your default browser?\n1 - Yes\n2 - No\n\n')
    if (open_browser_interface == 1) {
        const open = await import('open')
        open.default('http://localhost:2727/views/index.html')
    }
}

// Module exports
module.exports = {serverSetup}