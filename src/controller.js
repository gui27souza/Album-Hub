const express = require('express')
const router = express.Router()
const { readData, readUserData, updateData } = require('./file-handler')

// Rota para obter dados do usuário
router.get('/user-data', (req, res) => {
    const user_data = readUserData('user-data')
    res.status(200).json(user_data)
})

// Rota para obter outros dados
router.get('/data', (req, res) => {
    const data = readData('data')
    res.status(200).json(data)
})

module.exports = router