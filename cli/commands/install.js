const shell = require('shelljs')
const request = require('superagent')
const chalk = require('chalk')
const figures = require('figures')
const Listr = require('listr')
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
      var tasksList = commands.map(command => {
        return {
          title: chalk.yellowBright(command),
          task: () => shell.exec(command, {silent: true})
        }
      })
      const tasks = new Listr(tasksList)
      tasks.run()
        .then(() => console.log(chalk.greenBright(`Successfully install ${res.body.ear}`)))
        .catch(err => console.error(err))
    })
}