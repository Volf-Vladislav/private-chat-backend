function checkGender(client, ws) {
    if (client != ws && client.readyState == 1) {
        if ((client.gender == ws.seekingGender || client.seekingGender == 'any') && (ws.gender == client.seekingGender || ws.seekingGender == 'any')) {
            return true
        }
        else return false
    }
    else return false
}

module.exports = checkGender