// Module imports
const fs = require('fs')

// Read album library data
    function readData() {
        const data = fs.readFileSync('../data/data.json')
        const json_data = JSON.parse(data)
        return json_data
    }
// 

// Read user data
    function readUserData() {
        const user_data = fs.readFileSync('../data/user-data.json')
        const json_user_data = JSON.parse(user_data)
        return json_user_data
    }
// 

// Update the original data with changes
    function updateData(updated_data_json) {
        const updated_data = JSON.stringify(updated_data_json, null, 3)
        fs.writeFileSync(`../data/data.json`, updated_data, 'utf8')
        return true
    }
// 

// Update the original data with changes
    function updateUserData(updated_user_data_json) {
        const updated_data = JSON.stringify(updated_user_data_json, null, 3)
        fs.writeFileSync(`../data/user-data.json`, updated_data, 'utf8')
        return true
    }
// 

// Module exports
module.exports = {readData, readUserData, updateData, updateUserData}