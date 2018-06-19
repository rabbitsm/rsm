const fs = require('fs')
const request = require('superagent')
const authorer = require('authorer')
const chalk = require('chalk')
const figures = require('figures')
const { apiEndPoint } = require('../../helpers/defaults')

module.exports = function(cmd) {
  var configFile = cmd.config || './rsm.json'
  if(fs.existsSync(configFile)) {
    fs.readFile(configFile, (err, data) => {
      if (err) throw err
      var rsmData = JSON.parse(data)
      if(rsmData.author) rsmData.author = authorer(rsmData.author)
      if(!rsmData.name) {
        console.error(chalk.redBright('name is required'))
        process.exit(0)
      }
      if(!rsmData.version) {
        console.error(chalk.redBright('version is required'))
        process.exit(0)
      }

      console.log(chalk.blueBright(`Publishing ${rsmData.name} version ${rsmData.version}`))
      request
        .post(`${apiEndPoint}/item`)
        .send(rsmData)
        .set('accept', 'json')
        .end((err, res) => {
          if (res.status == 400) {
            console.error(chalk.redBright(`${rsmData.name} with version ${rsmData.version} already exists in the registry`))
            process.exit(0)
          }
          console.log(chalk.greenBright(`${res.body.itemName} publish on the registry ${figures.tick}`))
        })
    })
  } else {
    console.log('rsm.json file was not found')
    console.log('initiate a rsm project by running `rsm init`')
    console.log('or maybe cd to the root of the project or where rsm.json exists')
  }
}
