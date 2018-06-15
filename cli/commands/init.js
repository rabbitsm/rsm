const fs = require('fs')
const path = require('path')
const co = require('co')
const prompt = require('co-prompt')

module.exports = function () {
  if(fs.existsSync('./rsm.json')) {
    console.log('RSM project already initiated')
    process.exit(0)
  } else {
    console.log('This takes you to create the basic version of rsm.json file\nwhich is the core meta file for your software/package')
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
        console.log('create rsm.json file at the root of the directory')
        process.exit(0)
      })
    })
  }
}