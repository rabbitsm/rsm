const fs = require('fs')
const path = require('path')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const figures = require('figures')

module.exports = function () {
  if(fs.existsSync('./rsm.json')) {
    console.log(chalk.yellowBright(`RSM project already initiated ${figures.heart}`))
    process.exit(0)
  } else {
    console.log(chalk.blueBright(`This takes you to create the basic version of ${chalk.underline('rsm.json')} file\nwhich is the core meta file for your software/package`))
    co(function *(){
      var name = yield prompt('name: ')
      var version = yield prompt('version: ')
      var description = yield prompt('description: ')
      var website = yield prompt('website url: ')
      var docs = yield prompt('docs url: ')
      
      var rsmData = {
        name,
        version,
        description,
        website,
        docs
      }

      fs.writeFile('rsm.json', JSON.stringify(rsmData, null, 2), (err) => {
        if (err) throw err
        console.log(chalk.green(`created rsm.json file at the root of the directory ${figures.tick}`))
        process.exit(0)
      })
    })
  }
}