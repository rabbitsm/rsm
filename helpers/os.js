const fs = require('fs')
const chalk = require('chalk')
const { osFilePath } = require('./defaults')

if(fs.existsSync(osFilePath + '/rsm.json')) {
  var data = fs.readFileSync(osFilePath + '/rsm.json')
  var osInfo = JSON.parse(data)
  var os = osInfo.os
  var arch = osInfo.arch
} else {
  console.error(chalk.redBright('no information about the OS found'))
  console.log(`run ${chalk.yellowBright('rsm setup')}`)
  process.exit(0)
}

module.exports = {
  os,
  arch
}