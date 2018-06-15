const fs = require('fs')
const { osFilePath } = require('./defaults')

if(fs.existsSync(osFilePath + '/rsm.json')) {
  var data = fs.readFileSync(osFilePath + '/rsm.json')
  var osInfo = JSON.parse(data)
  var os = osInfo.os
  var arch = osInfo.arch
} else {
  console.error('no information about the OS found')
  console.log('run `rsm setup`')
  process.exit(0)
}

module.exports = {
  os,
  arch
}