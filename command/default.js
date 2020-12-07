'use strict';
const Command = require('common-bin');
const Common = require('../common');
const cutfont = new Common('default');

class DefaultCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.options = {
      want: {
        type: 'string',
        alias: 'w',
        default: '',
        description: '-w = "你想保留的字体"',
      },
    };
  }
  // argv是父类传进来的参数
  async run({ argv }) {
    cutfont.run();
  }
  get description() {
    return 'Compress your font package with default way.';
  }
}

module.exports = DefaultCommand;
