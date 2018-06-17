const shell = require('shelljs')
const request = require('superagent')

module.exports = function(name, version) {
const { os, arch } = require('../../helpers/os')
  var url = version ? `http://localhost:7000/item/${name}/${version}` : `http://localhost:7000/item/${name}`
  request
    .get(url)
    .set('download', true)
    .end((err, res) => {
      if (err) throw err
      console.log(`Installing ${res.body.ear}`)
      var commands = res.body.scripts[os]
      commands.forEach(command => {
        shell.exec(command)
      })
    })
}