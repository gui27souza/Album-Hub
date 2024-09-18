// Module imports
const readline = require('readline')

// Readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Ask a question and get the answer
const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

// Module exports
module.exports = {askQuestion}