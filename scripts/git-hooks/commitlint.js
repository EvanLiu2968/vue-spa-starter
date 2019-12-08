// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()

const commitRE = /^Merge.+|(revert: )?(feat(@v\d+\.\d+(\.\d+)?)?|fix|style|docs|refactor|perf|test|chore)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`提交格式不规范，请参考~README.md`)}\n\n`
  )
  process.exit(1)
}
