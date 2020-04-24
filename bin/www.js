const http = require('http')
const chalk = require('chalk')
const app = require('../src/app')

const port = +process.env.PORT || 5000
app.set('port', port)

const server = http.createServer(app)
server.listen(port, () => {
  console.log(chalk.red.bold('Server is running on'), chalk.red.bold(`https://localhost:${port}`))
})
