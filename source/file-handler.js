// Module imports
const fs = require('fs')

// Read album library data
function readData() {
    const data = fs.readFileSync('../data/data.json')
    const json_data = JSON.parse(data)
    return json_data
}

// Read user data
function readUserData() {
    const user_data = fs.readFileSync('../data/user-data.json')
    const json_user_data = JSON.parse(user_data)
    return json_user_data
}

// Update the original data with changes
function updateData(updated_data_json, file_name) {
    const updated_data = JSON.stringify(updated_data_json, null, 3)
    fs.writeFileSync(`../data/${file_name}.json`, updated_data, 'utf8')
}

// Module exports
module.exports = {readData, readUserData, updateData}