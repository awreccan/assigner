const io = require('socket.io')()
const clients = []

io.on('connection', client => {

  console.log('client', client.id, 'connected')
  clients.push(client)

  client.on('action', action => {

      const clientAction = {
        ...action,
        type: action.type.replace('clientToServer', 'serverToClient')
      }
      console.log('emitting action', clientAction)

      clients
        .filter(c => c !== client)
        .forEach(client => {
          client.emit('action', clientAction)
          console.log('to client', client.id)
        })

  })

})

const port = 8000
io.listen(port)
console.log('listening on port', port)