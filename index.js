#!/usr/bin/env node
const program = require('commander')

// commands
const { init, publish } = require('./cli')

var { version } = require('./utils/version')

program
  .version(version, '-v --version')

program
  .command('init')
  .alias('i')
  .action(init)

program
  .command('publish')
  .action(publish)

program.parse(process.argv)