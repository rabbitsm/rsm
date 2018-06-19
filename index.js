#!/usr/bin/env node
const program = require('commander')

// commands
const { init, publish, setup, install, find } = require('./cli')

var { version } = require('./utils/version')

program
  .version(version, '-v --version')

program
  .command('init')
  .description('initializes a rsm image')
  .action(init)

program
  .command('publish')
  .option('-c, --config <file>', 'custom config file')
  .description('publish your local image to the rsm registry')
  .action(publish)

program
  .command('setup')
  .alias('s')
  .description('setup your local machine to be able to install')
  .action(setup)

program
  .command('install <name> [version]')
  .alias('i')
  .description('install rsm image (software/package/language)')
  .action(install)

program
  .command('find <name>')
  .alias('f')
  .option('-l --list', 'list all the available versions')
  .description('finds any rsm image')
  .action(find)

program.parse(process.argv)