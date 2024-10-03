// Module imports
const fs = require('fs')
const path = require('path')

// Generic function to read json data files
    
    function readJsonFile(fileName) {

        const dataPath = path.join(__dirname, `../data/${fileName}`)

        if (!fs.existsSync(dataPath)) {
            console.error(`Arquivo ${fileName} não encontrado em:`, dataPath)
            process.exit(1)
        }

        const data = fs.readFileSync(dataPath, 'utf8')
        return JSON.parse(data)
    }

// 

// Read the data files and settings file
    
    function readData() {
        return readJsonFile('data.json')
    }

    function readSettings() {
        return readJsonFile('settings.json')
    }

// 

// Generic function to update JSON files with new data

    function updateJsonFile(fileName, updatedDataJson) {

        const dataPath = path.join(__dirname, `../data/${fileName}`)

        const updatedData = JSON.stringify(updatedDataJson, null, 3)

        fs.writeFileSync(dataPath, updatedData, 'utf8')

        return true
    }

// 

// Update the album library data and the settings
    
    function updateData(updatedDataJson) {
        return updateJsonFile('data.json', updatedDataJson)
    }

    function updateSettings(updatedSettingsJson) {
        return updateJsonFile('settings.json', updatedSettingsJson)
    }

// 

// Module exports
module.exports = {readData, readSettings, updateData, updateSettings}