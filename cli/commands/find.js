const request = require('superagent')

module.exports = function (name) {
  request
    .get(`http://localhost:7000/list/${name}`)
    .end((err, res) => {
      console.log(`RSM has found ${res.body.length} versions of ${name}: `)
      res.body.forEach(version => {
        console.log(version.ear)
      });
      console.log('--------')
      console.log('To install any specific version, try')
      console.log('`rsm install <name> <version>`')
      console.log('eg: `rsm install python 2.7.2`')
    })
}