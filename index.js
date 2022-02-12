const WebSocket = require('ws')

const PORT = process.env.PORT || 8000

const wss = new WebSocket.Server({
    port: PORT,
}, () => console.log(`Server started on 5000`))


wss.on('connection', ws => {

    ws.on('message', function (message) {

        message = JSON.parse(message)
        ws.id = message.id
        
        if(message.event == 'message') {
            wss.clients.forEach(client => {
                if (client.readyState == WebSocket.OPEN) {
                    client.send(JSON.stringify(messageTemplate(message.data, 'message', ws.id)))
                }
            })
        }
        else if(message.event == 'status') {
            wss.clients.forEach(client => {
                if (client != ws && client.readyState == WebSocket.OPEN) {
                    client.send(JSON.stringify(messageTemplate(message.data, 'status', client.id)))
                }
            })
        }
    })
})

function messageTemplate(message, action, userID) {
    const msg = {
        message: message,
        id: userID,
        action: action
    }

    return msg
}

function sendMessage(ws, data) {
    wss.clients.forEach(client => {
        if (client != ws && client.readyState == WebSocket.OPEN) {
            client.send(JSON.stringify(data))
        }
    })
}

function messageFilter(client, ws2) {
    if(client != ws && client.readyState == WebSocket.OPEN) {
        return true
    }
    else return false
}