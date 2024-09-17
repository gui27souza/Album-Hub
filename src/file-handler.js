// reads and writes on data.json

const fs = require('fs')

function readData() {
    const data = fs.readFileSync('../public/data/data.json')
    const json_data = JSON.parse(data)
    return json_data
}

function readUserData() {
    const user_data = fs.readFileSync('../public/data/user-data.json')
    const json_user_data = JSON.parse(user_data)
    return json_user_data
}

function updateData(updated_data_json, file_name) {
    const updated_data = JSON.stringify(updated_data_json, null, 3)
    fs.writeFileSync(`../public/data/${file_name}.json`, updated_data, 'utf8')
}

module.exports = {readData, readUserData, updateData}