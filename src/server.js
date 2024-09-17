const path = require('path')
const express = require('express')

async function serverSetup() {
    const app = express()
    app.use(express.static(path.join(__dirname, '../public')))
    app.listen(2727, function () {
        console.log('\nGate 2727')
        console.log('link: http://localhost:2727/views/index.html\n')
    })
}

module.exports = {serverSetup}