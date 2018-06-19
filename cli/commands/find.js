const request = require('superagent')
const chalk = require('chalk')
const figures = require('figures')
const { apiEndPoint } = require('../../helpers/defaults')

module.exports = function (name, cmd) {
  request
    .get(`${apiEndPoint}/list/${name}`)
    .end((err, res) => {
      console.log(chalk.magentaBright(`RSM has found ${res.body.count} versions of ${name}`))
      console.log(chalk.magentaBright(`${name} has been downloaded over ${res.body.downloads} times`))
      if (cmd.list) {
        console.log(chalk.whiteBright(`Available versions:`))
        res.body.data.forEach(version => {
          console.log(chalk.white(version.ear))
        });
      }
      console.log(chalk.gray('--------'))
      console.log(chalk.cyan('To install any specific version, try'))
      console.log(`${chalk.redBright('rsm install')} ${chalk.yellow('<name> <version>')}`)
      console.log('eg: `rsm install python 2.7.2`')
    })
}