const fs = require('fs')
const path = require('path')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const figures = require('figures')
const inquirer = require('inquirer')

module.exports = function () {
  if(fs.existsSync('./rsm.json')) {
    console.log(chalk.yellowBright(`RSM project already initiated ${figures.heart}`))
    process.exit(0)
  } else {
    console.log(chalk.blueBright(`This takes you to create the basic version of ${chalk.underline('rsm.json')} file\nwhich is the core meta file for your software/package`))
    inquirer.prompt([
      {
        type: 'input',
        name: 'package_name',
        message: 'name',
        default: process.cwd().split('/').pop()
      },
      {
        type: 'input',
        name: 'version',
        message: "version",
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'description',
        message: 'description'
      },
      {
        type: 'input',
        name: 'author',
        message: 'author'
      },
      {
        type: 'input',
        name: 'website',
        message: 'website'
      },
      {
        type: 'input',
        name: 'docs',
        message: 'documentations'
      },
      {
        type: 'list',
        name: 'type',
        message: 'type',
        choices: ['software', 'language', 'package', 'modules']
      },
      {
        type: 'checkbox',
        name: 'scripts',
        message: 'available for',
        choices: ['ubuntu', 'fedora', 'redhat', 'arch', 'suse', 'mint', 'win7', 'win8', 'win10', 'macOS']
      }
    ])
    .then(answers => {
      var scripts = {}
      answers.scripts.forEach(s => {
        scripts[s] = []
      })
      var rsmData = {
        name: answers.name,
        version: answers.version,
        description: answers.description,
        author: answers.author,
        website: answers.website,
        docs: answers.docs.description,
        type: answers.type,
        scripts
      }

      fs.writeFile('rsm.json', JSON.stringify(rsmData, null, 2), (err) => {
        if (err) throw err
        console.log(chalk.green(`created rsm.json file at the root of directory ${figures.tick}`))
        process.exit(0)
      })
    })
  }
}