const { Server } = require('@hocuspocus/server')
const { Logger } = require('@hocuspocus/extension-logger')
const { SQLite } = require('@hocuspocus/extension-sqlite')

const server = Server.configure({
  port: 4444,
  debounce: 0,
  address: '127.0.0.1',
  name: 'hocuspocus-fra1-01',
  extensions: [
    new Logger(),
    new SQLite(),
  ],
})

server.listen()
