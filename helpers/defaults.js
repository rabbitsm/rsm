const os = require('os')

const osFilePath = `${os.homedir()}/.rsm`
const apiEndPoint = 'http://ec2-18-188-12-41.us-east-2.compute.amazonaws.com:3000'

module.exports = {
  osFilePath,
  apiEndPoint
}