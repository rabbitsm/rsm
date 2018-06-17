const shell = require('shelljs')
const request = require('superagent')
const { apiEndPoint } = require('../../helpers/defaults')

module.exports = function(name, version) {
const { os, arch } = require('../../helpers/os')
  var url = version ? `${apiEndPoint}/item/${name}/${version}` : `${apiEndPoint}/item/${name}`
  request
    .get(url)
    .set('download', true)
    .end((err, res) => {
      if (err) throw err
      console.log(`Installing ${res.body.ear}`)
      commands = res.body.scripts[os] ? res.body.scripts[os] : res.body.scripts['*']
      commands.forEach(command => {
        shell.exec(command)
      })
    })
}