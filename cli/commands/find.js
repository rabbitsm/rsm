const request = require('superagent')
const { apiEndPoint } = require('../../helpers/defaults')

module.exports = function (name) {
  request
    .get(`${apiEndPoint}/list/${name}`)
    .end((err, res) => {
      console.log(`RSM has found ${res.body.count} versions of ${name}: `)
      console.log(`${name} has been downloaded over ${res.body.downloads} times`)
      res.body.data.forEach(version => {
        console.log(version.ear)
      });
      console.log('--------')
      console.log('To install any specific version, try')
      console.log('`rsm install <name> <version>`')
      console.log('eg: `rsm install python 2.7.2`')
    })
}