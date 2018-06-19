const shell = require('shelljs')
const request = require('superagent')
const chalk = require('chalk')
const figures = require('figures')
const { apiEndPoint } = require('../../helpers/defaults')

module.exports = function(name, version) {
const { os, arch } = require('../../helpers/os')
  var url = version ? `${apiEndPoint}/item/${name}/${version}` : `${apiEndPoint}/item/${name}`
  request
    .get(url)
    .set('download', true)
    .end((err, res) => {
      if (err) throw err
      console.log(chalk.blueBright(`Installing ${res.body.ear}`))
      commands = res.body.scripts[os] ? res.body.scripts[os] : res.body.scripts['*']
      commands.forEach(command => {
        console.log(chalk.yellowBright(`${command} ${figures.pointerSmall}`))
        shell.exec(command)
      })
    })
}