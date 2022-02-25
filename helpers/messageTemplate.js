function messageTemplate(data, event, id) {
    const msg = {
        data: data,
        event: event,
        id: id
    }
    return JSON.stringify(msg)
}

module.exports = messageTemplate