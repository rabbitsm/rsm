const shell = require('shelljs')
const request = require('superagent')
const { os, arch } = require('../../helpers/os')

module.exports = function(name) {
  request
    .get(`http://localhost:7000/item/${name}`)
    .end((err, res) => {
      var commands = res.body.scripts[os]
      commands.forEach(command => {
        shell.exec(command)
      })
    })
}