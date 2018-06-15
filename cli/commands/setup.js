const fs = require('fs')
const os = require('os')
const co = require('co')
const prompt = require('co-prompt')

var osFilePath = `${os.homedir()}/.rsm`

module.exports = function() {
  if(fs.existsSync(osFilePath + '/rsm.json')){
    console.log('setup already done')
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
        process.exit(0)
      })
    })
  }
}