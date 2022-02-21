const WebSocket = require('ws')
const messageTemplate = require('./helpers/messageTemplate')
const checkGender = require('./helpers/checkGender')

const PORT = process.env.PORT || 8000

const wss = new WebSocket.Server({
    port: PORT,
}, () => console.log(`Server started on ${PORT}`))

wss.on('connection', ws => {
    ws.on('message', message => {

        message = JSON.parse(message)

        if (message.event == 'status') {
            if (message.data.status == 'seeking') {
                ws.gender = message.data.gender
                ws.seekingGender = message.data.seekingGender
                ws.id = message.data.id

                wss.clients.forEach(client => {
                    if (checkGender(client, ws)) {
                        if (ws.status != 'chating' && client.status != 'chating') {
                            ws.status = 'chating'
                            client.status = 'chating'
                            ws.seekingID = client.id
                            client.seekingID = ws.id

                            ws.send(messageTemplate('finded', 'status'))
                            client.send(messageTemplate('finded', 'status'))
                        }
                    }
                })
            }
        }

        else if (message.event == 'message') {
            wss.clients.forEach(client => {
                if (client.seekingID == ws.id ) {
                    client.send(messageTemplate(message.data, 'message'))
                }
            })
        }
    })

    ws.on('close', () => {
        wss.clients.forEach(client => {
            if (client.seekingID == ws.id ) {
                client.send(messageTemplate('disconnected', 'status'))
            }
        })
    })
})