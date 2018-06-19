const fs = require('fs')
const os = require('os')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const figures = require('figures')
const { osFilePath } = require('../../helpers/defaults')

module.exports = function() {
  if(fs.existsSync(osFilePath + '/rsm.json')){
    console.log(chalk.yellowBright('setup already done'))
    process.exit(0)
  } else {
    co(function *(){
      var os = yield prompt('what is your Operating system(ubuntu/fedora)?: ')
      var arch = yield prompt('what architecture is it(32/64)?: ')
      var OS = {
        os,
        arch
      }
      fs.mkdirSync(osFilePath)
      fs.writeFile(osFilePath + '/rsm.json', JSON.stringify(OS, null, 2), (err) => {
        if (err) throw err
        console.log(chalk.greenBright(`setup done successfully ${figures.tick}`))
        process.exit(0)
      })
    })
  }
}