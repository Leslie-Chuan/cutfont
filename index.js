const Command = require('common-bin');
const path = require('path');

class MainCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.answers = {};
    this.usage = 'Usage: cutfont <command> [options]';
    /* this.options = {
      user: {
        type: 'string',
        alias: 'us',
        default: 'outside',
        description: 'different user init different cli'
      }
    } */
    // load 子命令
    this.load(path.join(__dirname, 'command'));
    this.alias('d', 'default');
    this.alias('c', 'custom');
  }
  get version() {
    return `version：${pkg.version}`;
  }
  get description() {
    return 'Common Chinese font package cutting tool';
  }
}
module.exports = MainCommand;
