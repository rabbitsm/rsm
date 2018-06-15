#!/usr/bin/env node
const program = require('commander')

// commands
const { init } = require('./cli')

var { version } = require('./utils/version')

program
  .version(version, '-v --version')

program
  .command('init')
  .action(init)

program.parse(process.argv)