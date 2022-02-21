function messageTemplate(data, event) {
    const msg = {
        data: data,
        event: event
    }
    return JSON.stringify(msg)
}

module.exports = messageTemplate