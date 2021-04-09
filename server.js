const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname, '/')))

app.get('/feed', ({res}) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  })
  setInterval(function() {
    fetch('http://numbersapi.com/random/trivia')
      .then(response => response.text())
      .then(text => {
        const fact = {
          fact: text
        }
        res.write(line(fact))
      })
  }, 10000)

  function line(dto) {
    console.log(dto)
    return `data: ${JSON.stringify(dto)}\n\n`
  }
})

const port = 8001
app.listen(port)
