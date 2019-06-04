const minimist = require('minimist')
const args = minimist(process.argv.slice(2))
const env = args.env || 'dev'
const CONFIG = require(`../config/${env}.env`)

console.log(CONFIG)

module.exports = CONFIG
