const fs = require('fs')
const os = require('os')
const inquirer = require('inquirer')
const chalk = require('chalk')
const figures = require('figures')
const { osFilePath } = require('../../helpers/defaults')

module.exports = function() {
  if(fs.existsSync(osFilePath + '/rsm.json')){
    console.log(chalk.yellowBright('setup already done'))
    process.exit(0)
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'os',
        message: 'operating system',
        choices: ['ubuntu', 'fedora', 'redhat', 'arch', 'suse', 'mint', 'win7', 'win8', 'win10', 'macOS']
      },
      {
        type: 'list',
        name: 'arch',
        message: 'architecture',
        choices: ['32', '64'],
        default: '64'
      }
    ])
    .then(answers => {
      fs.mkdirSync(osFilePath)
      fs.writeFile(osFilePath + '/rsm.json', JSON.stringify(answers, null, 2), (err) => {
        if (err) throw err
        console.log(chalk.greenBright(`setup done successfully ${figures.tick}`))
        process.exit(0)
      })
    })
  }
}