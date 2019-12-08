/**
 * @use node scripts/singlePack.js --name index
 */
const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const exec = require('child_process').exec
const argv = require('minimist')(process.argv.slice(2))

if (argv.name) {
  if (!fs.existsSync(path.join(__dirname, `../src/pages/${argv.name}/index.js`))) {
    console.log(chalk.yellow(`src/pages/${argv.name} 模块不存在`))
    return
  }
  process.env.singlePack = argv.name
  // console.log(chalk.green(`开始打包 src/pages/${argv.name} 模块`))
  const spinner = require('ora')(`开始打包 src/pages/${argv.name} 模块`)
  spinner.start()
  exec(`npx cross-env singlePack=${argv.name} vue-cli-service build`, function(err, stdout, stderr) {
    spinner.stop()
    if (err) {
      return console.error(err)
    }
    console.log(chalk.yellow(stdout))
  })
}
