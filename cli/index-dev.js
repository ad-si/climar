#! /usr/bin/env node

require('babel-register')

var cli = require('../source/cli')

cli.default(process.argv)
