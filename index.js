#!/usr/bin/env node
const program = require('commander')

// commands
const { init, publish, setup, install } = require('./cli')

var { version } = require('./utils/version')

program
  .version(version, '-v --version')

program
  .command('init')
  .action(init)

program
  .command('publish')
  .action(publish)

program
  .command('setup')
  .alias('s')
  .action(setup)

program
  .command('install <name>')
  .alias('i')
  .action(install)

program.parse(process.argv)