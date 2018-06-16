#!/usr/bin/env node
const program = require('commander')

// commands
const { init, publish, setup, install, find } = require('./cli')

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
  .command('install <name> [version]')
  .alias('i')
  .action(install)

program
  .command('find <name>')
  .alias('f')
  .action(find)

program.parse(process.argv)