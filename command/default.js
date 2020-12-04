'use strict';
const Command = require('common-bin');
const path = require('path');
const cwd = process.cwd();

class CutFontCommand extends Command {
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
    console.log('argv:', argv)
  }
  get description() {
    return 'cut off your big font file';
  }
}

module.exports = CutFontCommand;